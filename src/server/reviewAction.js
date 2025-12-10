import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchReview = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getReview}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch Reviews:",
      error.response?.data || error.message
    );
  }
};


export const addReview = async (reviewData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addReview, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add review:",
      error.response?.data || error.message
    );
  }
};
