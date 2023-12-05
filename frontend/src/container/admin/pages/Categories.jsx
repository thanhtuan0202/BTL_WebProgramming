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
      <h2> Quản lí</h2>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.categories.map((item, index) => {
              return (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
