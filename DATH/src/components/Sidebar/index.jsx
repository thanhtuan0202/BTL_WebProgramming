import React,{useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";
import sidebar_items from "./sidebar_data.json";


const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () =>{
    const res = await axios .get(
      "http://localhost:5000/read-list-category"
    )
      setCategory(res.data);
      setLoading(true);
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    console.log("ListCategory: ", category.data);
  }, [loading]);

  return loading === true ? (
    <div className="sidebar">
        <span className="sidebar__h">
          <i class="bi bi-menu-down"></i>
          <h6 > DANH MỤC SẢN PHẨM </h6>
        </span>

      {category.data.map((item, index) => (
        <Link to='/' key={index} class = "links">
          <SidebarItem
            title={item.ten}
            backgroundColor="#FFFFFF"
          />
        </Link>
      ))}
    </div>
  ): (
    <div> 
      <p> Danh sách loại sản phẩm không tồn tại</p>
    </div>
  )
};

export default Sidebar;
