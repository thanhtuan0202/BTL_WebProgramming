import React, { Component } from 'react';
import { actFetchDetailDonHang } from './modules/actions';
import {connect} from "react-redux";
import Loader from "./../../../component/Loader";
import "./../DetailDonHang/style.css";

class DetailDonHangPage extends Component {
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchDetailDonHang(id);
    }

    renderListChiTietSanPhamTrongDonHang(){
        const {productInOrder} = this.props;
        return(
            productInOrder?.map((sanPham) => {
                return(
                    <tr>
                        <td >
                            <img className='img_logo' src={sanPham.anh} alt={sanPham.tenSanPham}></img> 
                        </td>

                        <td>
                            {sanPham.tenSanPham}
                        </td>

                        <td>
                            {sanPham.moTa}
                        </td>

                        <td>
                            {sanPham.donVi}
                        </td>

                        <td>
                            {sanPham.soLuong}
                        </td>

                        <td>
                            {sanPham.thanhTien}
                        </td>
                    </tr>
                    
                )
            })
        )
    }

  render() {
    const {loading, sumInOrder, detailOrder} = this.props;
    console.log(detailOrder)
    if(loading) return <Loader/>;
    return (
      <div className='ml-4 mr-4'>
        <h3>Khách Hàng: {detailOrder && detailOrder[0].tenKhach}</h3>
        <div className='shadow p-3 mb-5 bg-white rounded'>
            <div className='row'>
                <div className='col-sm bg-light ml-4 mr-4'>
                    <h4>Thông tin đơn hàng</h4>
                    <table className='pd-10'>
                        <tr>
                            <th>
                                <h5 className='mt-3'>Khách hàng</h5>
                            </th>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{detailOrder && detailOrder[0].tenKhach}</td>
                        </tr>

                        <tr>
                            <th>
                                <h5 className='mt-3'>Số điện thoại</h5>
                            </th>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{detailOrder && detailOrder[0].SDT}</td>
                        </tr>

                        <tr>
                            <th>
                                <h5 className='mt-3'>Địa chỉ</h5>
                            </th>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{detailOrder && detailOrder[0].diaChi}</td>
                        </tr>

                        <tr>
                            <th>
                                <h5 className='mt-3'>Ngày tạo</h5>
                            </th>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{detailOrder && detailOrder[0].ngayTao}</td>
                        </tr>

                        <tr>
                            <th>
                                <h5 className='mt-3'>Hình thức thanh toán</h5>
                            </th>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <td>{detailOrder && detailOrder[0].hinhThucThanhToan}</td>
                        </tr>
                        
                    </table>
                </div>
                <div className='col-sm'>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>
                                    Đơn giá
                                </th>
                                <th>Mô Tả</th>
                                <th>
                                    Số lượng
                                </th>
                                <th>
                                    Thành tiền
                                </th>
                            </tr>
                            
                            {this.renderListChiTietSanPhamTrongDonHang()}

                            {/* <tr>
                                <td>
                                    {data && data.sanPham}
                                </td>

                                <td>
                                    {data && data.donGia}
                                </td>

                                <td>
                                    {data && data.soLuong}
                                </td>

                                <td>
                                    {data && data.donGia*data.soLuong}
                                </td>

                                
                            </tr> */}
                        </tbody>
                    </table>

                    <div className='row'>
                        <div className='col-8 text-right'>
                            <h6>Tổng tiền thanh toán</h6>
                        </div>

                        <div className='col-4 text-left'>
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                {sumInOrder && sumInOrder[0].tongTien}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        loading: state.detailDonHangReducer.loading,
        // data: state.detailDonHangReducer.data,
        productInOrder: state.detailDonHangReducer.productInOrder,
        sumInOrder: state.detailDonHangReducer.sumInOrder,
        detailOrder: state.detailDonHangReducer.detailOrder,
    }
}   

const mapDispatchToProps = (dispatch) => {
    return{
        fetchDetailDonHang: (id) => {
            dispatch(actFetchDetailDonHang(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailDonHangPage);
