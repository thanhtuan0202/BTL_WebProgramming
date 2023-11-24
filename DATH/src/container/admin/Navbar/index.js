import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
export default class NavbarAdmin extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light text-secondary shadow p-3 mb-5 bg-white rounded">
          <ul className="navbar-nav" >
            <li className="nav-item">
              <Link activeClassname="active" className="nav-link" to="/admin/san-pham">
                <h5>Sản phẩm</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link activeClassname="active" className="nav-link" to="/admin/danh-sach">
                <h5>Danh sách đơn hàng</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link activeClassname="active" className="nav-link" to="/admin/quan-ly">
                <h5>Quản lý tài khoản</h5>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    )
  }
}
