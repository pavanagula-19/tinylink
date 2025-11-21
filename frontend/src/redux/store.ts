// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import themeReducer from "./slices/theme-slice";
import authReducer from "@/redux/slices/auth-slice";
import { setAuthToken } from "@/lib/api";
import rootSaga from "./sagas/root-saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(sagaMiddleware, ...(import.meta.env.DEV ? [logger] : [])),
  devTools: import.meta.env.DEV,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const state = store.getState() as ReturnType<typeof rootReducer>;
if (state.auth && state.auth.token) {
  setAuthToken(state.auth.token);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
