import { configureStore } from "@reduxjs/toolkit";
import paymentMethod from "./Reducers/paymentMethod";
import todoCart from "./Reducers/todoCart";
import loginUser from "./Reducers/loginUser";
import loginAdmin from "./Reducers/loginAdmin";
const rootReducer = {
  todoCart,
  paymentMethod,
  loginUser: loginUser,
  loginAdmin: loginAdmin,
};
export const store = configureStore({
  reducer: rootReducer,
});
