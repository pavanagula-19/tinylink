// src/lib/short-url.ts
export function getShortUrl(code: string) {
  const base = import.meta.env.VITE_SHORT_BASE_URL;
  return `${base?.replace(/\/$/, "")}/${code}`;
}
