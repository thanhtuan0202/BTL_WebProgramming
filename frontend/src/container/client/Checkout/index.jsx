import React from 'react';
import './Checkout.css';
import CheckoutForm from '../../../components/CheckoutForm';
import CheckoutCart from '../../../components/CheckoutCart';
import { Link } from "react-router-dom";
function Checkout(props) {
  return (
    <div className="checkout">
      <div class="navbar-detail">
        <Link to="/Cart">
          <i class="bi bi-chevron-left" style={{ fontsize: 100 }}></i>
          Quay lại
        </Link>
      </div>
      <div className="text-center checkout__title">
        <i className="fas fa-clipboard-check checkout__title__icon"></i>
        Xác nhận đơn hàng
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <CheckoutForm />
          </div>
          <div className="col-8">
            <CheckoutCart/>
          </div>
        </div>
      </div>
    </div>
  );
}

Checkout.propTypes = {};

export default Checkout;
