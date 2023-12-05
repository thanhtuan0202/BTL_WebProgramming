import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import CartItem from "../CartItem";
import TotalItemOrder from "../TotalItemOrder";
import Loader from "../Loader";
import axios from "axios";
import "./cart.css";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token')
  const fetchCart = async () => {
    try{
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/carts`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },}
      );
      setCart(res.data.data);
      setLoading(false)
      console.log("cart: ", cart);
    }
    catch(e){
      console.error("Error fetching cart:", error);
    }
  };

  useEffect( () => {
    fetchCart();
  }, [loading])
  
  return loading ? <Loader/> : (
    <div>
    {cart.carts.length > 0 ? 
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
              {cart.carts.map((item, index) => {
                return <CartItem key={index} data={item} />;
              })}
            </tbody>
          </table>
          <div className="container row">
            <TotalItemOrder data={cart}/>
          </div>
        
        </div>
      </div>
      :( 
        <h1>Giỏ hàng của bạn trống!!!</h1>
      )}
    </div>
  );
}
