import allProductSlice from "./allProductSlice";

import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        allProductSlice: allProductSlice,
        wishListReducer: wishListSlice,
        cartReducer:cartSlice
    }
})

export default store;