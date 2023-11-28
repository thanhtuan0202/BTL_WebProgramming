import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Loader from "../../../components/Loader";
import axios from "axios";
import "./home.css";
export default function HomePage() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return loading === true ? (
    <div>
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
    <Loader />
  );
}
