import type {
  CreateLinkRequest,
  CreateLinkResponse,
  FetchLinksResponse,
  LinkItem,
  UpdateLinkRequest,
} from "@/types/links-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LinkState {
  loading: boolean;
  error: string | null;
  links: LinkItem[];

  page: number;
  limit: number;
  total: number;
  pages: number;
}

const initialState: LinkState = {
  loading: false,
  error: null,
  links: [],

  page: 1,
  limit: 10,
  total: 0,
  pages: 1,
};

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    fetchLinksRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    fetchLinksSuccess: (state, action: PayloadAction<FetchLinksResponse>) => {
      state.loading = false;
      state.links = action.payload.links;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
    },
    fetchLinksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createLinkRequest: (state, _action: PayloadAction<CreateLinkRequest>) => {
      state.loading = true;
      state.error = null;
    },
    createLinkSuccess: (
      state,
      _action: PayloadAction<CreateLinkResponse | null | undefined>
    ) => {
      state.loading = false;
    },
    createLinkFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateLinkRequest: (state, _action: PayloadAction<UpdateLinkRequest>) => {
      state.loading = true;
      state.error = null;
    },
    updateLinkSuccess: (state, action: PayloadAction<LinkItem>) => {
      state.loading = false;
      state.links = state.links.map((l) =>
        l.code === action.payload.code ? action.payload : l
      );
    },
    updateLinkFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteLinkRequest: (state, _action: PayloadAction<{ code: string }>) => {
      state.loading = true;
      state.error = null;
    },
    deleteLinkSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.links = state.links.filter((l) => l.code !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },
    deleteLinkFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getLinkByCodeRequest: (state, _action: PayloadAction<{ code: string }>) => {
      state.loading = true;
      state.error = null;
    },
    getLinkByCodeSuccess: (state, action: PayloadAction<LinkItem>) => {
      state.loading = false;

      const exists = state.links.find((l) => l.code === action.payload.code);
      if (!exists) {
        state.links.push(action.payload);
      } else {
        state.links = state.links.map((l) =>
          l.code === action.payload.code ? action.payload : l
        );
      }
    },
    getLinkByCodeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetLinksState: () => initialState,
  },
});

export const {
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

  resetLinksState,
} = linkSlice.actions;

export default linkSlice.reducer;
