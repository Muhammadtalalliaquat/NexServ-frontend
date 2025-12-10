import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  fetchOneBlogs,
  addBlog,
  editBlog,
  deleteBlogs,
} from "../../server/blogAction";

export const getAllBlogs = createAsyncThunk("blogs/fetch", async () => {
  const response = await fetchBlogs();
  console.log("API Response:", response);
  return response;
});

export const getOneBlogs = createAsyncThunk("blogs/fetchOne", async (id) => {
  const response = await fetchOneBlogs(id);
  console.log("API Response:", response);
  return response;
});

export const createBlog = createAsyncThunk("blogs/add", async (blogData) => {
  const response = await addBlog(blogData);
  console.log("API Response: blog added:", response);
  return response;
});

export const updateBlog = createAsyncThunk("blogs/edit", async ({ id, BlogData }) => {
  const response = await editBlog(id, BlogData);
  console.log("API Response: blog updated successfully:", response);
  if (!response) {
    throw new Error("No response from API");
  }
  return response;
});

export const removeBlog = createAsyncThunk("blogs/delete", async (id) => {
  const response = await deleteBlogs(id);
  console.log("API Response: blog deleted:", response);

  if (!response) {
    throw new Error("No response from API");
  }
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getOneBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload;
      })
      .addCase(getOneBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        if (Array.isArray(state.blogs)) {
          state.blogs.push(action.payload);
        } else {
          state.blogs = [action.payload];
        }
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        if (Array.isArray(state.blogs)) {
          state.blogs = state.blogs.filter(
            (blog) => blog._id !== action.payload
          );
        }
      });
  },
});

export default blogSlice.reducer;
