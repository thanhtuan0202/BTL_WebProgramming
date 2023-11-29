import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import axios from "axios";
import { Grid, Button, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import ProductAdmin from "../../../components/Product-admin";
export default function Products() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const fetchProduct = async (page) => {
    try {
      const res_pro = await axios.get(
        `http://localhost/assignment/backend/index.php/shoes?page=${page - 1}&limit=9`
      );
      setProduct(res_pro.data.data);
      console.log("Product: ", res_pro.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(1);
  }, []);

  const handlePage = (e, value) => {
    fetchProduct(value);
  };
  return loading === true ? (
    <Loader />
  ) : (
    <div style={{ backgroundColor: "white" }}>
      <h1> Quản lý sản phẩm</h1>
      <br />
      <Link to="/admin/addProducts">
        <Button variant="contained" color="success">
          Thêm sản phẩm
        </Button>
      </Link>
      <br />
      <br />
      {(product && product.shoes) ? (
        <Grid container spacing={2}>
          {product.shoes.map((item, index) => (
            <Grid item xs={4}>
              <ProductAdmin data={item} key={index} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div> 
          Danh sách hiện tại trống
        </div>
      )}
      <br />
      <Pagination
        count={10}
        onChange={handlePage}
      />
    </div>
  );
}
