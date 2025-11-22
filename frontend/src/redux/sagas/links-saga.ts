// src/redux/sagas/links-saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchLinksApi,
  createLinkApi,
  deleteLinkApi,
  updateLinkApi,
  getLinkByCodeApi,
} from "@/api/links-api";

import {
  fetchLinksRequest,
  fetchLinksSuccess,
  fetchLinksFailure,
  createLinkRequest,
  createLinkSuccess,
  createLinkFailure,
  updateLinkRequest,
  updateLinkSuccess,
  updateLinkFailure,
  deleteLinkRequest,
  deleteLinkSuccess,
  deleteLinkFailure,
  getLinkByCodeRequest,
  getLinkByCodeSuccess,
  getLinkByCodeFailure,
} from "../slices/links-slice";
import type { SagaIterator } from "redux-saga";

function getErrorMessage(err: any) {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong"
  );
}

function* handleFetchLinks(
  action: ReturnType<typeof fetchLinksRequest>
): SagaIterator {
  try {
    const response = yield call(fetchLinksApi, action.payload);
    yield put(fetchLinksSuccess(response.data));
  } catch (err: any) {
    yield put(fetchLinksFailure(getErrorMessage(err)));
  }
}

function* handleCreateLink(
  action: ReturnType<typeof createLinkRequest>
): SagaIterator {
  try {
    const response = yield call(createLinkApi, action.payload);
    yield put(createLinkSuccess(response.data));
    yield put(fetchLinksRequest({ page: 1, limit: 10 }));
  } catch (err: any) {
    yield put(createLinkFailure(getErrorMessage(err)));
  }
}

function* handleUpdateLink(
  action: ReturnType<typeof updateLinkRequest>
): SagaIterator {
  try {
    const { code, targetUrl, newCode } = action.payload;
    const response = yield call(updateLinkApi, code, { targetUrl, newCode });
    const updatedLink = response.data?.link ?? null;
    if (updatedLink) {
      yield put(updateLinkSuccess(updatedLink));
    } else {
      yield put(fetchLinksRequest({ page: 1, limit: 10 }));
      yield put(updateLinkSuccess(response.data));
    }
  } catch (err: any) {
    yield put(updateLinkFailure(getErrorMessage(err)));
  }
}

function* handleDeleteLink(action: ReturnType<typeof deleteLinkRequest>) {
  try {
    const code = action.payload.code;
    yield call(deleteLinkApi, code);
    yield put(deleteLinkSuccess(code));
  } catch (err: any) {
    yield put(deleteLinkFailure(getErrorMessage(err)));
  }
}

function* handleGetLinkByCode(
  action: ReturnType<typeof getLinkByCodeRequest>
): SagaIterator {
  try {
    const response = yield call(getLinkByCodeApi, action.payload.code);

    yield put(getLinkByCodeSuccess(response.data));
  } catch (err: any) {
    yield put(getLinkByCodeFailure(getErrorMessage(err)));
  }
}

export default function* linksSaga() {
  yield takeLatest(fetchLinksRequest, handleFetchLinks);
  yield takeLatest(createLinkRequest, handleCreateLink);
  yield takeLatest(updateLinkRequest, handleUpdateLink);
  yield takeLatest(deleteLinkRequest, handleDeleteLink);
  yield takeLatest(getLinkByCodeRequest, handleGetLinkByCode);
}
