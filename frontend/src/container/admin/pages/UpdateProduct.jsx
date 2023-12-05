import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Select, MenuItem, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function UpdateProduct() {
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [variant, setVariant] = useState([]);
  const [fields, setFields] = useState([]);
  const [variantItem, setVariantItem] = useState({
    size: 0,
    in_stock: 0,
  });
  let { state } = useLocation();
  let isUpdate = false;
  const navigate = useNavigate();

  if (state && state.item) {
    isUpdate = true;

    const fetchVariant = async (page) => {
      try {
        const res = await axios.get(
          `http://localhost/assignment/backend/index.php/image?url=${encodeURIComponent(
            state.item.img_file
          )}`
        );
        setSelectedFile({ file: "1", base64Url: res.data.base64data });

        const res_variant = await axios.get(
          `http://localhost/assignment/backend/index.php/variants/${state.item.id}`
        );
        let arr = [];
        let const_field = [];
        res_variant.data.data.variants.forEach((element,index) => {
          arr.push({
            size: element.size,
            in_stock: element.in_stock,
          });
          const_field.push({
            id: index,
          })
        });
        setVariant(arr);
        setFields(const_field);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchVariant(1);
    }, []);
  }
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDEyNzgzNzAsInVzZXJfbmFtZSI6ImpvaG5kb2UiLCJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4ifQ.KJzBWA-T3YI3fJPXNx0w5Iv9NyQUGXHqcG9uZ3acJ_54MlIZ0T0AUc-9e2aZNB7fvRdlwU8U1uMCG2aiXK5JmQ";

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(
    state && state.item ? state.item.category_id - 1 : 0
  );
  const [shoe, setShoe] = useState({});
  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/categories`
      );
      setCategories(res.data.data.categories);
      if (state && state.item) {
        const res1 = await axios.get(
          `http://localhost/assignment/backend/index.php/shoes/${state.item.id}`
        );
        setShoe(res1.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Only the first file is considered

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result;
        setSelectedFile({ file, base64Url });
      };
      reader.readAsDataURL(file);
    }
  };

  const [values, setValues] = useState({
    name: state && state.item ? state.item.name : "",
    category_id: state && state.item ? state.item.category_id : 0,
    price: state && state.item ? state.item.price : 0,
    description: state && state.item ? state.item.description : "",
    image: "",
    variant: [],
  });

  const handleVariantItem = (name) => (event) => {
    setVariantItem({ ...variantItem, [name]: event.target.value });
  };
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  const addTextFields = () => {
    if (variantItem.size >= 35 && variantItem.size <= 43) {
      variant.push(variantItem);
      console.log("variant ", variant);

      setVariantItem({
        size: 0,
        in_stock: 0,
      });
    }
    const newFields = [
      ...fields,
      {
        id: fields.length,
      },
    ];
    setFields(newFields);
  };

  const removeTextFields = (idx) => {
    const field = [...fields];
    field.splice(idx, 1);
    if (idx + 1 <= variant.length) {
      // const newVariant = {...variant}
      // newVariant.splice(idx, 1);
      // setVariant(newVariant);
      variant.splice(idx, 1);
    }
    setFields(field);
  };
  const handleSubmit = async () => {
    values.image = selectedFile.base64Url;
    values.variant = variant;
    values.category_id = values.category_id + 1;
    console.log(values);
    try {
      await axios
        .post("http://localhost/assignment/backend/index.php/shoes", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
      alert("Thành công");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleUpdate = async () => {
    values.image = selectedFile.base64Url;
    values.variant = variant;
    values.category_id = values.category_id + 1;
    console.log(values);
    try {
      await axios
        .put("http://localhost/assignment/backend/index.php/shoes", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {});
      alert("Thành công");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return loading === true ? (
    <Loader />
  ) : (
    <div>
      <h2> Thông tin sản phẩm</h2>
      <br />
      <div>
        <TextField
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          defaultValue={state && state.item ? state.item.name : null}
          style={{ width: "75%" }}
          onChange={handleChange("name")}
        />
      </div>
      <br />
      <div>
        <TextField
          label="Mô tả sản phẩm"
          multiline
          rows={5}
          defaultValue={state && state.item ? state.item.description : null}
          variant="outlined"
          style={{ width: "75%" }}
          onChange={handleChange("description")}
        />
      </div>
      <br />
      <div>
        <TextField
          label="Giá bán"
          placeholder="Nhập giá bán"
          defaultValue={state && state.item ? state.item.price : null}
          style={{ width: "75%" }}
          onChange={handleChange("price")}
        />
      </div>
      <br />
      <div>
        <div style={{ fontFamily: "bolder" }}> Loại giày</div>
        <Select
          value={category}
          label="Loại giày"
          onChange={handleChange("category_id")}
          style={{ minWidth: "200px" }}
        >
          {categories.map((item, idx) => (
            <MenuItem
              value={idx}
              onClick={() => {
                setCategory(idx);
              }}
            >
              {" "}
              {item.name}{" "}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <div style={{ fontFamily: "bolder" }}> Size và số lượng: </div>
        <div>
          {fields.map((field, idx) => (
            <div style={{ margin: "10px 0px" }}>
              <TextField
                label="Size"
                placeholder={"Nhập size"}
                variant="outlined"
                onChange={handleVariantItem("size")}
                defaultValue={
                  variant[idx] && variant[idx].size ? variant[idx].size : null
                }
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Số lượng"
                placeholder={"Số lượng của size " + variantItem.size}
                variant="outlined"
                defaultValue={
                  variant[idx] && variant[idx].in_stock
                    ? variant[idx].in_stock
                    : null
                }
                onChange={handleVariantItem("in_stock")}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  removeTextFields(idx);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={addTextFields}>
            Thêm
          </Button>
        </div>
      </div>
      <br />
      <div>
        <div style={{ fontFamily: "bolder", marginBottom: "10px" }}>
          {" "}
          Hình ảnh
        </div>
        <div>
          <Button
            component="label"
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            onChange={handleFileChange}
            color="success"
            size="small"
          >
            Thêm ảnh
            <VisuallyHiddenInput type="file" />
          </Button>
          {selectedFile && (
            <div>
              <img
                src={selectedFile.base64Url}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </div>
          )}
        </div>
      </div>
      <br />
      {isUpdate ? (
        <div>
          <Button onClick={handleUpdate}> Lưu thay đổi</Button>
        </div>
      ) : (
        <div>
          <Button onClick={handleSubmit}> Thêm sản phẩm</Button>
        </div>
      )}
    </div>
  );
}
