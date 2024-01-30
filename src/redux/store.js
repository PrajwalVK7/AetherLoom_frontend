// store.js

import { configureStore } from "@reduxjs/toolkit";
import allProductSlice from "./allProductSlice";
import wishListSlice from "./wishListSlice";
import cartSlice from "./cartSlice";
import loginStatusSlice from "./loginStatusSlice";

const store = configureStore({
  reducer: {
    allProductSlice: allProductSlice,
    wishListReducer: wishListSlice,
    cartReducer: cartSlice,
    loginStatusReducer: loginStatusSlice,
  },
});

export default store;
