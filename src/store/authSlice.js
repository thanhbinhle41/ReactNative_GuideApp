import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_IMAGE_URL } from "../utils/constant";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      fullName: "",
      dob: "",
      phone: "",
      country: "",
      city:  "",
      image: DEFAULT_IMAGE_URL,
    },
    listUsersBlog: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    addUsersBlog: (state, action) => {
      const { id, data } = action.payload;

      state.listUsersBlog[id] = data;
    },
  },
  extraReducers: (builder) => {},
});

export default authSlice;

export const authSliceActions = authSlice.actions;

export const userSelector = (state) => state.auth.user;
export const listUsersBlogSelector = (state) => state.auth.listUsersBlog;
