import React from "react";
import Button from "@mui/material/Button";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TotalItemOrder() {
  const total = useSelector((state) => state.todoCart.total);
  return (
    <div className="col-lg-4 order-area">
      <div className="order-cart-area">
        <div className="order-cart">
          <h5>Tổng giỏ hàng</h5>
          <p>
            Thành tiền<span>{total}</span>
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
            disabled={total === 0 ? true : false}
          >
            <Link className="order-checkout-btn" to="/checkout">
              Thanh toán
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
