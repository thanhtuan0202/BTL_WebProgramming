import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../../redux/Reducers/todoCart';
import './Item.scss';

function Item(props) {
  const { ten, giaBan, cartQuantity } = props.item;
  const dispatch = useDispatch();
  return (
    <>
      <div className="dish-cart">
        <div className="dish-cart__detail">
          <div className="d-flex flex-column p-1">
            <div>{ten}</div>
            <div>
              <h4> x {cartQuantity}</h4>
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
            <h4> {giaBan}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

Item.propTypes = {};

export default Item;
