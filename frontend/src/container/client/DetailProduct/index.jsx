import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Reducers/todoCart";
import "./style.css";
import Comment from "../../../components/Comment";
export default function DetailProduct(props) {
  const { id } = useParams(props, "id");
  const listCart = useSelector((state) => state.todoCart.listCart);
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instock, setInstock] = useState(-1);
  const [chosen, setChosen] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if value is a number or an empty string
    if (value === "" || !isNaN(value)) {
      setQuantity(value);
      setError("");
    } else {
      setError("Please enter a valid number.");
    }
  };

  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost/assignment/backend/index.php/shoes/${id}`
    );
    setProduct(res.data.data);

    const res_com = await axios.get(
      `http://localhost/assignment/backend/index.php/comments/${id}`
    );
    setComment(res_com.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleAddToCart() {
    const body = {
      quantity: quantity,
      vp_id: product.variant[chosen].id,
      pid: product.shoes.id,
    };
    try {
      const res = await axios.post(
        `http://localhost/assignment/backend/index.php/carts`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Thêm thành công");
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }
  return (
    <div style={{ minHeight: "505px" }}>
      {loading === false ? (
        <div className="detail-product">
          <div class="navbar-detail">
            <Link to="/Product">
              <i class="bi bi-chevron-left" style={{ fontsize: 100 }}></i>
              Quay lại
            </Link>
          </div>
          <div className="productInfo container">
            <div className="row justify-content-center">
              <div className="col-4">
                <img
                  src={product.shoes.img_file}
                  style={{
                    width: "300px",
                    maxheight: "300px",
                    margir: "0px 40px",
                  }}
                  alt="img"
                />
              </div>

              <div className="col-4">
                <h2
                  style={{
                    fontSize: "35px",
                    fontWeight: "500",
                    marginBottom: "20px",
                  }}
                >
                  {product.shoes.name}
                </h2>
                <h4
                  style={{
                    float: "left",
                    fontSize: "16px",
                  }}
                >
                  ID: {product.shoes.id}
                </h4>
                <br />
                <p
                  className="mt-3"
                  style={{
                    fontSize: "15px",
                    marginBottom: "10px",
                  }}
                >
                  {product.shoes.description}
                </p>
                <h4
                  style={{
                    float: "left",
                    fontSize: "16px",
                  }}
                >
                  Giá: {product.shoes.price} $
                </h4>
                <br />
                <br />
                <div className="row" style={{ marginBottom: "10px" }}>
                  {product.variant.map((item, index) => (
                    <Button
                      style={{
                        color: index === instock ? "white" : "black",
                        display: "flex",
                        justifyContent: "flex-start",
                        border: "1px solid",
                        marginLeft: "5px",
                      }}
                      onClick={() => {
                        setChosen(index);
                        setInstock(item.in_stock);
                      }}
                      variant={index === chosen ? "contained" : "text"}
                    >
                      {item.size}
                    </Button>
                  ))}
                </div>
                <div>
                  {instock === -1 ? (
                    ""
                  ) : instock > 0 ? (
                    <div>
                      <h4>Còn hàng</h4>
                      <TextField
                        label="Enter quantity"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={quantity}
                        onChange={handleInputChange}
                        error={!!error}
                        helperText={error}
                      />
                      <Button
                        sx={{ fontSize: 10 }}
                        style={{ width: 120 }}
                        color="warning"
                        variant="contained"
                        onClick={handleAddToCart}
                      >
                        Thêm sản phẩm
                      </Button>
                    </div>
                  ) : (
                    "Sản phẩm hiện đang hết hàng!"
                  )}
                </div>
              </div>
              <div className="col-4"> </div>
            </div>
          </div>

          <Comment data={comment.comments} />
        </div>
      ) : (
        <div> Hiện không có sản phẩm.</div>
      )}
    </div>
  );
}
