import axios from "axios";
import { setUser, setError, setSuccess } from "@/store/features/userSlice";
import {
  setUserUpdate,
  setLoading,
  setErrorUpdate,
} from "../store/features/userAcountUpdateSlice";
import { ApiRoutes } from "@/constant/constant";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(ApiRoutes.register, userData);
    const { user, verificationToken } = response.data.data;

    localStorage.setItem("token", verificationToken);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(setUser({ user, verificationToken }));

    console.log("API Response:", user, verificationToken);
    return { success: true, user, verificationToken };
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "Registration failed";
    dispatch(setError(errorMessage));
    console.log("Error during registration:", error.message);
    return { success: false, error: errorMessage };
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  try {
    const response = await axios.post(ApiRoutes.verifyEmail, null, {
      headers: { token },
    });

    if (!response.data || !response.data.data) {
      dispatch(setError("Invalid API response"));
      return;
    }
    const { verifiedEmail = false, isAuthenticated = false } =
      response.data.data;

    if (verifiedEmail) {
      dispatch(setSuccess({ verifiedEmail, isAuthenticated }));
    } else {
      dispatch(setError("Email verification failed."));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Verification failed";
    dispatch(setError(errorMessage));
    console.error("Error during Verification:", errorMessage);
  }
};


export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(ApiRoutes.login, credentials);
    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(setUser({ user, token }));
    console.log("API Response:", user, token);
    return { success: true, user, token };
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "Login failed";
    dispatch(setError(errorMessage));
    console.log("Error during login:", error.response || error.message);
    return { success: false, error: errorMessage };
  }
};

export const accountDetailsUpdate = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(ApiRoutes.accountUpdate, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Correctly extract data
    const { data, msg } = response.data;
    const user = data;
    const token = localStorage.getItem("token");

    console.log("Updated User Data:", user);
    console.log("Message:", msg);
    console.log("response:", response.data);

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(setUserUpdate({ user, token }));
    dispatch(setLoading(false));

    return { success: true, user, token };
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);

    const errorMessage =
      error.response?.data?.msg || "Update failed. Please try again.";
    dispatch(setErrorUpdate(errorMessage));
    dispatch(setLoading(false));

    return { success: false, error: errorMessage };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(ApiRoutes.forgotPassword, { email });
    console.log(response.data?.data?.message);
  } catch (error) {
    console.log(error.rresponse?.data?.message);
  }
};
