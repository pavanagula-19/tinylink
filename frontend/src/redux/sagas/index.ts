import { all } from "redux-saga/effects";
import authSaga from "./auth-saga";
import linkSaga from "./links-saga";

export default function* rootSaga() {
  yield all([authSaga(), linkSaga()]);
}
