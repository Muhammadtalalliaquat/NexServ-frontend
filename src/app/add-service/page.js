"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createService } from "../../store/features/serviceSlice";
import { createBlog } from "../../store/features/blogSlice";
import withAdminCheck from "../../HOC/withAuth";
import Navbar from "../../components/navbar";
import { Upload, Plus, FileText, Tag, Image, Sparkles } from "lucide-react";

function AddService() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("product");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [blogTitle, setBlogTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const [SuccessMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState("");

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

  const handleServiceSubmit = (e) => {
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

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("title", blogTitle); // match backend
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

    dispatch(createBlog(formData))
      .then((result) => {
        const { msg } = result.payload || {};
        setSuccessMsg(msg || "Blog added successfully!");
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Create New Content
            </h1>
            <p className="text-gray-400">
              Add services or blog posts to NexServ platform
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl overflow-hidden">
            <div className="flex bg-white/5 border-b border-white/10  gap-2">
              <button
                onClick={() => setActiveTab("service")}
                className={`flex-1 py-4 px-6 font-semibold  transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "service"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50 scale-105"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Plus className="w-5 h-5" />
                Add New Service
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "blog"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <FileText className="w-5 h-5" />
                Add New Blog
              </button>
            </div>

            <div className="p-8">
              {activeTab === "service" ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm"
                      placeholder="Enter service title..."
                    />
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm"
                      placeholder="e.g., Web Development, Design..."
                    />
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm resize-none"
                      placeholder="Describe your service in detail..."
                    />
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <Image href="image" alt="image" className="w-4 h-4" />
                      Service Image
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden"
                        id="service-file"
                        accept="image/*"
                      />
                      <label
                        htmlFor="service-file"
                        className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-white/10 transition-all duration-300"
                      >
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-pink-500 mb-2 transition-colors" />
                        <span className="text-gray-400 group-hover:text-pink-500 text-sm transition-colors">
                          {image
                            ? image.name
                            : "Click to upload or drag and drop"}
                        </span>
                        <span className="text-gray-500 text-xs mt-1">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </div>
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {SuccessMsg && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                      ✓ {SuccessMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleServiceSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Adding Service...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Add Service</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Blog Title
                    </label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition backdrop-blur-sm"
                      placeholder="Enter blog title..."
                    />
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.blogTitle}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition backdrop-blur-sm"
                      placeholder="e.g., technology, design, business..."
                    />
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">{errors.tags}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Content
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition backdrop-blur-sm resize-none"
                      placeholder="Write your blog content here..."
                    />
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.content}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <Image href="image" alt="image" className="w-4 h-4" />
                      Featured Image
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden"
                        id="blog-file"
                        accept="image/*"
                      />
                      <label
                        htmlFor="blog-file"
                        className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-white/10 transition-all duration-300"
                      >
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-gray-400 group-hover:text-blue-500 text-sm transition-colors">
                          {image
                            ? image.name
                            : "Click to upload or drag and drop"}
                        </span>
                        <span className="text-gray-500 text-xs mt-1">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </div>
                    {errors && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {SuccessMsg && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                      ✓ {SuccessMsg}
                    </div>
                  )}

                  <button
                    onClick={handleBlogSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Publishing Blog...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Publish Blog</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminCheck(AddService);
