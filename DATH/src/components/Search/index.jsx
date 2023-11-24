import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./search.css";


export default function Search(props) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameFind, setNameFind] = useState([]);
  useEffect(() => {
    setNameFind(JSON.parse(localStorage.getItem("search")));
  });
  const fetchSearch = async () => {
    const res = await axios .post(
      "http://localhost:5000/find-product-by-name",
      nameFind
    );
    setData(res.data);
    setLoading(true);
    console.log(res.data);
  };

  useEffect(() => {
    fetchSearch();
    console.log("search: ", data);
  }, [loading]);

  return loading === true ? (
    <div className="search-bar">
      <div
        style={{
          fontSize: "10px",
          margin: "15px 5px",
        }}
      >
        <h1>Kết quả tìm kiếm cho "{nameFind.nameFind}"</h1>
      </div>
      <div
        style={{
          fontSize: "16px",
          margin: "15px 5px",
          fontFamily: "roboto"
        }}
      >
        <p> Hiển thị của {data.productResult.length} kết quả</p>
      </div>
      <div className="grid">
        {data.productResult.map((product, index) => (
          <ProductItem data={product} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <>Không tìm thấy sản phẩm</>
  );
}
