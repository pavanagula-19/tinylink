// src/types/links-types.ts
export interface LinkItem {
  code: string;
  targetUrl: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
}

export interface FetchLinksQuery {
  code?: string;
  minClicks?: number;
  maxClicks?: number;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface FetchLinksResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  links: LinkItem[];
}

export interface CreateLinkRequest {
  targetUrl: string;
  code?: string;
}

export interface CreateLinkResponse {
  code: string;
  shortUrl: string;
  targetUrl: string;
}

export interface DeleteLinkRequest {
  code: string;
}

export interface UpdateLinkRequest {
  code: string; // existing code to identify resource
  targetUrl: string;
  newCode?: string; // optional new code
}

export interface GetLinkResponse extends LinkItem {}
