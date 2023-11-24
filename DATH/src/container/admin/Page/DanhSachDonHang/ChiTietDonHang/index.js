import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { actFetchDanhSachDonHang, actEdit } from '../modules/actions';
import {connect} from "react-redux";
import EditModal from '../editModal';

class ChiTietDonHang extends Component {  

  handleDelete(id){
    return axios({
      url:`http://localhost:5000/delete-order`,
      method:"POST",
      data:{
        "id": id,
      }
    })
      .then(() => {
        this.props.fetchData();
      })
      .catch()
  }

  render() {
    const {donHang} = this.props;
    return (
      <>
        <tr>
          <td>{donHang.id}</td>
          {/* <td>{"MDH" + donHang.SDT}</td> */}
          <td>
            <h>{donHang.tenKhach}</h><br></br>
            <h className='text-secondary'>{donHang.SDT}</h>  
          </td>
          <td>{donHang.diaChi}</td>
          <td>{donHang.hinhThucThanhToan}</td>
          <td>{donHang.ngayTao}</td>
          <td>
            <button 
              class="btn btn-primary" 
              data-toggle="modal"
              data-target="#modelIdDonHang"
              onClick={() => {
                this.props.editDonHang(donHang);
              }}
            >
              Sửa
            </button>
          </td>
          <td>
              <Link  class="btn btn-success" to={`/detail/${donHang.id}`}>Chi tiết</Link>
          </td>
          <td>
              <button type="button" class="btn btn-danger" onClick={() => { 
                this.handleDelete(donHang.id);
               }}>
                Xóa
              </button>
          </td>
        </tr>
        <EditModal />
      </>
      
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      fetchData: () => {
          dispatch(actFetchDanhSachDonHang());
      },

      editDonHang: (donHang) => {
          dispatch(actEdit(donHang));
      }
  }
}

export default connect(null, mapDispatchToProps) (ChiTietDonHang);


