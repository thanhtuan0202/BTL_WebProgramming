import React, { Component } from 'react';
import {connect} from "react-redux";
import { actSubmit } from './modules/actions';


class editModal extends Component {
    constructor(props){
        super(props);
        this.close = React.createRef();
        this.state={
          id: "",
          idTaiKhoan:"",
        //   maDonHang: "",
          tenKhach: "",
          SDT: "",
          diaChi: "",
          ngayTao: "",
        //   trangThai: "Chờ xử lý",
        //   thanhToan: "",
          hinhThucThanhToan: "Tiền mặt",
        //   sanPham: "",
        //   donGia: "",
        //   soLuong: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        //sẽ chạy khi nhận 1 props mới thay đổi
        //Cập nhật lại state theo nextProps.userEdit
        if(nextProps && nextProps.donHangEdit){
          this.setState({
            id: nextProps.donHangEdit.id,
            idTaiKhoan: nextProps.donHangEdit.idTaiKhoan,
            // maDonHang: nextProps.donHangEdit.maDonHang,
            tenKhach: nextProps.donHangEdit.tenKhach,
            SDT: nextProps.donHangEdit.SDT,
            diaChi: nextProps.donHangEdit.diaChi,
            ngayTao: nextProps.donHangEdit.ngayTao,
            // trangThai: nextProps.donHangEdit.trangThai,
            // thanhToan: nextProps.donHangEdit.thanhToan,
            hinhThucThanhToan: nextProps.donHangEdit.hinhThucThanhToan,
            // sanPham: nextProps.donHangEdit.sanPham,
            // donGia: nextProps.donHangEdit.donGia,
            // soLuong: nextProps.donHangEdit.soLuong,
          })
        }
        else{
          //reset lai state
          this.setState({
            id: "",
            idTaiKhoan: "",
            // maDonHang: "",
            tenKhach: "",
            SDT: "",
            diaChi: "",
            ngayTao: "",
            //trangThai: "Chờ xử lý",
            //thanhToan: "Chưa thanh toán",
            hinhThucThanhToan: "Tiền mặt",
            // sanPham: "",
            // donGia: "",
            // soLuong: ""
          })
        }
    }

    handleOnChange = (event) => {
        const {name, value} = event.target;
        this.setState({
          [name] : value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault(); //ngăn chặn trang web bị load lại trang
        this.props.onSubmit(this.state);
        this.close.current.click();
    }

  render() {
    return (
        <div
            className="modal fade"
            id="modelIdDonHang"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">{this.props.donHangEdit ? "EDIT ĐƠN HÀNG" : "THÊM ĐƠN HÀNG"}</h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        ref={this.close}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Mã đơn hàng</label>
                            <input 
                                disabled
                                type="text" 
                                className="form-control" 
                                name="id"
                                onChange={this.handleOnChange}
                                value={this.state.id}
                            />
                        </div>
                        <div className="form-group">
                            <label>ID Tài Khoản</label>
                            <input 
                                disabled
                                type="text" 
                                className="form-control" 
                                name="idTaiKhoan"
                                onChange={this.handleOnChange}
                                value={this.state.idTaiKhoan}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label>Mã đơn hàng</label>
                            <input 
                                disabled
                                type="text" 
                                className="form-control" 
                                name="maDonHang"
                                onChange={this.handleOnChange}
                                value={this.state.maDonHang}
                            />
                        </div> */}
                        <div className="form-group">
                            <label>Tên khách hàng</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="tenKhach"
                                onChange={this.handleOnChange}
                                value={this.state.tenKhach}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="SDT"
                                onChange={this.handleOnChange}
                                value={this.state.SDT}
                            />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="diaChi"
                                onChange={this.handleOnChange}
                                value={this.state.diaChi}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày tạo đơn</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="ngayTao"
                                onChange={this.handleOnChange}
                                value={this.state.ngayTao}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label>Sản phẩm</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="sanPham"
                                onChange={this.handleOnChange}
                                value={this.state.sanPham}
                            />
                        </div>
                        <div className="form-group">
                            <label>Đơn giá</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="donGia"
                                onChange={this.handleOnChange}
                                value={this.state.donGia}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số lượng</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="soLuong"
                                onChange={this.handleOnChange}
                                value={this.state.soLuong}
                            />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Trạng thái</label>
                            <select 
                                className="form-control"
                                name="trangThai"
                                onChange={this.handleOnChange}
                                value={this.state.trangThai}
                            >
                                <option>Chờ xử lý</option>
                                <option>Chờ giao hàng</option>
                                <option>Hoàn thành</option>
                                <option>Hủy đơn hàng</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Thanh toán</label>
                            <select 
                                className="form-control"
                                name="thanhToan"
                                onChange={this.handleOnChange}
                                value={this.state.thanhToan}
                            >
                                <option>Chưa thanh toán</option>
                                <option>Đã thanh toán</option>
                            </select>
                        </div> */}
                        <div className="form-group">
                            <label>Hình thức thanh toán</label>
                            <select 
                                className="form-control"
                                name="hinhThucThanhToan"
                                onChange={this.handleOnChange}
                                value={this.state.hinhThucThanhToan}
                            >
                                <option>COD</option>
                                <option>PayPal</option>
                                <option>Credit card</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-success"
                        >
                        Submit 
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      donHangEdit: state.danhSachDonHangReducer.donHangEdit,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      onSubmit: (donHang) => {
        dispatch(actSubmit(donHang));
      }
    }
}

  
export default connect(mapStateToProps, mapDispatchToProps) (editModal);

