import BlogDetailPage from "../../../components/blogDetailComp";
import { ApiRoutes } from "../../../constant/constant";
import { notFound } from "next/navigation";

async function getBlog(id) {
  const res = await fetch(`${ApiRoutes.getOneBlog}/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  // console.log("initialBlogData:", data?.data);
  return data?.data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: `${blog.title} | Your Company Name`,
    description: blog.description,
  };
}

// 🔹 Main Page
const blogPage = async ({ params }) => {
  const { id } = await params;

  const blog = await getBlog(id);

  if (!blog) return notFound();

  return <BlogDetailPage initialBlogData={blog} />;
};

export default blogPage;
