import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContact } from "../../server/contactAction";
import { ApiRoutes } from "../../constant/constant";
import axios from "axios";

export const getAllContact = createAsyncThunk("contact/fetch", async () => {
  const response = await fetchContact();
  console.log("API Response:", response);
  return response;
});

export const createContact = createAsyncThunk(
  "contact/add",
  async (contactData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.post(ApiRoutes.addContact, contactData);

      dispatch(setSuccessMsg(response.data.msg));
      dispatch(setResError(null));

      // console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      const backendMsg = error.response?.data?.msg || "Something went wrong";

      // console.log("Failed to add contact:", backendMsg);

      dispatch(setResError(backendMsg));
      dispatch(setSuccessMsg(null));

      return rejectWithValue(backendMsg);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const updateContactStatus = createAsyncThunk("contact/edit", async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Token is missing");
      }

      const response = await axios.put(
        `${ApiRoutes.UpdateStatus}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Contact status updated:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update contact status",
      );
    }
  },
);

// export const createContact = createAsyncThunk("contact/add", async (contactData, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));

//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("Token is missing!");
//         return;
//       }

//       console.log("Token before sending request:", token);

//       const response = await axios.post(ApiRoutes.addContact, contactData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch(setSuccessMsg(response.data.msg));
//       dispatch(setResError(null));
//       dispatch(setLoading(false));

//       console.log("API Response: contact data added:", response.data);
//       return response.data;
//     } catch (error) {
//       dispatch(setLoading(false));
//       const backendMsg = error.response?.data?.msg || "Something went wrong";
//       console.log("Failed to add product:", backendMsg || error.message);

//       dispatch(setResError(backendMsg));
//       dispatch(setSuccessMsg(null));

//        return null;
//     }
//   }
// );

const ContactSlice = createSlice({
  name: "contact",
  loading: false,
  successMsg: null,
  resError: null,
  initialState: { contact: [], status: "idle", resError: null },
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
      .addCase(getAllContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.status = "success";
        state.contact = action.payload;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        if (Array.isArray(state.contact)) {
          state.contact.push(action.payload);
        } else {
          state.contact = [action.payload];
        }
      })
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact = action.payload.data || action.payload;
        const index = state.contact.data.findIndex(
          (c) => c._id === updatedContact._id,
        );
        if (index !== -1) {
          state.contact[index] = updatedContact;
        } else {
          state.contact.push(updatedContact);
        }
      })

      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
export const { setSuccessMsg, setLoading, setResError } = ContactSlice.actions;
export default ContactSlice.reducer;
