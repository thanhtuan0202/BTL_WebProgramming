import React, { Component } from 'react';
import ChiTietDonHang from './ChiTietDonHang';
import Loader from '../../../../components/Loader';
import { actFetchDanhSachDonHang, actFetchLoiNhuan } from "./modules/actions";
import { connect } from 'react-redux';
import Search from './Search';

class DanhSachPage extends Component {

    componentDidMount(){
        this.props.fetchData();

        this.props.fetchLoiNhuan();
    }

    // componentWillMount(){
        
    // }

    renderListDonHang(){
        let {loading, data, keyword}= this.props;

        data = data?.filter((donHang) => {
            return(
                donHang.id.toUpperCase().indexOf(keyword.toUpperCase()) !== -1
            );
        })

        if(loading) return <div><Loader/></div>

        return data?.map((donHang) => {
            return (
                <ChiTietDonHang key={donHang.id} donHang={donHang}/>
            );
        })
    }

  render() {
    return (
      <div className='ml-4 mr-4'>
            <h3>Danh sách đơn hàng</h3>
            <div className='shadow p-3 mb-5 bg-white rounded'> 
                <div className='row'>
                    <div className='col-sm m-1 ml-4 bg-primary text-light border rounded'>
                        <h5>Số lượng đơn hàng</h5>
                        <h5>{this.props.soLuongDonHang}</h5>

                    </div>
                    <div className='col-sm m-1 bg-success text-light border rounded'>
                        <h5>Doanh thu</h5>
                        <h5>{this.props.doanhThu} đ</h5>
                    </div>
                    <div className='col-sm m-1 mr-4 bg-secondary text-light border rounded'>
                        <h5>Lợi nhuận</h5>
                        <h5>{this.props.loiNhuan}  đ</h5>
                    </div>
                </div>
            </div>

            <Search />

            <div className='shadow p-3 mb-5 bg-white rounded'>
            <table className="table">
                <tbody>
                    <tr>
                        {/* <th>STT</th> */}
                        <th>
                            Mã đơn hàng 
                        </th>
                        <th>
                            Thông tin đơn hàng
                        </th>
                        <th>
                            Địa chỉ
                        </th>
                        <th>
                            Hình thức thanh toán
                        </th>
                        <th>
                            Ngày tạo đơn
                        </th>
                    </tr>
                    {this.renderListDonHang()}
                </tbody>
            </table>
            </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchData: () => {
            dispatch(actFetchDanhSachDonHang())
        },

        fetchLoiNhuan: () => {
            dispatch(actFetchLoiNhuan())
        }
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.danhSachDonHangReducer.loading,
        data: state.danhSachDonHangReducer.data,
        keyword: state.danhSachDonHangReducer.keyword,
        loiNhuan: state.danhSachDonHangReducer.loiNhuan,
        doanhThu: state.danhSachDonHangReducer.doanhThu,
        soLuongDonHang: state.danhSachDonHangReducer.soLuongDonHang
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (DanhSachPage);
