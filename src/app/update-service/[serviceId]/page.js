"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateService } from "../../../store/features/serviceSlice";
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
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState("");
  const params = useParams();
  const serviceId = params?.serviceId;
  // const [activeTab, setActiveTab] = useState("product");
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

    if (!serviceId) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("pricingPlans", JSON.stringify(pricingPlans));

    dispatch(updateService({ id: serviceId, serviceData: formData }))
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

  useEffect(() => {
    if (SuccessMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, SuccessMsg]);

  return (
    <>
      <Navbar />
      <form
        onSubmit={editService}
        className="max-w-xl mx-auto mt-32 bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Update Service
        </h2>

        {/* Title */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md:hover transition peer
      ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter service title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-2 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md:hover transition peer
      ${errors.category ? "border-red-500" : "border-gray-300"}`}
            // placeholder="Web Development, Cyber Security..."
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 border border-gray-300 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md:hover transition peer
      ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Write service description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Service Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className={`w-full rounded-lg border cursor-pointer 
      file:bg-pink-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none
      hover:file:bg-pink-700 transition
      ${errors.image ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Success/Error Toast */}
        {SuccessMsg && (
          <div
            className={`text-center 
      transition-all duration-500
      ${
        SuccessMsg.toLowerCase().includes("success") ||
        SuccessMsg.toLowerCase().includes("created")
          ? "text-pink-600"
          : "bg-red-500"
      }`}
          >
            {SuccessMsg}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400
    text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2
    transition shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <div className="animate-spin h-6 w-6 border-t-2 border-white rounded-full"></div>
          ) : (
            "Update Service"
          )}
        </button>
      </form>
    </>
  );
}

export default withAdminCheck(UpdateService);
