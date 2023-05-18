import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/signup/fulfilled", "auth/signin/fulfilled"],
      },
    }),
});
