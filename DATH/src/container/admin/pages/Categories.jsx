import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import axios from 'axios';
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
export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();

  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/categories`
      );
      setCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return loading === true ? (
    <Loader />
  ) : (
    <div>
      <h2> Catogory page</h2>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
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
                        <Link
                          to={`/user-manager/editPost/${item.id}`}
                          state={{ item }}
                        >
                          <EditNoteIcon />
                        </Link>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  );
}
