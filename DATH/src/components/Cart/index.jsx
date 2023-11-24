import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import TotalItemOrder from "../TotalItemOrder";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./cart.css";
export default function Cart() {
  const cart = useSelector((state) => state.todoCart.cartItem);
  console.log(cart);
  useEffect(() => {}, [cart]);
  return (
    <div>
    {cart.length > 0 ? 
      <div className="cart-area">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="blank" />
                <th className="blank" />
                <th className="title-name">Sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return <CartItem key={index} data={item} />;
              })}
            </tbody>
          </table>
          <div className="container row">
            <TotalItemOrder />
          </div>
        
        </div>
      </div>
      :( 
        <h1>Giỏ hàng của bạn trống!!!</h1>
      )}
    </div>
  );
}
