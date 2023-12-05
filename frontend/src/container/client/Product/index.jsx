import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./pro_style.css";
import { ProductList } from "../../../components/ProductList";
import Loader from "../../../components/Loader";
import ProductItem from "../../../components/ProductItem";

const Product = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState(0);
  const [product, setProduct] = useState([]);
  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/categories`
      );
      setCategory(res.data.data);

      const res_pro = await axios.get(
        `http://localhost/assignment/backend/index.php/shoes/category/${chosen + 1}`
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
    fetchCategory();
  }, []);


  const fetchProduct = async (idx) => {
    try {
      if (idx === undefined) {
        idx = 0;
      }
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/shoes/category/${idx + 1}`
      );
      console.log("Product: ", res.data.data);
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProduct([]);
    }
  };

  // useEffect(() => {
  //   fetchProduct(chosen);
  // }, [chosen]);

  return loading === false ? (
    <>
      <div className="grid-container">
        <div className="sidebar grid-item">
          <span className="sidebar__h">
            <i class="bi bi-menu-down"></i>
            <h3> DANH MỤC SẢN PHẨM </h3>
          </span>
          {category.categories.map((item, index) => (
            <Button
              fullWidth
              style={{
                textTransform: "none",
                color: index === chosen ? "white" : "black",
                display: "flex",
                justifyContent: "flex-start",
                borderBottom: index === chosen ? "" : "solid 1px #B5D2E8",
              }}
              size="large"
              onClick={() => {
                setChosen(index),
                fetchProduct(index)
              }}
              variant={index === chosen ? "contained" : "text"}
            >
              {item.name}
            </Button>
          ))}
        </div>

        <div className="grid-item">
          {product ? (
            <div className="grid">
              {product.shoes.map((product, index) => (
                <ProductItem data={product} key={index} />
              ))}
            </div>
          ) : (
            <div> Hiện không có sản phẩm.</div>
          )}
        </div>
      </div>
    </>
  ) : (
    <div>
      <p> Danh sách loại sản phẩm không tồn tại</p>
    </div>
  );
};

export default Product;
