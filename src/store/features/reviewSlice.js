import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReview } from "../../server/reviewAction";
import { ApiRoutes } from "../../constant/constant";
import axios from "axios";

export const getAllReview = createAsyncThunk("reviews/fetch", async () => {
  const response = await fetchReview();
  console.log("API Response:", response);
  return response;
});

export const createReview = createAsyncThunk("reviews/add", async (reviewData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const token = localStorage.getItem("token");

      const response = await axios.post(ApiRoutes.addReview, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setSuccessMsg(response.data.msg));

      dispatch(setLoading(false));

      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  loading: false,
  successMsg: null,
  error: null,
  initialState: { reviews: [], status: "idle", error: null },
  reducers: {
    setSuccessMsg: (state, action) => {
      state.successMsg = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllReview.fulfilled, (state, action) => {
        state.status = "success";
        state.reviews = action.payload;
      })
      .addCase(getAllReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setSuccessMsg, setLoading } = reviewSlice.actions;
export default reviewSlice.reducer;
