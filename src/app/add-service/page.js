"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createService } from "../../store/features/serviceSlice";
import withAdminCheck from "../../HOC/withAuth";
import Navbar from "../../components/navbar";
// import { useRouter } from "next/navigation";

function AddService() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState("");
  // const [activeTab, setActiveTab] = useState("product");
  // const router = useRouter();

  const pricingPlans = {
    basic: {
      price: 150,
      planId: "network_basic",
      features: [
        "Basic network health check",
        "Router & switch configuration (basic)",
        "Firewall rules review",
        "LAN/WiFi performance check",
        "1 troubleshooting session",
        "Email support",
      ],
    },

    standard: {
      price: 250,
      planId: "network_standard",
      features: [
        "Full network audit & documentation",
        "VLAN setup & optimization",
        "Advanced router + firewall configuration",
        "Bandwidth monitoring setup",
        "Security hardening recommendations",
        "2 troubleshooting sessions",
        "Email + chat support",
      ],
    },

    premium: {
      price: 400,
      planId: "network_premium",
      features: [
        "Enterprise-grade network assessment",
        "Firewall advanced security policies (IDS/IPS)",
        "VPN setup (Site-to-Site / Remote Access)",
        "Network segmentation + VLAN architecture",
        "High-availability (failover) configuration",
        "24/7 priority troubleshooting",
        "Monthly performance reports",
        "Dedicated support manager",
      ],
    },
  };


  const ServiceProduct = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("pricingPlans", JSON.stringify(pricingPlans));

    dispatch(createService(formData))
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

        // SUCCESS CASE
        setSuccessMsg(msg || "Service added successfully!");
        setTitle("");
        setCategory("");
        setImage("");
        setDescription("");
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
      <form
        onSubmit={ServiceProduct}
        className="max-w-xl mx-auto mt-32 bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add New Service
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
            "Add Service"
          )}
        </button>
      </form>
    </>
  );
}

export default withAdminCheck(AddService);
