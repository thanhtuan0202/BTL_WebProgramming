import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/products/logoBK.png";
import "./navbar.css";
import { Button, Menu, MenuItem,Fade } from "@mui/material";
import { delLoginAction } from "./../../redux/Reducers/loginUser";

function Header() {
  const number = useSelector((state) => state.todoCart.number);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    alert("Đăng xuất thành công!");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    // e.preventDefault();
    setName(e.target.value);
  };
  const handleSearch = (e) => {
    navigate("/search", {state: {q: name}});
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          {user ? (
            <div>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {user.name}
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => {navigate("/user")}}>Thông tin cá nhân</MenuItem>
              <MenuItem onClick={() => {navigate("/order")}}>Danh sách đơn hàng</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
          ) : (
            <Link to={"/login"} className="link">
              <i class="bi bi-person"></i>
              {"Đăng nhập"}
            </Link>
          )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Header;
