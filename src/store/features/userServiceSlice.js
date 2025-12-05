import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserService,
  getUserService,
  addUserService,
  updateServiceStatus,
} from "../../server/userServiceAction";

export const getUserAllService = createAsyncThunk("userService/fetch", async () => {
    const response = await fetchUserService();
    console.log("API Response:", response);
    return response;
  }
);

export const UserFetchService = createAsyncThunk("userAllService/fetch", async () => {
    const response = await getUserService();
    console.log("API Response:", response);
    return response;
  }
);

export const createUserService = createAsyncThunk("userService/add", async ({ serviceId, planId }) => {
  const response = await addUserService(serviceId, planId);
  console.log("API Response: user book service successfully:", response);
  return response;
});

export const updateService = createAsyncThunk("userService/edit", async ({ serviceItemId, status }) => {
    const response = await updateServiceStatus(serviceItemId, status);
    console.log("API Response: service status updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);

const userServiceSlice = createSlice({
  name: "userService",
  initialState: { userService: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAllService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAllService.fulfilled, (state, action) => {
        state.status = "success";
        state.userService = action.payload;
      })
      .addCase(getUserAllService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(UserFetchService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserFetchService.fulfilled, (state, action) => {
        state.status = "success";
        state.userService = action.payload;
      })
      .addCase(UserFetchService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createUserService.fulfilled, (state, action) => {
        if (Array.isArray(state.userService)) {
          state.userService.push(action.payload);
        } else {
          state.userService = [action.payload];
        }
      });
  },
});

export default userServiceSlice.reducer;
