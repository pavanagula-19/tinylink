// src/store/root-saga.ts
import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./auth-saga";

export default function* rootSaga() {
  yield all([watchAuthSaga()]);
}
