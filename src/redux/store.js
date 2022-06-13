import { configureStore } from "@reduxjs/toolkit";
import filter from "../components/NewsFilter/filter_slice";
import news from "../components/NewsList/news_slice";
import stringMiddleWare from "../middleWare/stringMiddleWare";

export const store = configureStore({
  reducer: { filter, news },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleWare),
  devTools: process.env.NODE_ENV !== "production",
});
