// app/blog/page.js
import BlogsClient from "../../components/BlogsClient";
import { ApiRoutes } from "@/constant/constant";

const BlogPageServer = async () => {
  try {
    const res = await fetch(ApiRoutes.getAllBlog, {
      cache: "no-store",
    });

    const response = await res.json();
    const blogs = response?.data || [];
    console.log("API Response:", response);

    return <BlogsClient initialData={blogs} />;
  } catch (error) {
    console.log(
      "Failed to fetch blogs:",
      error.response?.data || error.message,
    );
  }
};

export default BlogPageServer;
