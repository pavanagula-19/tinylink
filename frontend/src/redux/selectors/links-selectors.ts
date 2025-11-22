import type { RootState } from "../store";

export const selectLinks = (state: RootState) => state.link.links;
export const selectLinksLoading = (state: RootState) => state.link.loading;
export const selectLinksError = (state: RootState) => state.link.error;
export const selectLinkByCode = (code: string) => (state: RootState) =>
  state.link.links.find((l: any) => l.code === code);
export const selectLinksPage = (state: RootState) => state.link.page;
export const selectLinksLimit = (state: RootState) => state.link.limit;
export const selectLinksTotal = (state: RootState) => state.link.total;
export const selectLinksPages = (state: RootState) => state.link.pages;
