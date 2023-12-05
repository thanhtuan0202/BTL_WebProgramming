import React from 'react';
import { useDispatch } from 'react-redux';
import './RemoveCart.scss';
import { deleteCart } from '../../../redux/Reducers/todoCart';
import { useNavigate } from 'react-router-dom';

function RemoveCart(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleDeleteCart = () => {
    dispatch(deleteCart());
    navigate('/');
  };
  return (
    <div className="text-center pt-2">
      <button className="remove-cart" onClick={handleDeleteCart}>
        <i className="fas fa-trash" /> <span>Xóa đơn hàng</span>
      </button>
    </div>
  );
}

RemoveCart.propTypes = {};

export default RemoveCart;
