import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;

export const userSelector = (state) => state.auth.user;
// export const isAdminSelector = (state) => state.auth.isAdmin;
// export const currentIDSelector = (state) => state.auth.currentID;
