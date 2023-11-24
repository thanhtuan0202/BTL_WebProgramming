import React, { Component } from 'react';
import {connect} from 'react-redux';
import { actSearch } from './modules/actions';

class Search extends Component {

    handleGetKeyWord = (event) => {
        this.props.searchDonHang(event.target.value);
    }

    render() {
        return <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={this.handleGetKeyWord}/>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      searchDonHang: (keyword) => {
        dispatch(actSearch(keyword));
      }
    }
}

export default connect(null, mapDispatchToProps) (Search);