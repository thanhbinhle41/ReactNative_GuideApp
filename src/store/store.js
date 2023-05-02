import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const reducers = combineReducers({
  auth: authSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: reducers
});
