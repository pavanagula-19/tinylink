import { setAuthHeader } from "@/lib/api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@/types/auth-types";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
  otpVerified: boolean;
  email: string | null;
  isRegistered: boolean;
  token: string | null;
  firstLogin: boolean;
  fullName?: string | null;
  data: any | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  otpVerified: false,
  email: null,
  isRegistered: false,
  token: null,
  firstLogin: false,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state, _action: PayloadAction<RegisterRequest>) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.isRegistered = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
      else if (action.payload?.error) state.error = action.payload.error;
      else state.error = "Something went wrong";
    },

    loginRequest: (state, _action: PayloadAction<LoginRequest>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.fullName = action.payload.fullName;
      localStorage.setItem("auth_token", action.payload.token);
      setAuthHeader(action.payload.token);
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("auth_token", action.payload);
      setAuthHeader(action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.firstLogin = false;
      state.fullName = undefined;
      state.email = null;
      localStorage.removeItem("auth_token");
      setAuthHeader(null);
    },

    resetAuthState: () => initialState,
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  resetAuthState,
  setToken,

  logout,
} = authSlice.actions;

export default authSlice.reducer;
