import React from 'react'

const Descript = () => {
    return (
        <div>
            <h2 className="page-header1">
               Cửa hàng BKStore
            </h2>
            <h2 className="page-header2">
                Trang web thương mại điện tử của cửa hàng BKStore
            </h2>
            <div className="row">
                <div className="col-4">
                    <h2 className="line0">Các chức năng trang web</h2>
                    <div>
                        <ul>
                            <li className="line"> Khách hàng:</li>
                            <ul className="col-md-12 line1">
                                <li>Đặt hàng</li>
                                <li>Thanh toán</li>
                                <li>Xem giỏ hàng</li>
                                <li>Tìm kiếm sản phẩm</li>
                            </ul>                          
                            <li className="line">Admin:</li>
                            <ul className="col-md-12 line1">
                                <li>Quản lí doanh thu</li>
                                <li>Quản lí sản phẩm</li>
                                <li>Quản lí tài khoản</li>
                                <li>Thay đổi thông tin tài khoản</li>
                            </ul>
                        </ul> 
                    </div>                                                                                                                                                                                                                                              
                </div>
                <div className="col-4">
                    <h3 className="line0">Công nghệ sử dụng </h3>
                    <div>
                        <ul>
                            <li className="line"> Frontend:</li>
                            <ul className="col-md-12 line1">
                                <li>Html, Css, Javascripts</li>
                                <li>Bootstrap</li>
                                <li>Reactjs</li>
                                <li>Bootstrap Icons</li>
                            </ul>                          
                            <li className="line">Backend:</li>
                            <ul className="col-md-12 line1">
                                <li>Database: MySql</li>
                                <li>ExpressJs</li>
                            </ul>
                        </ul> 
                    </div>                                                                                                                                                                                                                                                                                                                          
                </div>
                <div className="col-4">
                    <h3 className="line0">Tài liệu tham khảo</h3>
                     <div>
                         <ul>
                             <li className="line"> ReactJS | by F8</li>
                             <li className="line">Youtube: Xây dựng NodeJS web server sử dụng Express-CodersX</li>
                         </ul>
                     </div>          
                </div>
            </div>
        </div>
    )
}

export default Descript
