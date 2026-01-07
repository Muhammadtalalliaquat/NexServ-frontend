"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOneBlogs, removeBlog } from "../../../store/features/blogSlice";
import {
  createBookmark,
  getCheckBookmark,
  setSuccessMsg,
  setResError,
} from "../../../store/features/bookmarkSlice";
import {
  Calendar,
  Tag,
  MoreVertical,
  Edit2,
  Trash2,
  Share2,
  Bookmark,
} from "lucide-react";
import NextServLoader from "../../../components/nexservloader";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetailPage() {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id;

  const { successMsg, resError } = useSelector((state) => state.bookmark);

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

  useEffect(() => {
    if (!user || !blogId) return;

    dispatch(getCheckBookmark({ blogId }))
      .unwrap()
      .then((res) => {
        console.log("Bookmark check res:", res.data);
        setIsBookmarked(res.data?.bookmarked);
      });
  }, [dispatch, user, blogId]);

  useEffect(() => {
    if (successMsg || resError) {
      const timer = setTimeout(() => {
        dispatch(setSuccessMsg(null));
        dispatch(setResError(null));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMsg, resError, dispatch]);

  // useEffect(() => {
  //   if (!user || !blogData?._id) return;

  //   const bookmarks = JSON.parse(
  //     localStorage.getItem("bookmarkedBlogs") || "[]"
  //   );

  //   const isAlreadyBookmarked = bookmarks.some(
  //     (blog) => blog.blogId === blogData._id && blog.userId === user._id
  //   );

  //   setIsBookmarked(isAlreadyBookmarked);
  // }, [blogData?._id, user, user?._id]);

  // const handleBookmarkToggle = () => {
  //   if (!user) {
  //     setShowMsg("Please login to bookmark blogs");
  //     return;
  //   }

  //   const bookmarks = JSON.parse(
  //     localStorage.getItem("bookmarkedBlogs") || "[]"
  //   );

  //   if (isBookmarked) {
  //     const updatedBookmarks = bookmarks.filter(
  //       (blog) => !(blog.blogId === blogData._id && blog.userId === user._id)
  //     );

  //     localStorage.setItem("bookmarkedBlogs", JSON.stringify(updatedBookmarks));
  //     setIsBookmarked(false);
  //   } else {
  //     const bookmarkData = {
  //       userId: user._id,
  //       blogId: blogData._id,
  //       title: blogData.title,
  //       content: blogData.content.slice(0, 150) + "...",
  //       image: blogData.image,
  //       tags: blogData.tags,
  //       bookmarkedAt: new Date().toISOString(),
  //     };

  //     localStorage.setItem(
  //       "bookmarkedBlogs",
  //       JSON.stringify([...bookmarks, bookmarkData])
  //     );
  //     setIsBookmarked(true);
  //   }
  // };

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

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: "Check this blog",
        text: "Read this tech blog 👇",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  };

  const handleBookmarkToggle = () => {
    if (!user) {
      dispatch(setResError("Please login to bookmark blogs"));
      return;
    }

    dispatch(createBookmark({ blogId }))
      .unwrap()
      .then((res) => {
        setIsBookmarked(res.data?.bookmarked);
      })
      .catch((err) => {
        console.error("Bookmark toggle failed:", err);
      });
  };

  if (loading) return <NextServLoader />;

  return (
    <>
      <Navbar />

      <div className="min-h-screen ">
        <div className="relative z-10 py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden shadow-2xl">
            {image && (
              <div className="relative w-full h-96 overflow-hidden">
                <Image
                  src={image}
                  alt={title || "Blog image"}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {successMsg && (
                  <div className="fixed top-4 right-4 z-50 animate-slide-in">
                    <div className="bg-green-800 text-white px-6 py-4 font-medium text-sm rounded-lg shadow-xl flex items-center gap-3 min-w-[320px]">
                      <svg
                        className="w-6 h-6 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="font-medium flex-1">{successMsg}</p>
                      <button
                        onClick={() => dispatch(setSuccessMsg(null))}
                        className="hover:opacity-80 transition"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {resError && (
                  <div className="fixed top-4 right-4 z-50 animate-slide-in">
                    <div className="bg-gray-500 text-white px-6 py-4 font-medium text-sm rounded-lg shadow-xl flex items-center gap-3 min-w-[320px]">
                      <p className="font-medium flex-1">{resError}</p>
                      <button
                        onClick={() => dispatch(setResError(null))}
                        className="hover:opacity-80 transition"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* CSS - Add to your global CSS or Tailwind config */}
                <style jsx>{`
                  @keyframes slide-in {
                    from {
                      transform: translateX(100%);
                      opacity: 0;
                    }
                    to {
                      transform: translateX(0);
                      opacity: 1;
                    }
                  }

                  .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                  }
                `}</style>

                <div className="absolute top-6 right-6 flex gap-2">
                  <button
                    onClick={handleBookmarkToggle}
                    // onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 ${
                      isBookmarked
                        ? "bg-pink-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isBookmarked ? "fill-white" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 leading-tight">
                    {title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm">5 min read</span>
                  </div>
                </div>

                {user?.isAdmin && (
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-black/20 text-black flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-white/20 rounded-lg shadow-2xl overflow-hidden z-20">
                        <Link
                          href={`/update-service/${blogId}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-3 text-black hover:bg-black/10 transition-all duration-300"
                        >
                          <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Edit2 className="w-4 h-4 text-blue-400" />
                          </span>

                          <span className="font-medium">Edit Blog</span>
                        </Link>

                        <div className="mx-2 border-t border-white/10"></div>

                        <button
                          onClick={handleDeleteBlog}
                          className="flex items-center gap-3 w-full cursor-pointer px-4 py-3 text-black hover:bg-red-500/20 transition-all duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </div>
                          <span className="font-medium">Delete Blog</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-8 flex-wrap">
                <Tag className="w-4 h-4 text-purple-400" />
                {tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-500 text-sm font-medium hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-white/10 mb-8"></div>

              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-4 text-lg whitespace-pre-line">
                  {content}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
