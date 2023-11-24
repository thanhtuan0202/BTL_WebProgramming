import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  method: 'momo',
};

const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    changePaymentMethod: (state, action) => {
      state.method = action.payload;
    },
  },
});

const { actions, reducer } = paymentMethodSlice;
export const { changePaymentMethod } = actions;
export default reducer;
