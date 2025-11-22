// src/api/auth-api.ts
import { apiClient } from "@/lib/api";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "@/types/auth-types";

const API_BASE = "/api/auth";

export const registerApi = (payload: RegisterRequest) =>
  apiClient.post(`${API_BASE}/register`, payload);

export const loginApi = (payload: LoginRequest) =>
  apiClient.post<LoginResponse>(`${API_BASE}/login`, payload);
