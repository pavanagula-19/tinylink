// src/api/links-api.ts
import { apiClient } from "@/lib/api";
import type {
  FetchLinksQuery,
  FetchLinksResponse,
  CreateLinkRequest,
  CreateLinkResponse,
  GetLinkResponse,
} from "@/types/links-types";

export const fetchLinksApi = (params: FetchLinksQuery) =>
  apiClient.get<FetchLinksResponse>("/api/links", { params });

export const createLinkApi = (payload: CreateLinkRequest) =>
  apiClient.post<CreateLinkResponse>("/api/links", payload);

export const deleteLinkApi = (code: string) =>
  apiClient.delete(`/api/links/${encodeURIComponent(code)}`);

export const updateLinkApi = (
  code: string,
  data: { targetUrl?: string; newCode?: string }
) => apiClient.put(`/api/links/${code}`, data);

export const getLinkByCodeApi = (code: string) =>
  apiClient.get<GetLinkResponse>(`/api/links/${encodeURIComponent(code)}`);
