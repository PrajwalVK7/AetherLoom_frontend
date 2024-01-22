import { createSlice } from "@reduxjs/toolkit";



const wishListSlice = createSlice({
    name: "wishList",
    initialState: [],
    reducers: {
        addToWishList: (state, action) => {
            state.push(action.payload);
            // console.log("state awish",state)
        }
        ,
        removeFromWishList: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        }
    }

})

export const { addToWishList,removeFromWishList } = wishListSlice.actions
export default wishListSlice.reducer;