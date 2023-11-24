import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./pro_style.css";
import { ProductList } from "../../../components/ProductList";
import Loader from "../../../components/Loader";
import ProductItem from "../../../components/ProductItem";

const Product = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chosen, setChosen] = useState(0);

  const fetchCategory = async (props) => {
    const res = await axios.get(
      `http://localhost/assignment/backend/index.php/categories`
    );
    setCategory(res.data.data);
    setLoading(true);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const [product, setProduct] = useState([]);
  const [ploading, setPloading] = useState(false);
  const fetchProduct = async (idx) => {
    if(idx === undefined){
      idx = 0;
    }
    const res = await axios.get(
      `http://localhost/assignment/backend/index.php/shoes/category/${idx + 1}`
    );
    console.log("Product: ", res.data.data);
    setProduct(res.data.data);
    setPloading(true);
  };
  useEffect(() => {
    fetchProduct();
  }, [loading]);

  return loading === true ? (
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
          {product !== undefined ? (
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
