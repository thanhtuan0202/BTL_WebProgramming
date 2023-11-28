import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import logo from "../../assets/products/logoBK.png";

import {item} from "./constant.js";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar-admin__item">
      <div className={`sidebar-admin__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const SidebarAdmin = (props) => {
  // const activeItem = sidebar_items.findIndex(
  //   (item) => item.route === props.location.pathname
  // );

  return (
    <div className="sidebar-admin">
      <div>
        <div className="sidebar-admin__logo">
          <img src={logo} alt="logo" />
          <h6>BKStore </h6>
        </div>
      </div>
      {item.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            // active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default SidebarAdmin;
