import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Reducers/todoCart";
import "./style.css";

export default function DetailProduct(props) {
  const { id } = useParams(props, "id");
  const listCart = useSelector((state) => state.todoCart.listCart);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(-1);
  const dispatch = useDispatch();
  const addtoCart = () => {
    dispatch(addToCart(listCart.data[id - 1]));
  };
  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost/assignment/backend/index.php/shoes/${id}`
    );
    console.log("Detail: ", res.data.data);
    setProduct(res.data.data);
    setLoading(true);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div style={{ minHeight: "505px" }}>
      {loading === true ? (
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
                    Giá: {product.shoes.price} $
                  </h4>
                  <br />
                  <br />
                <div className="row" style={{ marginBottom: "10px" }}>
                  {product.variant.map((item, index) => (
                    <Button
                    style={{
                        color: index === quantity ? "white" : "black",
                        display: "flex",
                        justifyContent: "flex-start",
                        border: "1px solid",
                        marginLeft: "5px"
                    }}
                    onClick={() => {setQuantity(index)}}
                    variant={index === quantity ? "contained" : "text"}
                    >{item.size}</Button>
                  ))}
                </div>
                <div>
                  <h4>
                  { quantity === -1 ? "" : (quantity > 0 ? "Còn hàng" : "Hết hàng")}
                  </h4> 
                </div>
                <p
                  className="mt-3"
                  style={{
                    fontSize: "15px",
                    marginBottom: "10px",
                  }}
                >
                  {product.shoes.description}
                </p>
                <Button
                  onClick={() => addtoCart()}
                  sx={{ fontSize: 10 }}
                  style={{ width: 120 }}
                  color="warning"
                  variant="contained"
                >
                  Thêm sản phẩm
                </Button>
              </div>
              <div className="col-4"> </div>
            </div>
          </div>

          <div> comment</div>
        </div>
      ) : (
        <div> Hiện không có sản phẩm.</div>
      )}
    </div>
  );
}
