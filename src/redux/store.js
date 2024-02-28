// store.js

import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";
import cartSlice from "./cartSlice";
import loginStatusSlice from "./loginStatusSlice";

const store = configureStore({
  reducer: {
    wishListReducer: wishListSlice,
    cartReducer: cartSlice,
    loginStatusReducer: loginStatusSlice,
  },
});

export default store;
