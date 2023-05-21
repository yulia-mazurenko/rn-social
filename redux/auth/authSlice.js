import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  login: "",
  email: "",
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: (state) => state,
  },
});

export const authReducer = authSlice.reducer;
