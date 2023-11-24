import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  number: 0,
  cartItem: [],
  listCart: [],
  total: 0,
};
if (localStorage.getItem('cart') === null){
  localStorage.setItem('cart', JSON.stringify(initialState));
}
else{
  // initialState =  JSON.parse(localStorage.getItem('cart'));
  Object.assign(initialState,JSON.parse(localStorage.getItem('cart')))
}
const todoCart = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    
    fetchCart: (state, action) => {
      state.listCart = action.payload;
    },
    addToCart: (state, action) => {
      const itemsIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemsIndex >= 0) {
        state.cartItem[itemsIndex].cartQuantity += 1;
        state.cartItem[itemsIndex].totalPriceItem =state.cartItem[itemsIndex].cartQuantity * state.cartItem[itemsIndex].giaBan;
      } else {
        const tempCart = {
          ...action.payload,
          cartQuantity: 1,
          totalPriceItem: action.payload.giaBan,
        };
        state.cartItem.push(tempCart);
      }
      state.number += 1;
      state.total += action.payload.giaBan * 1;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseCart: (state, action) => {
      const itemsIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItem[itemsIndex].cartQuantity -= 1;
      state.number -= 1;
      state.total -= state.cartItem[itemsIndex].giaBan * 1;
      if (state.cartItem[itemsIndex].cartQuantity === 0) {
        state.cartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.cartItem[itemsIndex].totalPriceItem -= state.cartItem[itemsIndex].giaBan;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeCart(state, action) {
      const itemsIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      state.number -= state.cartItem[itemsIndex].cartQuantity;
      state.total -= state.cartItem[itemsIndex].totalPriceItem;
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem('cart', JSON.stringify(state));
    },
    deleteCart(state, action) {
      // Delete cart when click "Xoa don hang"  
      state.number = 0;
      state.total = 0;
      state.cartItem = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
const { actions, reducer } = todoCart;
export const { addToCart, removeCart, fetchCart, decreaseCart, deleteCart } =
  actions;
export default reducer;
