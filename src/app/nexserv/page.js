"use client";

import { getAllService } from "../../store/features/serviceSlice";
import { getAllBlogs } from "../../store/features/blogSlice";
import { getAllReview } from "../../store/features/reviewSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import HereSection from "../../components/heresection";
import ConatctComp from "../../components/contact";
import Navbar from "../../components/navbar";
import NextServLoader from "../../components/nexservloader";
import Image from "next/image";
import Link from "next/link";

export default function HomeRoute() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [serviceData, setServiceData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  // const itemsPerSlide = 2;
  const totalSlides = Math.ceil(reviewData.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalSlides - 1));
  };

  // const start = currentIndex * itemsPerSlide;
  // const visibleReviews = reviewData.slice(start, start + itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
      // setUser(storedUser);
      setLoading(true);

      try {
        const [heroRes, blogRes, reviewRes] = await Promise.all([
          dispatch(getAllService()).unwrap(),
          dispatch(getAllBlogs()).unwrap(),
          dispatch(getAllReview()).unwrap(),
        ]);

        setServiceData(heroRes.data);
        setBlogData(blogRes.data);
        setReviewData(reviewRes.data);
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
      <HereSection reviewData={reviewData} />

      <section className="py-36 sm:py-6 px-6">
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

      <div className="bg-gradient-to-t from-gray-300 via-gray-200 to-white py-0 sm:py-19 px-4 md:px-10 w-full">
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
                width={1500}
                height={1500}
                className="w-full h-[480px] lg:h-[520px] object-cover group-hover:scale-105 transition duration-500"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

              <span className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-xs text-white shadow-md">
                {blogData[0]?.tags?.[0] || "Blog"}
              </span>

              <div
                className="absolute bottom-4 left-4 right-4 text-white 
                bg-gradient-to-t from-transparent to-gray-500/60 
                p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold">{blogData[0]?.title}</h3>

                <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                  {blogData[0]?.content}
                </p>

                <Link
                  href={`/blog-page/${blogData[0]._id}`}
                  // href={`/blog-detail/${blogData[0]._id}`}
                  className="bg-pink-600 px-3 py-2 rounded-md text-xs
                     hover:bg-pink-700 transition cursor-pointer"
                >
                  Read More
                </Link>
              </div>
            </div>

            {blogData.slice(1, 3).map((blog, i) => (
              <div
                key={i}
                className="relative rounded-md overflow-hidden shadow-lg group"
              >
                <Image
                  src={blog.image || "https://via.placeholder.com/600x400"}
                  alt={blog.title}
                  width={600}
                  height={600}
                  className="w-full h-62 object-cover group-hover:scale-105 transition duration-500"
                  priority
                />

                {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div> */}

                <span className="absolute top-4 right-4 bg-blue-600 px-2 py-1 rounded-full text-xs text-white shadow-md">
                  {blog.tags?.[1] || "Blog"}
                </span>

                <div
                  className="absolute bottom-4 left-4 right-4 text-white 
                bg-gradient-to-t from-transparent to-gray-500/60 
                p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold">{blog.title}</h3>

                  <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                    {blog.content}
                  </p>

                  <Link
                    href={`/blog-page/${blog._id}`}
                    className="mt-3 bg-pink-600 px-3 py-2 rounded-md text-xs
                     hover:bg-pink-700 transition cursor-pointer"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full py-12 px-4 md:px-10 bg-gradient-to-t from-white to-gray-300">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            What Our<span className="text-pink-600"> Clients Say </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Our users love our services. Here&apos;s what they say:
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviewData.map((review) => (
              <div
                key={review._id}
                className={`flex-shrink-0 w-full ${
                  itemsPerSlide === 2 ? "sm:w-1/2" : "sm:w-full"
                } p-3`}
              >
                <div className="bg-white shadow-md rounded-xl p-6 border border-pink-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.author?.userName || "Unknown User"}
                    </h3>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xl">
                          ★
                        </span>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <span key={i} className="text-gray-300 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={prevSlide}
                className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 shadow hover:bg-pink-600 hover:text-white transition"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow border border-gray-200 hover:bg-pink-600 hover:text-white transition"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConatctComp />
    </>
  );
}
