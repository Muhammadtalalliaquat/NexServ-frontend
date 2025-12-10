import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReview, addReview } from "../../server/reviewAction";

export const getAllReview = createAsyncThunk("reviews/fetch", async () => {
  const response = await fetchReview();
  console.log("API Response:", response);
  return response;
});

export const createReview = createAsyncThunk("reviews/add", async (productData) => {
  const response = await addReview(productData);
  console.log("API Response: user review added:", response);
  return response;
});

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], status: "idle", error: null },
  reducers: {},
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
      })
      .addCase(createReview.fulfilled, (state, action) => {
        if (Array.isArray(state.reviews)) {
          state.reviews.push(action.payload);
        } else {
          state.reviews = [action.payload];
        }
      });
    //   .addCase(removeProduct.fulfilled, (state, action) => {
    //     // state.products = state.products.filter((product) => product._id !== action.payload);
    //     if (Array.isArray(state.contact)) {
    //       state.contact = state.contact.filter(
    //         (contact) => contact._id !== action.payload
    //       );
    //     }
    //   });
  },
});

export default reviewSlice.reducer;
