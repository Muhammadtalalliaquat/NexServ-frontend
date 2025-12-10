"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateService } from "../../../store/features/serviceSlice";
import { updateBlog } from "../../../store/features/blogSlice";
import { useParams } from "next/navigation";
import withAdminCheck from "../../../HOC/withAuth";
import Navbar from "../../../components/navbar";

function UpdateService() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [blogTitle, setBlogTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const [SuccessMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("product");
  const [errors, setErrors] = useState("");
  const params = useParams();
  const id = params?.serviceId;
  // const router = useRouter();

  const pricingPlans = {
    basic: {
      price: 100,
      planId: "plan_basic",
      features: [
        "Social media account setup (Facebook, Instagram)",
        "1 platform campaign management",
        "Basic SEO recommendations",
        "Monthly performance report",
        "1 revision/adjustment per month",
      ],
    },
    standard: {
      price: 200,
      planId: "plan_standard",
      features: [
        "Up to 3 social media platforms",
        "Content creation for posts (images & captions)",
        "SEO optimization for website",
        "Monthly performance analytics report",
        "Email marketing campaign setup",
        "3 revisions/adjustments per month",
      ],
    },
    premium: {
      price: 300,
      planId: "plan_premium",
      features: [
        "Up to 5 social media platforms",
        "Custom content creation & scheduling",
        "Advanced SEO optimization",
        "Google Ads / Paid campaigns setup",
        "Email marketing automation",
        "Blog creation & management",
        "Unlimited revisions/adjustments within 1 month",
        "Detailed weekly performance report",
        "Competitor analysis & strategy",
      ],
    },
  };

  const editService = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMsg("");

    if (!id) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("pricingPlans", JSON.stringify(pricingPlans));

    dispatch(updateService({ id: id, serviceData: formData }))
      .then((result) => {
        const { error, msg } = result.payload || {};

        if (error) {
          if (Array.isArray(msg)) {
            const fieldErrors = {};
            msg.forEach((m) => {
              const lower = m.toLowerCase();
              if (lower.includes("title")) fieldErrors.title = m;
              else if (lower.includes("description"))
                fieldErrors.description = m;
              else if (lower.includes("image")) fieldErrors.image = m;
              else if (lower.includes("category")) fieldErrors.category = m;
            });
            setErrors(fieldErrors);
          } else {
            setErrors({ general: msg || "Something went wrong" });
          }
          setIsSubmitting(false);
          return;
        }

        setSuccessMsg(msg || "Service updated successfully!");
        setTitle("");
        setCategory("");
        setImage("");
        setDescription("");
        setErrors({});
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting service:", error);
        setIsSubmitting(false);
      });
  };

  const updateBlogSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("content", content);
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    const newErrors = {};
    if (!blogTitle) newErrors.blogTitle = "Blog title is required";
    if (!content) newErrors.content = "Content is required";
    if (!tags) newErrors.tags = "Tags are required";
    if (!image) newErrors.image = "Blog image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    dispatch(updateBlog({ id: id, BlogData: formData }))
      .then((result) => {
        const { msg } = result.payload || {};
        setSuccessMsg(msg || "Blog update successfully!");
        setBlogTitle("");
        setContent("");
        setTags("");
        setImage(null);
        setErrors({});
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setErrors({ general: "Something went wrong!" });
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (SuccessMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, SuccessMsg]);

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center p-6 mt-30">
        <div className="w-full mx-auto bg-white rounded-md shadow-lg overflow-hidden sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-4xl">
          {/* Tabs */}
          <div className="flex bg-gray-100 border-b relative z-0">
            <button
              onClick={() => setActiveTab("service")}
              className={`flex-1 py-4 font-semibold transition duration-300 text-center ease-in-out transform relative ${
                activeTab === "service"
                  ? "border-b-4 border-pink-600 text-pink-600 bg-white scale-105 shadow-lg z-10"
                  : "text-gray-500 hover:text-pink-500 hover:scale-105 hover:bg-pink-50 z-0"
              }`}
            >
              Update New Service
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex-1 py-4 font-semibold transition duration-300 text-center ease-in-out transform relative ${
                activeTab === "blog"
                  ? "border-b-4 border-blue-600 text-blue-600 bg-white scale-105 shadow-lg z-10"
                  : "text-gray-500 hover:text-blue-500 hover:scale-105 hover:bg-blue-50 z-0"
              }`}
            >
              Update New Blog
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "service" ? (
              <form onSubmit={editService} className="space-y-6">
                {[
                  {
                    label: "Service Title",
                    value: title,
                    setter: setTitle,
                    name: "title",
                  },
                  {
                    label: "Category",
                    value: category,
                    setter: setCategory,
                    name: "category",
                  },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className={`w-full px-4 py-3 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md:hover transition peer ${
                        errors[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-pink-500 peer-focus:text-sm bg-white px-1">
                      {field.label}
                    </label>
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md:hover transition peer ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <label className="absolute left-3 top-5 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-pink-500 peer-focus:text-sm bg-white px-1">
                    Description
                  </label>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="bg-gray-100 border border-dashed border-gray-400 rounded-lg p-1 flex justify-center items-center cursor-pointer hover:border-pink-500 transition">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={`w-full cursor-pointer 
      file:bg-pink-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none
      hover:file:bg-pink-700 transition
      `}
                  />
                </div>

                {SuccessMsg && (
                  <div
                    className={`text-center transition-all duration-500 ${
                      SuccessMsg.toLowerCase().includes("success")
                        ? "text-pink-600"
                        : "bg-red-500"
                    }`}
                  >
                    {SuccessMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="animate-spin h-6 w-6 border-t-2 border-white rounded-full"></div>
                  ) : (
                    "Update Service"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={updateBlogSubmit} className="space-y-6">
                {[
                  {
                    label: "Blog Title",
                    value: blogTitle,
                    setter: setBlogTitle,
                    name: "blogTitle",
                  },

                  { label: "Tags", value: tags, setter: setTags, name: "tags" },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className={`w-full px-4 py-3 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md:hover transition peer ${
                        errors[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-sm bg-white px-1">
                      {field.label}
                    </label>
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md:hover transition peer ${
                      errors.content ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <label className="absolute left-3 top-5 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-sm bg-white px-1">
                    Content
                  </label>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="bg-gray-100 border border-dashed border-gray-400 rounded-lg p-1 flex justify-center items-center cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={`w-full cursor-pointer 
      file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none
      hover:file:bg-blue-600 transition
      `}
                  />
                </div>

                {SuccessMsg && (
                  <div
                    className={`text-center transition-all duration-500 ${
                      SuccessMsg.toLowerCase().includes("success")
                        ? "text-blue-600"
                        : "bg-red-500"
                    }`}
                  >
                    {SuccessMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition shadow-md hover:shadow-lg"
                  // className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  {isSubmitting ? (
                    <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                  ) : (
                    "Update Blog"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminCheck(UpdateService);
