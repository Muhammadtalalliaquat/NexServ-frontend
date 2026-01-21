"use client";

import {
  createProject,
  setSuccessMsg,
  setLoading,
  setResError,
} from "../../store/features/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, startTransition } from "react";
import {
  ArrowRight,
  Sparkles,
  DollarSign,
  Clock,
  FileText,
  Briefcase,
  X,
  CheckCircle,
  Loader,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "../../components/navbar";

const PROJECT_TYPES = [
  "Web Development",
  // "Mobile App",
  "UI/UX Design",
  "E-commerce",
  "SEO",
  // "Custom Software",
  "Other",
];

// export const PROJECT_TYPES = {
//   WEB: "Web Development",
//   UIUX: "UI/UX Design",
//   ECOM: "E-commerce",
//   SEO: "SEO",
//   OTHER: "Other",
// };


const BUDGETS = ["Low", "Medium", "High", "Custom"];

// const BUDGETS = [
//   "Under $1,000",
//   "$1,000 - $5,000",
//   "$5,000 - $10,000",
//   "$10,000 - $25,000",
//   "$25,000+",
//   "To be discussed",
// ];

export default function ModernProjectForm() {
  const [open, setOpen] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("Custom");
  const [timeline, setTimeline] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const { loading, successMsg, resError } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    startTransition(() => {
      setUser(storedUser);
    });

    // if (successMsg || resError) {
    //   const timer = setTimeout(() => {
    //     dispatch(setSuccessMsg(null));
    //     dispatch(setResError(null));
    //   }, 3000);
    //   return () => clearTimeout(timer);
    // }
  }, [dispatch]);

  const addUserProject = (e) => {
    e.preventDefault();

    if (!user) {
      dispatch(setResError("Please login before submitting"));
      return;
    }

    setLoading(true);

    const projectData = {
      projectType,
      description,
      budget,
      timeline,
    };

    dispatch(createProject(projectData))
      .unwrap()
      .then(() => {
        // reset form
        setProjectType("");
        setDescription("");
        setBudget("Custom");
        setTimeline("");
      })
      .catch(() => {
        // console.error("Project submit failed:", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-24 sm:py-0 p-4">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Transform Your Ideas Into Reality
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
              Let&apos;s Build Something
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Share your vision with us and we&apos;ll turn it into a stunning
              digital experience
            </p>

            {/* CTA Button */}
            {!open && (
              <button
                onClick={() => {
                  if (!user) {
                    dispatch(
                      setResError("Please login to create your project.")
                    );
                    return;
                  }
                  setOpen(true);
                }}
                className="group relative px-8 py-4 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transform transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}
          </div>
          {/* {resError && (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg px-2 font-medium text-sm">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-red-100 border border-red-300 px-4 py-3 text-red-700 shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium text-center">{resError}</span>
        </div>
      </div>
    )} */}

          {/* Form Modal */}
          {open && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
                {/* Form Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 z-10">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-bold mb-2">
                    Start Your Project
                  </h2>
                  <p className="text-purple-100">
                    Fill in the details below and we&apos;ll get back to you
                    shortly
                  </p>
                </div>

                {resError ? (
                  // ❌ Error State
                  <div className="p-12 text-center z-30">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <XCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Oops!
                    </h3>
                    <p className="text-red-600 font-medium">{resError}</p>
                    <button
                      onClick={() => {
                        dispatch(setResError(null));
                      }}
                      className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                ) : successMsg ? (
                  // ✅ Success State
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Success!
                    </h3>
                    <p className="text-gray-600">{successMsg}</p>
                    <p className="text-gray-500 text-sm mt-4">
                      We&apos;ll review your project and get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  // 📝 Form State
                  <div className="p-8 space-y-6">
                    {/* Project Type */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                        Project Type
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
                      >
                        <option value="">Choose your project type...</option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        Project Description
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          rows={5}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Tell us about your vision, goals, and what you want to achieve..."
                          required
                          minLength={10}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white resize-none"
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                          {description.length}/500
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        Minimum 10 characters required
                      </p>
                    </div>

                    {/* Budget & Timeline Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Budget */}
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 text-purple-600" />
                          Budget Range
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
                        >
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Timeline */}
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Clock className="w-4 h-4 text-purple-600" />
                          Expected Timeline
                        </label>
                        <input
                          type="text"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          placeholder="e.g., 2 weeks, 1 month"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
                        />
                      </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                      <p className="text-sm text-gray-700 flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Pro Tip:</strong> The more details you
                          provide, the better we can understand your needs and
                          provide an accurate quote.
                        </span>
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={addUserProject}
                      disabled={
                        loading || !projectType || description.length < 10
                      }
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Project Request
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-500">
                      By submitting, you agree to our terms of service and
                      privacy policy
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features Section */}
          {!open && (
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Quick Response
                </h3>
                <p className="text-gray-600">
                  Get a response within 24 hours with a detailed proposal
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Expert Team
                </h3>
                <p className="text-gray-600">
                  Work with experienced developers and designers
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Fair Pricing
                </h3>
                <p className="text-gray-600">
                  Transparent pricing with no hidden costs
                </p>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.2s ease-out;
          }

          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}
