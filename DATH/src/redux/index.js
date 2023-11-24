import { configureStore } from "@reduxjs/toolkit";
import paymentMethod from "./Reducers/paymentMethod";
import todoCart from "./Reducers/todoCart";
import loginUser from "./Reducers/loginUser";
import loginAdmin from "./Reducers/loginAdmin";
import danhSachDonHangReducer from "../container/admin/Page/DanhSachDonHang/modules/reducer";
import detailDonHangReducer from "../container/admin/Page/DetailDonHang/modules/reducer";
const rootReducer = {
  todoCart,
  paymentMethod,
  loginUser: loginUser,
  loginAdmin: loginAdmin,
  danhSachDonHangReducer: danhSachDonHangReducer,
  detailDonHangReducer: detailDonHangReducer
};
export const store = configureStore({
  reducer: rootReducer,
});
