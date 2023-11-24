import React,{useState, useEffect} from "react";
import Banner from "../../../components/Banner";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import "./home.css";
export default function HomePage() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    const res = await axios.get("http://localhost:5000/read-list-category");
    setCategory(res.data);
    setLoading(true);
  };
  useEffect(() => {
    fetchCategory();
  }, [loading]);
  useEffect(() => {
    console.log("ListCategory: ", category.data);
  }, [loading]);
  return loading === true ? (
    <div>
      <Banner />
      <div className="list-group">
        <div className="receiver__header">
          <div> Danh mục</div>
        </div>
        <div className="grid-home">
          {category.data.map((cate,ind) =>( 
            <Link to = '/product' key = {ind}>
              <img src={cate.anh} alt="anh" />
              <h4> {cate.ten} </h4>
            </Link>
          )
          )}
        </div>
      </div>
    </div>
  ) : (
    <div> 
      Server Error
    </div>
  );
}
