// src/features/auth/auth-saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { type PayloadAction } from "@reduxjs/toolkit";
import { apiClient, setAuthToken } from "@/lib/api";
import { toast } from "sonner";
import {
  authFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  registerRequest,
  registerSuccess,
} from "../slices/auth-slice";
import type { User } from "@/types/auth-types";

type LoginResp = { token: string; user: User };

function postLogin(payload: { email: string; password: string }) {
  return apiClient.post<LoginResp>("/api/auth/login", payload);
}

function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const { data } = yield call(postLogin, action.payload);
    setAuthToken(data.token);
    yield put(loginSuccess({ token: data.token, user: data.user }));
    toast.success("Logged in");
  } catch (err: any) {
    const message =
      err?.response?.data?.error || err?.message || "Login failed. Try again.";
    yield put(authFailure(message));
    toast.error(message);
  }
}

function postRegister(payload: {
  fullName: string;
  email: string;
  password: string;
}) {
  return apiClient.post("/api/auth/register", payload);
}

function* handleRegister(
  action: PayloadAction<{ fullName: string; email: string; password: string }>
) {
  try {
    yield call(postRegister, action.payload);
    yield put(registerSuccess());
    toast.success("Registered successfully. Please login.");
  } catch (err: any) {
    const message =
      err?.response?.data?.error || err?.message || "Registration failed.";
    yield put(authFailure(message));
    toast.error(message);
  }
}

function* handleLogout() {
  try {
    setAuthToken(null);
    yield put(logoutSuccess());
    toast.success("Logged out");
  } catch (err: any) {
    const message = err?.message || "Logout failed";
    yield put(authFailure(message));
    toast.error(message);
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(logoutRequest.type, handleLogout);
}
