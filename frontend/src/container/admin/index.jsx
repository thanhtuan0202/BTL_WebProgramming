import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import Topnav from "../../components/TopNavAdmin/TopNav";
import { Navigate } from "react-router-dom";

function LayoutAdmin(props) {
  if (!localStorage.getItem("admin")) return <Navigate to="/admin/login" />;
  return (
    <div className="App">
      <SidebarAdmin />
      <div
        style={{
          paddingLeft: "var(--sidebar-width)",
          backgroundColor: "var(--second-bg)",
          minHeight: "100vh",
        }}
      >
        <Topnav />
        <div style={{padding: "10px"}}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
export default LayoutAdmin;
