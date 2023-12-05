import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import axios from "axios";
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
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";

export default function Orders() {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(null);
  const data = {
    done: 0,
    waiting: 0,
    delete: 0,
    delivery: 0,
    sum: 0,
  };
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDEyNzgzNzAsInVzZXJfbmFtZSI6ImpvaG5kb2UiLCJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4ifQ.KJzBWA-T3YI3fJPXNx0w5Iv9NyQUGXHqcG9uZ3acJ_54MlIZ0T0AUc-9e2aZNB7fvRdlwU8U1uMCG2aiXK5JmQ";
  const fetchOrder = async (page, status = null) => {
    try {
      if (status === null) {
        const res = await axios.get(
          `http://localhost/assignment/backend/index.php/orders?page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Order: ", res.data.data);
        setOrders(res.data.data);
      } else {
        const res = await axios.get(
          `http://localhost/assignment/backend/index.php/orders?page=${page}&status=${status}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Order: ", res.data.data);
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder(1);
  }, [loading]);

  const mappingStatus = (status) => {
    if (status === "waiting") {
      return {
        msg: "Chờ duyệt",
        color: "black",
      };
    } else if (status === "confirm") {
      return {
        msg: "Đã duyệt",
        color: "orange",
      };
    } else if (status === "on-delivery") {
      return {
        msg: "Đang vận chuyển",
        color: "orange",
      };
    } else if (status === "done") {
      return {
        msg: "Đã xong",
        color: "green",
      };
    } else if (status === "delete") {
      return {
        msg: "Đã huỷ",
        color: "red",
      };
    }
  };

  return loading === true ? (
    <Loader />
  ) : (
    <div style={{ backgroundColor: "white" }}>
      <h1> Quản lý đơn hàng</h1>
      <br />
      <div>
        {showPopup && (
          <div>

          </div>
        )}
      </div>
      <Grid container spacing={2}>
        <Grid item xs={3} color="black">
          <Link
            onClick={() => {
              fetchOrder(1, "waiting"), setStatus("waiting");
            }}
          >
            Số đơn chờ duyệt: {orders.analyst.waiting}
          </Link>
        </Grid>
        <Grid item xs={3} color="green">
          <Link
            onClick={() => {
              fetchOrder(1, "done"), setStatus("done");
            }}
          >
            Số đơn đã giao: {orders.analyst.done}
          </Link>
        </Grid>
        <Grid item xs={3} color="orange">
          <Link
            onClick={() => {
              fetchOrder(1, "on-delivery"), setStatus("on-delivery");
            }}
          >
            Số đơn đang giao: {orders.analyst.delivery}
          </Link>
        </Grid>
        <Grid item xs={3} color="red">
          <Link
            onClick={() => {
              fetchOrder(1, "delete"), setStatus("delete");
            }}
          >
            Số đơn đã huỷ: {orders.analyst.delete}
          </Link>
        </Grid>

        <Grid item xs={12} color="blue">
          Tổng số tiền thu được: {orders.analyst.sum} $
        </Grid>

        <Grid item xs={12}>
          <Link
            onClick={() => {
              fetchOrder(1, null), setStatus(null);
            }}
          >
            Thiết lập lại
          </Link>
        </Grid>
      </Grid>
      {/* <br />
      <div className="topnav__search" style={{border: "1px solid black", width:"50%"}}>
        <input type="text" placeholder="Tìm kiếm..." />
        <i className="bx bx-search"></i>
      </div> */}
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Địa chỉ giao hàng</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Phương thức thanh toán</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Ngày giao hàng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.order.map((item, index) => {
              const status = mappingStatus(item.status);
              return (
                <TableRow>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.total_price}</TableCell>
                  <TableCell>{item.payment_method}</TableCell>
                  <TableCell>{item.create_at}</TableCell>
                  <TableCell>{item.delivery_time}</TableCell>
                  <TableCell style={{ color: `${status.color}` }}>
                    {status.msg}
                  </TableCell>
                  <TableCell>
                    {item.status == "done" ? (
                      " "
                    ) : (
                      <div>
                        <Link onClick={togglePopup}
                        >
                          <EditNoteIcon />
                        </Link>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Pagination count={10} onChange={handlePage} />
    </div>
  );
}
