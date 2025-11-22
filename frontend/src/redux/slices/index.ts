import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import themeReducer from "./theme-slice";
import linkReducer from "./links-slice";

export const rootReducers = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  link: linkReducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;
