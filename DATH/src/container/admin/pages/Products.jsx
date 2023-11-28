import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import axios from "axios";
import { Grid } from "@mui/material";
import ProductItem from "../../../components/ProductItem";
export default function Products() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    try {
      const res_pro = await axios.get(
        `http://localhost/assignment/backend/index.php/shoes`
      );
      console.log("Product: ", res_pro.data.data);
      setProduct(res_pro.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return loading === true ? (
    <Loader />
  ) : (
    <div style={{ backgroundColor: "white" }}>
      <h1> product page</h1>
      <Grid container spacing={2}>
        {product.shoes.map((item, index) => (
          <Grid item xs={4}>
            <ProductItem data={item} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
