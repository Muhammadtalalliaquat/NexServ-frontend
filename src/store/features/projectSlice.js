import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRoutes } from "../../constant/constant";
import axios from "axios";

export const getAllProjects = createAsyncThunk("project/fetch", async () => {
  // dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.get(ApiRoutes.getProject, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      "API Response: user project fetched successfully:",
      response.data,
    );
    // dispatch(setLoading(false));

    return response.data;
  } catch (error) {
    dispatch(setLoading(false));
    const backendMsg = error.response?.data?.msg || "Something went wrong";
    console.log("Failed to add project:", backendMsg || error.message);
    return null;
  }
});

export const createProject = createAsyncThunk(
  "project/add",
  async (projectData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is missing!");
        return;
      }

      const response = await axios.post(ApiRoutes.addProject, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setSuccessMsg(response.data.msg));
      dispatch(setResError(null));
      dispatch(setLoading(false));

      console.log(
        "API Response: user create project successfully added:",
        response.data,
      );
      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      const backendMsg = error.response?.data?.msg || "Something went wrong";
      console.log("Failed to add project:", backendMsg || error.message);

      dispatch(setResError(backendMsg));
      dispatch(setSuccessMsg(null));

      return null;
    }
  },
);

export const updateProjectStatus = createAsyncThunk(
  "project/updateStatus",
  async ({ id, status }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is missing!");
        return;
      }

      const response = await axios.put(
        `${ApiRoutes.updateProjectStatus}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(setSuccessMsg(response.data.msg));
      dispatch(setResError(null));
      dispatch(setLoading(false));

      console.log(
        "API Response: project status update successfully:",
        response.data,
      );
      return response.data;
    } catch (error) {
      dispatch(setLoading(false));
      const backendMsg = error.response?.data?.msg || "Something went wrong";
      console.log(
        "Failed to update project status:",
        backendMsg || error.message,
      );

      dispatch(setResError(backendMsg));
      dispatch(setSuccessMsg(null));

      return null;
    }
  },
);

const projectSlice = createSlice({
  name: "project",
  loading: false,
  successMsg: null,
  resError: null,
  initialState: { project: [], status: "idle", resError: null },
  reducers: {
    setResError: (state, action) => {
      state.resError = action.payload;
    },
    setSuccessMsg: (state, action) => {
      state.successMsg = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        if (Array.isArray(state.project)) {
          state.project.push(action.payload);
        } else {
          state.project = [action.payload];
        }
      })
      // .addCase(updateProjectStatus.fulfilled, (state, action) => {
      //   const { id, status } = action.payload;

      //   state.project = state.project.map((p) =>
      //     p._id === id ? { ...p, status } : p,
      //   );
      // });
  },
});
export const { setSuccessMsg, setLoading, setResError } = projectSlice.actions;
export default projectSlice.reducer;
