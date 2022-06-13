import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";

const initialState = {
  filters: [],
  filterLoadingStatus: "dim",
  activeFilter: "All",
};

export const fecthFilters = createAsyncThunk(
  "filter/fetchFilters",
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    activeFilterChanged: (state, { payload }) => {
      state.activeFilter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthFilters.pending, (state) => {
        state.filterLoadingStatus = "loading";
      })
      .addCase(fecthFilters.fulfilled, (state, { payload }) => {
        state.filters = payload;
        state.filterLoadingStatus = "dim";
      })
      .addCase(fecthFilters.rejected, (state) => {
        state.filterLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = filterSlice;

export default reducer;
export const {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
  activeFilterChanged,
} = actions;
