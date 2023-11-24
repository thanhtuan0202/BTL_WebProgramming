import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { Item, RemoveCart } from "./part";
import { deleteCart } from "../../redux/Reducers/todoCart";
import axios from "axios";
// Call api
const createPayment = async (body) => {
  console.log("body: ",body);
  try {
    // const { data } = await axios({
    //   method: "POST",
    //   url: "http://localhost:5000/create-order",
    //   data: body,
    // });
    const {data} = await axios .post(
      "http://localhost:5000/create-order",
      body
    );
    console.log(data)
    return {
      errCode: data.success,
      errDetail: data.message,  
    };
  } catch (error) {
    return {
      errCode: false,
      errDetail: "System error",
      result: null,
    };
  }
};
const updProduct = async(body) => {
  try {
    const {data} = await axios .post(
      "http://localhost:5000/update-product",
      body
    );
    return {
      errCode: data.success,
      errDetail: data.message,  
    };
  } catch (error) {
    return {
      errCode: false,
      errDetail: "System error",
      result: null,
    };
  }  
}
function CheckoutCart(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listItemCart = useSelector((state) => state.todoCart.cartItem);
  const total = useSelector((state) => state.todoCart.total);
  const paymentMethod = useSelector((state) => state.paymentMethod.method);
  console.log("payment-method: ", paymentMethod);
  const [openPaypal, setOpenPaypal] = useState(false);
  useEffect(() => {}, [listItemCart]);

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState({
    tenKhach : "",
    SDT: "",
    diaChi: "",
    hinhThucThanhToan: "",
    ngayTao: "",
    idTaiKhoan: "1",
    listProduct: [],    
  });

  const onApprove = async (data, actions) => {
    await handleSubmitOrder();
    return actions.order.capture();
  };
  const handleChangeName = (e) => {
    // e.preventDefault();
    setName(e.target.value);
  };
  const handleChangePhone = (e) => {
    // e.preventDefault();
    setPhone(e.target.value);
  };
  const handleChangeAddress = (e) => {
    // e.preventDefault();
    setAddress(e.target.value);
  };
  const handleSubmitOrder = async () => {
    const items = listItemCart.map((item) => {
      if (item.cartQuantity > item.soLuong){
        item.cartQuantity = item.soLuong;
      }
      return [
        item.id,
        item.cartQuantity,
      ];
    });
    Object.assign(data,{
      tenKhach : name,
      SDT: phone,
      diaChi: address,
      hinhThucThanhToan: paymentMethod,
      ngayTao: date,
      idTaiKhoan: "1",
      listProduct: items,
    })

    const { errCode, errDetail } = await createPayment(data);
    if (!errCode) {
      return alert(errDetail);
    }
    listItemCart.map(async(item, index) => {
      Object.assign(data, item)
      data.soLuong = data.soLuong - data.cartQuantity;
      const { errCode, errDetail } = await updProduct(data);
      if (!errCode) {
        return alert(errDetail);
      }
      console.log(errDetail);
    })
    dispatch(deleteCart());
    alert("Thanh toán thành công");
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
              onChange={handleChangeName}
            />
            <input
              type="text"
              id="phone"
              className="receiver__form-control mt-2"
              placeholder="Số điện thoại"
              onChange={handleChangePhone}
            />
            <input
              type="text"
              id="address"
              className="receiver__form-control mt-2"
              placeholder="Địa chỉ người nhận"
              onChange={handleChangeAddress}
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
          <Item key={item.id} item={item} />
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
