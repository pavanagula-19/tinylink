import { call, put, takeLatest } from "redux-saga/effects";
import type { AxiosResponse } from "axios";

import type { LoginRequest, LoginResponse } from "@/types/auth-types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setAuthHeader } from "@/lib/api";

import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerSuccess,
  registerRequest,
} from "../slices/auth-slice";
import { loginApi, registerApi } from "@/api/auth-api";

function getErrorMessage(err: any): string {
  if (err.response?.data) {
    const data = err.response.data;
    if (typeof data === "string") return data;
    if (data.message) return data.message;
    if (data.error) return data.error;
    return JSON.stringify(data);
  }
  if (err.message) return err.message;
  return "Something went wrong";
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    yield call(registerApi, action.payload);
    yield put(registerSuccess());
  } catch (err: any) {
    yield put(registerFailure(getErrorMessage(err)));
  }
}

function* handleLogin(action: PayloadAction<LoginRequest>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      loginApi,
      action.payload
    );

    // centralize header + storage
    const token = response.data.token;
    setAuthHeader(token);

    // update state using loginSuccess
    yield put(loginSuccess(response.data));
  } catch (err: any) {
    yield put(loginFailure(getErrorMessage(err)));
  }
}

export default function* authSaga() {
  yield takeLatest(registerRequest, handleRegister);
  yield takeLatest(loginRequest, handleLogin);
}
