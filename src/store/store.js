import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
import blogSlice from "./blogSlice";

const reducers = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer,
  blog: blogSlice.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: reducers
});
