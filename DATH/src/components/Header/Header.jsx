import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/products/logoBK.png";
import "./navbar.css";
import { Button } from "@mui/material";
import { delLoginAction } from "./../../redux/Reducers/loginUser";

function Header() {
  const number = useSelector((state) => state.todoCart.number);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUser);

  const handleLogout = (e) => {
    alert("Đăng xuất thành công!");
    localStorage.removeItem("user");
    dispatch(delLoginAction());
    navigate("/");
  };

  const handleChange = (e) => {
    // e.preventDefault();
    setName(e.target.value);
  };
  const handleSearch = (e) => {
    const nameFind = {
      nameFind: name,
    };
    localStorage.setItem("search", JSON.stringify(nameFind));
    if (window.location.pathname !== "/search") {
      navigate("/search");
    } else {
      navigate(0);
    }
  };

  return (
    <nav class="navbar fixed-top navbar-expand-lg header" id="mainNavbar">
      <div class="container-fluid d-flex order-lg-1 header-item">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt />
          </Link>
          <div style={{ margin: "0px 2px" }}>
            <h1>BK Store</h1>
          </div>
        </div>

        <div
          class="collapse navbar-collapse order-lg-2"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav">
            <Link to="/" className="header__link nav-link">
              Trang chủ
            </Link>
            <Link to="/product" className="header__link nav-link">
              Sản phẩm
            </Link>
            <Link to="/descript" className="header__link nav-link">
              Giới thiệu
            </Link>
          </div>
        </div>

        <div className="header__ctn order-lg-2" >
          <div className="container row" >
            <div className="col-9" style={{padding: "0px"}}>
              <input
                type="text"
                id="search"
                className="navbar-search mt-2"
                placeholder="Tìm kiếm sản phẩm"
                onChange={handleChange}
              />
            </div>
            <div className="col-3" style={{padding: "2px"}}>
              <button className="btn" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
          <div>
            <Link to="/cart" className="link">
              <i class="bi bi-cart"></i>
              <span>Giỏ hàng</span>
              <div className="qty">{number}</div>
            </Link>
          </div>
          <div>
            <Link to={user.isLogin ? "/user" : "/login"} className="link">
              <i class="bi bi-person"></i>
              {user.isLogin ? user.userInfo.name : "Đăng nhập"}
            </Link>
          </div>

          {user.isLogin ? (
            <div className="header__logout" title="Đăng xuất">
              <Button type="submit" onClick={handleLogout}>
                <i class="bi bi-box-arrow-right"></i>
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
