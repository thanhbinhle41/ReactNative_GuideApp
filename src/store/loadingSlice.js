import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default loadingSlice;

export const loadingSliceActions = loadingSlice.actions;

export const loadingSelector = (state) => state.loading.isLoading;
