import React from "react";
import Button from "@mui/material/Button";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../redux/Reducers/todoCart";
export default function TotalItemOrder(props) {
  const item = props.data;
  const dispatch = useDispatch();
  const handleCheckout = (e) => {
    dispatch(fetchCart(item.carts))
  };
  return (
    <div className="col-lg-4 order-area">
      <div className="order-cart-area">
        <div className="order-cart">
          <h5>Tổng giỏ hàng</h5>
          <p>
            Thành tiền<span>{item.total_price}</span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <Button color="warning" variant="contained" className="btn">
            <Link className="order-checkout-btn" to="/Product">
              Tiếp tục mua sắm
            </Link>
          </Button>
          <Button
            color="warning"
            variant="contained"
            className="btn"
            disabled={item.total_price == 0 ? true : false}
          >
            <Link className="order-checkout-btn" to="/checkout" onClick={handleCheckout}>
              Thanh toán
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
