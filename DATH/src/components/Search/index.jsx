import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./search.css";


export default function Search({route,navigate}) {
  const location = useLocation();
  console.log(location.state.q)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearch = async () => {
    const res = await axios .get(
      "http://localhost/assignment/backend/index.php/shoes/search",
      {params: location.state}
    );
    setData(res.data.data);
    setLoading(true);
    console.log(res.data.data);
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
        <h1>Kết quả tìm kiếm cho "{location.state.q}"</h1>
      </div>
      <div
        style={{
          fontSize: "16px",
          margin: "15px 5px",
          fontFamily: "roboto"
        }}
      >
        <p> Hiển thị của {data.shoes.length} kết quả</p>
      </div>
      <div className="grid">
        {data.shoes.map((product, index) => (
          <ProductItem data={product} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <>Không tìm thấy sản phẩm</>
  );
}
