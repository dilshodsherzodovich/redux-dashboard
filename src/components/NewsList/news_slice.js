import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";

const initialState = {
  news: [],
  newsLoadingStatus: "dim",
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/news");
});

export const deleteNews = createAsyncThunk("news/deleteNews", async (id) => {
  const { request } = useHttp();
  return await request(`http://localhost:3001/news/${id}`, "DELETE");
});

const newSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsCreated: ({ news }, { payload }) => {
      news = news.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoadingStatus = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.newsLoadingStatus = "dim";
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addCase(deleteNews.fulfilled, (state, { meta }) => {
        state.news = state.news.filter((s) => s.id !== meta.arg);
      })
      .addDefaultCase(() => {});
  },
});

const { reducer, actions } = newSlice;

export default reducer;
export const {
  newsCreated,
  newsDeleted,
  newsFetched,
  newsFetching,
  newsFetchingError,
} = actions;
