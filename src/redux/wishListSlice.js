import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllFromWishlist } from "../services/allAPI";

export const getAllFromWishlists = createAsyncThunk('wishlists/getAll', async (reqHeader) => {
    try {
        const response = await getAllFromWishlist(reqHeader);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
})

const wishListSlice = createSlice({
    name: "wishList",
    initialState: {
        loading: false,
        allProducts: [],
        error: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getAllFromWishlists.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllFromWishlists.fulfilled, (state, action) => {
            state.allProducts = action.payload;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(getAllFromWishlists.rejected, (state, action) => {
            state.loading = false;
            state.allProducts = [];
            state.error = action.payload?.data || "failed to fetch data from wishlist";
        });
    },
});


export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
