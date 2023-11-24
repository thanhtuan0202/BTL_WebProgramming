import React from 'react';
import Cart from "../../../components/Cart"
import './style.css';
export default function Order() {
  return (
    <div className="orderPage" style={{ backgroundColor: '#ffffff' }}>
      <div className="orderPage__title text-center">Giỏ hàng của bạn</div>
      <Cart />
    </div>
  );
}
