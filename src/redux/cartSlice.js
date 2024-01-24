import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item => (
                    item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
                ));
            } else {
                return [...state, { ...action.payload, count: 1 }];
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        incrementCount: (state, action) => {
            const itemId = action.payload;
            const newState = state.map(item => (
                item.id === itemId ? { ...item, count: item.count + 1 } : item
            ));
            return newState;
        },
        decrementCount: (state, action) => {
            const itemId = action.payload;
            const newState = state.map(item => (
                item.id === itemId && item.count > 1 ? { ...item, count: item.count - 1 } : item
            ));
            return newState;
        }
    }
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, incrementCount, decrementCount } = cartSlice.actions;
