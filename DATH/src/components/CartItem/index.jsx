
import Button from '@mui/material/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseCart,
  removeCart,
} from '../../redux/Reducers/todoCart';

export default function CartItem(props) {
  const dispatch = useDispatch();
  const item = props.data;
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };
  const handleDecrease = () => {
    dispatch(decreaseCart(item));
  };
  const removeCartItem = () => {
    dispatch(removeCart(item));
  };
  return (
    <tr >
      <td className="table-close-btn">
        <Button onClick={removeCartItem} variant="contained" color="error" className="mt-4">
          <i class="bi bi-trash3-fill"></i>
        </Button>
      </td>
      <td scope="row">
        <img src={item.anh} alt="img" style={{ maxWidth: 100 }} />
      </td>
      <td className="item-name">
        <div className="details mt-3 pd-3">
          <h3>{item.ten}</h3>
        </div>
      </td>
      <td>
        <h3 className="mt-3 pd-3">{item.giaBan}</h3>
      </td>
      <td className="table-quantity">
          <div className="mt-4 pd-4 container row"
          style={{
            display:"flex",
            justifyContent:"space-around",
            alignItems: "center"
          }}>
            <Button
              onClick={handleDecrease}
              variant="contained"
              color="success"
            >
              <i class="bi bi-dash"></i>
            </Button>
            <h4>{item.cartQuantity}</h4>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              color="success"
            >
              <i class="bi bi-plus"></i>
            </Button>
          </div>
      </td>
      <td>
        <h3 className="mt-3 pd-3">{item.totalPriceItem}</h3>
      </td>
    </tr>
  );
}
