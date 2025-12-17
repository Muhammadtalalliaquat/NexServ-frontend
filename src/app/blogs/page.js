"use client";

import { useEffect, useState } from "react";
import { getAllBlogs } from "../../store/features/blogSlice";
import Navbar from "../../components/navbar";
import { useDispatch } from "react-redux";
import NextServLoader from "../../components/nexservloader";
import Footer from "../../components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  const dispatch = useDispatch();
  const [blogsData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllBlogs())
      .then((result) => {
        setBlogData(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-23">
        <div className="relative mb-14">
          {/* Accent line */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-pink-500" />

          <h1 className="pl-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Latest Blogs
          </h1>

          <p className="mt-2 pl-6 text-sm sm:text-base text-gray-500 max-w-xl">
            Insights, updates, and expert articles from our team
          </p>
        </div>

        {loading ? (
          <NextServLoader />
        ) : (
          <div className="space-y-8">
            {blogsData.blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-l-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Image */}
                <div className="w-full md:w-1/3 h-56 md:h-auto">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-6 md:w-2/3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {blog.content}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/blog-page/${blog._id}`}
                      className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
