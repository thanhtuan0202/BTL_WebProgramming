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
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const statusLst = ["waiting", "confirm", "on-delivery", "done", "delete"];
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    console.log(value);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chọn trạng thái</DialogTitle>
      <List sx={{ pt: 0 }}>
        {statusLst.map((item) => (
          <ListItem disableGutters key={item}>
            <ListItemButton onClick={() => handleListItemClick(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Orders() {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const togglePopup = () => {
    setPopup(!popup);
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
  const token = localStorage.getItem("admin");
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
  const handlePage = (e, value) => {
    fetchOrder(value, status);
  };
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(statusLst[1]);
  const [order, setOrder] = useState(1);

  const handleClose = (value) => {
    setSelectedValue(value);
    console.log("order " + order + "with " + value);
    let data = {
      status: value
    }
    const res = axios.patch(
      `http://localhost/assignment/backend/index.php/orders/${order}`,data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    setOpen(false);
    alert("Thay đổi thành công!");
    navigate(0);
  };

  return loading === true ? (
    <Loader />
  ) : (
    <div style={{ backgroundColor: "white" }}>
      <h1> Quản lý đơn hàng</h1>
      <br />
      <div>{popup ? <div></div> : ""}</div>
      <Grid container spacing={2}>
        <Grid item xs={3} color="black">
          <Link
            onClick={() => {
              fetchOrder(1, "waiting").then(setStatus("waiting"));
            }}
          >
            Số đơn chờ duyệt: {orders.analyst.waiting}
          </Link>
        </Grid>
        <Grid item xs={3} color="green">
          <Link
            onClick={() => {
              fetchOrder(1, "done").then(setStatus("done"));
            }}
          >
            Số đơn đã giao: {orders.analyst.done}
          </Link>
        </Grid>
        <Grid item xs={3} color="orange">
          <Link
            onClick={() => {
              fetchOrder(1, "on-delivery").then(setStatus("on-delivery"));
            }}
          >
            Số đơn đang giao: {orders.analyst.delivery}
          </Link>
        </Grid>
        <Grid item xs={3} color="red">
          <Link
            onClick={() => {
              fetchOrder(1, "delete").then(setStatus("delete"));
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
              fetchOrder(1, null).then(setStatus(null));
            }}
          >
            Thiết lập lại
          </Link>
        </Grid>
      </Grid>

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
            {orders && orders.order.length > 0 ? (
              <>
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
                            <Link onClick={ () => {setOpen(true); setOrder(item.id)}}>
                              <EditNoteIcon />
                            </Link>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <Pagination count={10} onChange={handlePage} />
    </div>
  );
}
