// loginStatusSlice.js

import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: {
    isLoggedin: false,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedin = action.payload;
    },
  },
});

export default loginStatusSlice.reducer;
export const { setLoginStatus } = loginStatusSlice.actions;
