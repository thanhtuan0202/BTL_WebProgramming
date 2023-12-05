import React, { useEffect, useState } from "react";
import  ProductItem  from "../ProductItem";
import axios from "axios";

import "./style.css";

export const ProductList = (props) => {
  const chosen = props.data;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProduct = async () =>{
    const res = await axios .get(
        `http://localhost/assignment/backend/index.php/shoes/category/${chosen + 1}`
      )
      console.log("Product: ", res.data.data);
      setProduct(res.data.data);
      setLoading(true);
  }
  useEffect(() => {
    fetchProduct();
  },  [loading])

  return loading === true ? (
        <div className="grid">
          {product.shoes.map((product,index) => (
            <ProductItem data={product} key= {index}/>
          ))}
        </div>
  )
  :( 
    <div> Hiện không có sản phẩm.</div>
  );
};
