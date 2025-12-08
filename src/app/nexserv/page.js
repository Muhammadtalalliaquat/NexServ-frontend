"use client";

import { getAllService } from "../../store/features/serviceSlice";
import { getAllBlogs } from "../../store/features/blogSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import HereSection from "../../components/heresection";
import Navbar from "../../components/navbar";
import NextServLoader from "../../components/nexservloader";
import Image from "next/image";
import Link from "next/link";

export default function HomeRoute() {
  const [serviceData, setServiceData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
      // setUser(storedUser);
      setLoading(true);

      try {
        const [heroRes, blogRes] = await Promise.all([
          dispatch(getAllService()).unwrap(),
          dispatch(getAllBlogs()).unwrap(),
        ]);

        setServiceData(heroRes.data);
        setBlogData(blogRes.data.blogs);
        console.log("Service is here:", heroRes.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <NextServLoader />;

  return (
    <>
      <Navbar />
      <HereSection />

      <section className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
            Our <span className="text-pink-600">Services</span>
          </h2>

          {serviceData.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceData.map((service, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-6 bg-gray-50 border border-gray-200 hover:border-pink-600 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.png"}
                      alt={service.title}
                      width={700}
                      height={700}
                      className="object-cover w-full h-full rounded-lg transition-all duration-300"
                      priority
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {service.description.length > 100
                      ? service.description.slice(0, 100) + "..."
                      : service.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-gray-400 text-xs">
                      Created:{" "}
                      {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/service-detail/${service._id}`}
                      className="px-3 py-1 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No services available at the moment.
            </p>
          )}
        </div>
      </section>

      <div className="bg-gradient-to-t from-gray-400 via-gray-200 to-white py-19 px-4 md:px-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
            Recently <span className="text-pink-600">Publish Articles</span>
          </h2>

          <button className="text-sm text-gray-700 underline hover:text-black mt-4 md:mt-0">
            Read all blogs
          </button>
        </div>

        {!loading && blogData.length === 0 && (
          <div className="text-center text-gray-500 py-10">No blogs found!</div>
        )}

        {!loading && blogData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="md:col-span-2 md:row-span-2 relative rounded-md overflow-hidden shadow-lg group">
              <Image
                src={
                  blogData[0]?.image || "https://via.placeholder.com/600x400"
                }
                alt={blogData[0]?.title}
                width={900}
                height={600}
                className="w-full h-[480px] lg:h-[520px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

              <span className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-xs text-white shadow-md">
                {blogData[0]?.tags?.[0] || "Blog"}
              </span>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-3xl font-bold">{blogData[0]?.title}</h3>

                <p className="text-gray-300 mt-2 line-clamp-3">
                  {blogData[0]?.content}
                </p>

                <button className="mt-4 bg-pink-600 px-5 py-2 rounded-md text-sm hover:bg-pink-700 transition">
                  Read More
                </button>
              </div>
            </div>

            {blogData.slice(1, 3).map((blog, i) => (
              <div
                key={i}
                className="relative rounded-md overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={blog.image || "https://via.placeholder.com/600x400"}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

                <span className="absolute top-4 right-4 bg-blue-600 px-2 py-1 rounded-full text-xs text-white shadow-md">
                  {blog.tags?.[0] || "Blog"}
                </span>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{blog.title}</h3>

                  <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                    {blog.content}
                  </p>

                  <button className="mt-3 bg-pink-600 px-3 py-2 rounded-md text-xs hover:bg-pink-700 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
