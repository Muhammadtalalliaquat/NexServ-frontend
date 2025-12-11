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
