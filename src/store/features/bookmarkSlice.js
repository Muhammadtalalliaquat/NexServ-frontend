import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRoutes } from "../../constant/constant";
import axios from "axios";

export const getCheckBookmark = createAsyncThunk("bookmark/check", async ({ blogId }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${ApiRoutes.checkBookmark}/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setResError(null));
      return response.data;
    } catch (error) {
      const backendMsg = error.response?.data?.msg || "Something went wrong";

      dispatch(setResError(backendMsg));
      return null;
    }
  }
);


export const createBookmark = createAsyncThunk("bookmark/add", async ({ blogId }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is missing!");
        return;
      }

      const response = await axios.post(`${ApiRoutes.addBookmark}/${blogId}`, {
        blogId
      }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setSuccessMsg(response.data.msg));
      dispatch(setResError(null));

      console.log("API Response: Bookmark data added:", response.data);
      return response.data;
    } catch (error) {
      const backendMsg = error.response?.data?.msg || "Something went wrong";
      console.log("Failed to add product:", backendMsg || error.message);

      dispatch(setResError(backendMsg));
      dispatch(setSuccessMsg(null));

      return null;
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  successMsg: null,
  resError: null,
  initialState: { bookmark: [], status: "idle", resError: null },
  reducers: {
    setResError: (state, action) => {
      state.resError = action.payload;
    },
    setSuccessMsg: (state, action) => {
      state.successMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckBookmark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCheckBookmark.fulfilled, (state, action) => {
        state.status = "success";
        state.bookmark = action.payload;
      })
      .addCase(getCheckBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        if (Array.isArray(state.bookmark)) {
          state.bookmark.push(action.payload);
        } else {
          state.bookmark = [action.payload];
        }
      });
  },
});

export const { setSuccessMsg, setResError } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
