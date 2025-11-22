import type { RootState } from "../store";

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectToken = (state: RootState) => state.auth.token;
export const selectFullName = (state: RootState) => state.auth.fullName;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token);
