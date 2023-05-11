import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";

const reducers = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: reducers
});
