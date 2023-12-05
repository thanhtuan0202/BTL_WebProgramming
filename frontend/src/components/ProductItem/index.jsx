import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';

export default function ProductItem(props) {
  const item = props.data;
  const linkToDetail = `detail/${item.id}`;
  return (
    <div className="">
      <div className="food-card">
        <div className="food-card_img">
          <img src={item.img_file} alt="img" />
        </div>
        <div className="food-card_content">
          <div className="food-card_title-section overflow-hidden">
            <h4 className="food-card_title">
              <a href="#!" className="text-dark">
                <Link to={linkToDetail} key={item.id}>
                  {" "}
                  {item.name}{" "}
                </Link>
              </a>
            </h4>
          </div>
          <div className="d-flex">
            <div className="food-card_price" style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                {" "}
                Giá:<span> {item.price + " $"}</span>
              </div>
              <div>
                <p> {item.star} <StarIcon /> </p> 
              </div>
            </div>

            <div className="food-card_order-count">
              <Link to={linkToDetail} key={item.id}>
                <Button
                  sx={{ fontSize: 10 }}
                  style={{ width: 120 }}
                  color="warning"
                  variant="contained"
                >
                  Thêm sản phẩm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
