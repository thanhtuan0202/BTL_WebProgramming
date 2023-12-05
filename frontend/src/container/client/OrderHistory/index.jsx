import React, { useEffect, useState } from "react";
import {
    Grid,
    Button,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
import axios from "axios";
import Loader from "../../../components/Loader";
import OrderItem from "../../../components/OrderItem";

export default function OrderHistory() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const fetchOrder = async () => {
    const res = await axios.get(`http://localhost/assignment/backend/index.php/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(res.data.data);
    setLoading(false);
    console.log(orders);
  };

  useEffect(() => {
    fetchOrder();
  },[loading])


  return (
    <div className="orderPage" style={{ backgroundColor: "#e8e8e8" }}>
      <div className="orderPage__title text-center">Đơn hàng của bạn</div>
      {loading ? <Loader /> : (
        <div> 
            {orders.order.length > 0 ? (
                <div>
                    {orders.order.map((item,idx) => (
                        <OrderItem data={item} key={idx}/>
                    ))}
                </div>
            ) : (
                "None"
            )}
        </div> 
      )}
    </div>
  );
}
