import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllFromCartAPI } from "../services/allAPI";

export const getAllFromCart = createAsyncThunk('carts/getAll', async (reqHeader) => {
    try {
      const response = await getAllFromCartAPI(reqHeader);
      // console.log(' Response: gettAllFromCart', response); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:cart items', error);
      throw error;
    }
  });
  

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading:false,
        allProducts:[],
        error:""
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllFromCart.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getAllFromCart.fulfilled,(state,action)=>{
            state.allProducts=action.payload;
            state.loading=false;
            state.error=""
        })
        builder.addCase(getAllFromCart.rejected, (state, action) => {
            state.loading = false;
            state.allProducts = [];
            state.error = action.payload?.data || "Failed to fetch cart items";
          });
          
          
    }
});


export default cartSlice.reducer;
