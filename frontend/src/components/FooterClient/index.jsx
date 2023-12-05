import React from "react";
import "./FooterClient.css";

function FooterClient() {
  return (
    <div>
      <div style={{ backgroundColor: "gray" }}>
        <br/>
      </div>
      <div className="footer">
        <div className="container-lg row container-fluid">
          <div className="col-lg-3 footer__first">
            <h3 className="footer__title">Giới thiệu</h3>
            <ul className="footer__links">
              <li>
                <i class="bi bi-chevron-right"></i>
                Về chúng tôi
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Showroom
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Tin tức
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Liên hệ
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h3 className="footer__title">Chính sách</h3>
            <ul className="footer__links">
              <li>
                <i class="bi bi-chevron-right"></i>Chính sách bảo hành
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Chính sách vận chuyển
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Chính sách thanh toán
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Chính sách đổi trả
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Chính sách bảo mật
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h3 className="footer__title">Tin tức</h3>
            <ul className="footer__links">
              <li>
                <i class="bi bi-chevron-right"></i>Tin tức về công nghệ
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Chia sẻ tư vấn
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Đánh giá sản phẩm
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>Hướng dẫn, giải pháp
              </li>
            </ul>
          </div>

          <div className="col-lg-3 ">
            <h3 className="footer__title">Liên hệ với chúng tôi</h3>
            <ul className="footer__links">
              <li>
                <i class="bi bi-facebook" style={{}}></i>
                BK Store
              </li>
              <li>
                <i class="bi bi-telephone-fill"></i>
                01234567
              </li>
              <li>
                <i class="bi bi-envelope"></i>
                abcd@hcmut.edu.vn
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="coppyright">  <p>Coppyright &copy; 2023 - BKStore. All Right Reserved</p> </div>
    </div>
  );
}

export default FooterClient;
