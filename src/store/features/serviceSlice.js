import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchService,
  addService,
  editService,
  deleteService,
} from "../../server/serviceAction";


export const getAllService = createAsyncThunk("services/fetch", async () => {
  const response = await fetchService();
  console.log("API Response:", response);
  return response;
});


export const createService = createAsyncThunk("services/add", async (serviceData) => {
  const response = await addService(serviceData);
  console.log("API Response: Service added:", response);
  return response;
});

export const updateService = createAsyncThunk("services/edit", async ({ id, serviceData }) => {
    const response = await editService(id, serviceData);
    console.log("API Response: Service updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);

export const removeService = createAsyncThunk("services/delete", async (id) => {
  const response = await deleteService(id);
  console.log("API Response: service deleted:", response);

  if (!response) {
    throw new Error("No response from API");
  }
  return id;
});

const serviceSlice = createSlice({
  name: "services",
  initialState: { services: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllService.fulfilled, (state, action) => {
        state.status = "success";
        state.services = action.payload;
      })
      .addCase(getAllService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        if (Array.isArray(state.services)) {
          state.services.push(action.payload);
        } else {
          state.services = [action.payload];
        }
      })
      .addCase(removeService.fulfilled, (state, action) => {
        if (Array.isArray(state.services)) {
          state.services = state.services.filter(
            (service) => service._id !== action.payload
          );
        }
      });
  },
});

export default serviceSlice.reducer;
