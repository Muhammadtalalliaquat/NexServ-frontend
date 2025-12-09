"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOneBlogs, removeBlog } from "../../../store/features/blogSlice";
import NextServLoader from "../../../components/nexservloader";
import Navbar from "../../../components/navbar";
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetailPage() {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id;

  const { title, content, image, tags, createdAt, updatedAt } = blogData;

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setLoading(true);
      // console.log("user data: ", storedUser);

      try {
        const blogRes = await dispatch(getOneBlogs(blogId)).unwrap();
        setBlogData(blogRes.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, blogId]);

  const handleDeleteBlog = async () => {
    if (!blogId) {
      console.error("Blog ID is missing!");
      return;
    }

    console.log(blogId, "id here");

    try {
      const result = await dispatch(removeBlog(blogId));
      console.log("Blog deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting Blog:", error);
    } finally {
      setLoading(false);
      router.push("/nexserv");
    }
  };

  if (loading) return <NextServLoader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white overflow-hidden">
          <div className="w-full overflow-hidden">
            {image && (
              <Image
                src={image}
                alt={title || "Blog image"}
                width={800}
                height={800}
                className="object-cover w-full h-90 rounded-lg transition-all duration-300"
                priority
              />
            )}
          </div>

          <div className="p-6 md:p-10">
            <div className="flex items-center flex-wrap justify-between mb-6">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {title}
              </h1>

              <p className="text-gray-500 text-xs md:text-sm">
                Published on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center flex-wrap justify-between gap-2 mb-5">
              <div className="flex items-center flex-wrap gap-2">
                {tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="relative">
                {user?.isAdmin && (
                  <>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                    >
                      <EllipsisVerticalIcon className="w-5 h-5 text-gray-700" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute sm:right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden animate-[fadeIn_0.2s_ease-in-out]">
                        <Link
                          // href={"*"}
                          href={`/update-service/${blogId}`}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                          Edit
                        </Link>

                        <div className="h-px bg-gray-100"></div>

                        <button
                          onClick={handleDeleteBlog}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
              {content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
