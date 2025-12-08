import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getBlog}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch blogs:",
      error.response?.data || error.message
    );
  }
};

export const addBlog = async (blogData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addedBlog, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add blog:", error.response?.data || error.message);
  }
};

export const editBlog = async (id, blogData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.put(`${ApiRoutes.editBlog}/${id}`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("blog updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to edit blog:",
      error.response?.data || error.message
    );
  }
};

export const deleteBlogs = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.delete(`${ApiRoutes.deleteBlog}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("blog deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete blogs:",
      error.response?.data || error.message
    );
    throw error;
  }
};
