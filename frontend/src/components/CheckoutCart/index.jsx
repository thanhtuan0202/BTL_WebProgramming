import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { Item, RemoveCart } from "./part";
import { deleteCart } from "../../redux/Reducers/todoCart";
import axios from "axios";

function CheckoutCart(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listItemCart = useSelector((state) => state.todoCart.cartItem);
  const total = useSelector((state) => state.todoCart.total);
  const paymentMethod = useSelector((state) => state.paymentMethod.method);
  useEffect(() => {}, [listItemCart]);
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    fullname : "",
    phone_number: "",
    address: "",
    payment_method: paymentMethod
  });

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
    console.log(data);
  };

  const handleSubmitOrder = async () => {
    if (data.fullname.trim() === '' || data.address.trim() === '' || data.phone_number.trim() === '') {
      // Validation failed if rating is not given or comment is empty
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
  }
    data.payment_method = paymentMethod;
    try{
      const res = await axios.post(
        `http://localhost/assignment/backend/index.php/orders`,data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },}
      );
      console.log(res.data);
      if(res.data.data.error){
        alert(res.data.data.error);
      }
      else{
        alert(res.data.data.msg)
      }


    }
    catch(e){
      alert("Error: " + e.message);
    }
    return navigate("/");
  };

  return (
    <>
      <div className="card receiver">
        <div className="receiver__header">
          <div>Thông tin nhận hàng</div>
        </div>
        <div>
          <div className="card-body receiver__body">
            <input
              type="text"
              id="name"
              className="receiver__form-control mt-2"
              placeholder="Tên người nhận"
              onChange={handleChange("fullname")}
            />
            <input
              type="text"
              id="phone"
              className="receiver__form-control mt-2"
              placeholder="Số điện thoại"
              onChange={handleChange("phone_number")}
            />
            <input
              type="text"
              id="address"
              className="receiver__form-control mt-2"
              placeholder="Địa chỉ người nhận"
              onChange={handleChange("address")}
            />
          </div>
        </div>
      </div>
      <div className="card checkout-cart mb-5">
        <div className="checkout-cart__header">
          <div>Các món đã chọn</div>
          <button className="btn btn-sm checkout-cart__add-item">
            <Link to="/" className="checkout-cart__add-item__link">
              Thêm món
            </Link>
          </button>
        </div>
        {listItemCart.map((item) => (
          <Item key={item.id} data={item} />
        ))}
        <div className="checkout-cart__footer ">
          <div className="checkout-cart__footer__total">
            <div>Thành tiền</div>
            <div className="checkout-cart__footer__total__price">{total}</div>
          </div>
          <button
            className="btn checkout-cart__footer__btn"
            onClick={handleSubmitOrder}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      <RemoveCart />
    </>
  );
}

CheckoutCart.propTypes = {};

export default CheckoutCart;
