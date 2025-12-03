import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchUserService = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.get(`${ApiRoutes.userGetService}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user service:",
      error.response?.data || error.message
    );
  }
};


export const addUserService = async (serviceId , planId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.post(ApiRoutes.userAddService, { serviceId, planId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response: service added:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to service add:",
      error.response?.data || error.message
    );
  }
};

export const updateServiceStatus = async (serviceItemId, status) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.put(`${ApiRoutes.adminUpdateService}/${serviceItemId}`,status,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Product order status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update order status:",
      error.response?.data || error.message
    );
  }
};
