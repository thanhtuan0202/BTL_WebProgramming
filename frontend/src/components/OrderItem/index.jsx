import React from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderItem(props) {
  const item = props.data;

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
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  const handleCancel = () => {
    const res = axios.patch(`http://localhost/assignment/backend/index.php/orders/${item.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if(res.data.data.error){
        alert("Error: " + res.data.data.error);
    }
    else{
        alert("Thay đổi thành công!")
    }
  };
  return (
    <div style={{ margin: "5px  10px", backgroundColor: "#ffffff", padding: "10px 0"}}>
      <div>
        <h4
          style={{
            color: `${mappingStatus(item.status).color}`,
            textAlign: "left",
            padding: "0px 10px",
          }}
        >
          {" "}
          {mappingStatus(item.status).msg}
        </h4>
        <h5 style={{ textAlign: "left", padding: "5px 10px" }}>
          Địa chỉ: {item.address}{" "}
        </h5>
        <h5 style={{ textAlign: "left", padding: "5px 10px" }}>
          Số điện thoại: {item.phone_number}{" "}
        </h5>
        <h5 style={{ textAlign: "left", padding: "5px 10px" }}>
          Phương thức thanh toán: {item.payment_method}{" "}
        </h5>
      </div>
      <div>
        {item.items.map((product, idx) => (
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <img src={product.img_id} alt="img" style={{ maxWidth: 240 }} />
            </Grid>
            <Grid item xs={4}>
              <Link to={`/product/detail/${product.product_id}`}>
                <h4 style={{ textAlign: "left" }}>{product.name} </h4>
              </Link>
              <p style={{ fontSize: "12px", textAlign: "left" }}>
                Phân loại:{" "}
                <span>
                  {product.model},{product.size},{product.color}
                </span>
              </p>
              <p style={{ fontSize: "12px", textAlign: "left" }}>
                Giá tiền: <span>{product.price}</span>
              </p>
              <p style={{ fontSize: "12px", textAlign: "left" }}>
                Số lượng: <span>{product.quantity}</span>
              </p>
              <br />
              <h4 style={{ textAlign: "left", color: "orange" }}>
                Thành Tiền: {formatter.format(item.total_price)}{" "}
              </h4>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        ))}
      </div>
      <div>
        {item.status === "waiting" || item.status === "on-delivery" || item.status === "confirm" ? (
          <div>
            <Button onClick={handleCancel} variant="contained" color="error">Huỷ</Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
