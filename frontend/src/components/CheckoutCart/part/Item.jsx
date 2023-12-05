import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../../redux/Reducers/todoCart';
import './Item.scss';

function Item(props) {
  const item = props.data;
  const dispatch = useDispatch();
  return (
    <>
      <div className="dish-cart">
        <div className="dish-cart__detail">
          <div className="d-flex flex-column p-1">
            <div>{item.vp_name}</div>
            <div>
              <h4> x {item.quantity}</h4>
            </div>
            <button
              onClick={() => {
                dispatch(removeCart(props.item));
              }}
              className="dish-cart__detail__remove"
            >
              Xóa
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center dish-cart__price">
          <div>
            <h4> {item.price}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

Item.propTypes = {};

export default Item;
