// src/features/auth/auth-slice.ts
import type { AuthState, User } from "@/types/auth-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(
      state,
      _action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    registerRequest(
      state,
      _action: PayloadAction<{
        fullName: string;
        email: string;
        password: string;
      }>
    ) {
      state.loading = true;
      state.error = null;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    registerSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },

    // errors
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // optional: restore state after rehydrate (persist)
    setAuthState(
      state,
      action: PayloadAction<{ token: string | null; user: User | null }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const {
  loginRequest,
  registerRequest,
  logoutRequest,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  authFailure,
  setAuthState,
} = authSlice.actions;

export default authSlice.reducer;
