import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('productList/fetchProducts', async () => {

    const response = await axios.get('https://dummyjson.com/products');
    const result = response.data;
    return result;

});


const allProductSlice = createSlice({
    name: "productList",
    initialState: {
        loading: false,
        allProducts: [],
        error: "",
        searchProduct:[]
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.allProducts = action.payload;
            state.searchProduct= state.allProducts

            state.loading = false;
            state.error = ""
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
        })
    },
    reducers: {
        search: (state, action) => {
            console.log("state",state)    
            state.allProducts = state.searchProduct.filter(item =>
                item.title.toLowerCase().includes(action.payload)
            );
        }
    }
    
    
})

export default allProductSlice.reducer;
export const { search } = allProductSlice.actions;