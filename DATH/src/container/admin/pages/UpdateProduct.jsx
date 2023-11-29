import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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
  let { state } = useLocation();
  let isUpdate = false;
  if (state && state.item) {
    isUpdate = true;
  }

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
        console.log("shoe: ", shoe);
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
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  const handleSubmit = () => {
    values.image = selectedFile.base64Url;
    console.log(values);
  }

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
          style={{minWidth: "200px"}}
          // onChange={(e) => {
          //   setCategory(e.target.value);
          //   console.log(category);
          // }}
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
      <br />
      <div>
        <div style={{ fontFamily: "bolder" }}>
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
          <Button onClick={handleSubmit}> Lưu thay đổi</Button>
        </div>
      ) : (
        <div>
        <Button onClick={handleSubmit}> Thêm sản phẩm</Button>
      </div>
      )}
    </div>
  );
}
