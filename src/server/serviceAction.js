import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchService = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getService}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch services:",
      error.response?.data || error.message
    );
  }
};


export const addService = async (serviceData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addedService, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("API Response: Product added:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add service:",
      error.response?.data || error.message
    );
  }
};

export const editService = async (id, serviceData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.put(
      `${ApiRoutes.editService}/${id}`,
      serviceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Service updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to edit service:",
      error.response?.data || error.message
    );
  }
};

export const deleteService = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.delete(`${ApiRoutes.deleteService}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Service deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete Service:",
      error.response?.data || error.message
    );
    throw error;
  }
};
