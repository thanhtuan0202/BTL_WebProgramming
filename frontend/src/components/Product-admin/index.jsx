import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";

export default function ProductAdmin(props) {
  const item = props.data;
  console.log(props.key);
  const linkToEdit = `/admin/editProduct/${item.id}`;
  const linkToDetail = `/product/detail/${item.id}`;
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'
  }); 
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
                <Link to={linkToDetail} key={item.id} state={{item}}>
                  {" "}
                  {item.name}{" "}
                </Link>
              </a>
            </h4>
          </div>
          <div className="d-flex">
            <div
              className="food-card_price"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {" "}
                Giá:<span> {formatter.format(item.price) }</span>
              </div>
              <div>
                <p>
                  {" "}
                  {item.star} <StarIcon />{" "}
                </p>
              </div>
            </div>

            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Link to={linkToEdit} key={item.id} state={{item}}>
                  <Button
                    sx={{ fontSize: 10 }}
                    style={{ width: 100 }}
                    color="warning"
                    variant="contained"
                    onClick={()=> {
                      
                    }}
                  >
                    Sửa
                  </Button>
                </Link>
              </div>
              <div>
                <Link to={linkToEdit} key={item.id}>
                  <Button
                    sx={{ fontSize: 10 }}
                    style={{ width: 100 }}
                    color="warning"
                    variant="contained"
                  >
                    Xoá
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
