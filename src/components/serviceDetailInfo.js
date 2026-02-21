"use client";

import { useEffect, useState } from "react";
import {
  //   getOneService,
  removeService,
} from "../store/features/serviceSlice";
import {
  createUserService,
  getUserAllService,
} from "../store/features/userServiceSlice";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import { useDispatch } from "react-redux";
// import NextServLoader from "../components/nexservloader";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle, 
  X, 
  Star, 
  Shield, 
  Clock,
  Award,
  TrendingUp,
  Zap,
  Sparkles,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function ServiceDetailPage({ initialServiceData }) {
  //   const [loading, setLoading] = useState(true);
  //   const [serviceData, setServiceData] = useState(initialServiceData || []);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.serviceId;
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userService, setUserService] = useState([]);

  const { title, description, image, category, pricingPlans } =
    initialServiceData;

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      //   setLoading(true);

      if (storedUser) {
        const userSerData = await dispatch(getUserAllService()).unwrap();
        setUserService(userSerData.data);
      }
      //   try {
      //     // Always call this
      //     const serviceRes = await dispatch(getOneService(serviceId)).unwrap();
      //     setServiceData(serviceRes.data);

      //     // Only call user services if user exists
      //   } catch (err) {
      //     console.error("Fetch Error:", err);
      //     setError("Failed to load data.");
      //   }
      //   finally {
      //     setLoading(false);
      //   }
    };

    fetchData();
  }, [dispatch, serviceId]);

  const handleDeleteService = async () => {
    if (!serviceId) {
      console.error("Product ID is missing!");
      return;
    }

    console.log(serviceId, "id here");

    try {
      const result = await dispatch(removeService(serviceId));
      console.log("Service deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting Service:", error);
    } finally {
      setLoading(false);
      router.push("/nexserv");
    }
  };

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    setOpenModal(true);
  };

  const handleConfirmBooking = () => {
    if (!user) {
      setError("Please login before booking service");
      return;
    }
    dispatch(createUserService({ serviceId, planId: selectedPlan }))
      .then((result) => {
        const { msg } = result.payload;
        setErrorMsg(msg);
        console.log("API Response:", result.payload);
        setOpenModal(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      });
  };

  const activeService = userService?.services?.find(
    (s) => s?.serviceId?._id === initialServiceData._id,
  );

  const getStatusConfig = (status) => {
    const configs = {
      processing: {
        icon: Clock,
        label: "Processing",
        gradient: "from-yellow-500 to-amber-500",
        bg: "from-yellow-50 to-amber-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
      },
      Booked: {
        icon: CheckCircle,
        label: "Booked",
        gradient: "from-blue-500 to-indigo-500",
        bg: "from-blue-50 to-indigo-50",
        text: "text-blue-700",
        border: "border-blue-200",
      },
      completed: {
        icon: Award,
        label: "Completed",
        gradient: "from-green-500 to-emerald-500",
        bg: "from-green-50 to-emerald-50",
        text: "text-green-700",
        border: "border-green-200",
      },
    };
    return configs[status] || configs.Booked;
  };

  const statusConfig = getStatusConfig(activeService?.status);
  const StatusIcon = statusConfig.icon;

  //   if (loading) return <NextServLoader />;

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
            {/* Image */}
            <div className="lg:w-1/2">
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  width={700}
                  height={700}
                  src={image}
                  alt={title}
                  className="w-full h-[400px] lg:h-[510px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                {title}
              </h1>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-3">
                {category.map((cat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    {cat}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                {description}
              </p>

              {/* Admin Actions */}
              {user?.isAdmin && (
                <div className="flex flex-wrap gap-3 pt-4">
                  <Link
                    href={`/update-service/${serviceId}`}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <Edit className="w-4 h-4" />
                    Update Service
                  </Link>
                  <button
                    onClick={handleDeleteService}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Service
                  </button>
                </div>
              )}

              {/* Active Service Status */}
              {user && activeService && (
                <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${statusConfig.bg} opacity-50`}
                  ></div>

                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statusConfig.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <StatusIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg">
                          Service Activated
                        </h3>
                        <p className="text-sm text-gray-600">
                          Your service is currently active
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm ${statusConfig.text} bg-gradient-to-r ${statusConfig.bg} border-2 ${statusConfig.border} shadow-md flex items-center gap-2`}
                    >
                      {activeService.status === "processing" && "⏳"}
                      {activeService.status === "Booked" && "📅"}
                      {activeService.status === "completed" && "✔"}
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Plans Section */}
          <div className="space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  Flexible Pricing
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Perfect Plan
              </h2>
              <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
                Select the package that best fits your needs. All plans include
                our quality guarantee.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(pricingPlans).map(([planKey, plan], index) => {
                const colors = {
                  basic: {
                    gradient: "from-blue-500 to-indigo-500",
                    hover: "hover:from-blue-600 hover:to-indigo-600",
                    border: "border-blue-200",
                    bg: "from-blue-50 to-indigo-50",
                  },
                  standard: {
                    gradient: "from-pink-500 to-purple-500",
                    hover: "hover:from-pink-600 hover:to-purple-600",
                    border: "border-pink-200",
                    bg: "from-pink-50 to-purple-50",
                  },
                  premium: {
                    gradient: "from-purple-600 to-blue-600",
                    hover: "hover:from-purple-700 hover:to-blue-700",
                    border: "border-purple-300",
                    bg: "from-purple-50 to-blue-50",
                  },
                };

                const color = colors[planKey];
                const isPopular = planKey === "premium";

                return (
                  <div
                    key={plan.planId}
                    className={`relative group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${color.border} ${
                      isPopular
                        ? "transform lg:-translate-y-4 scale-105"
                        : "hover:-translate-y-2"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute top-6 right-6 z-10">
                        <div className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          Popular
                        </div>
                      </div>
                    )}

                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>

                    <div className="relative p-8 space-y-6 flex flex-col justify-between h-full">
                      {/* Plan Header */}
                      <div>
                        <h3
                          className={`text-2xl font-bold capitalize bg-gradient-to-r ${color.gradient} bg-clip-text text-transparent mb-2`}
                        >
                          {planKey}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="text-gray-500 font-medium">
                            /project
                          </span>
                        </div>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-4 pt-6 border-t-2 border-gray-100 h-full">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-md`}
                            >
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed font-medium">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleSelectPlan(plan.planId)}
                        className={`w-full py-4 px-6 bg-gradient-to-r ${color.gradient} ${color.hover} text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2`}
                      >
                        Select{" "}
                        {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
                        <Zap className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Shield className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600">Secure</p>
              </div>
              <div>
                <Clock className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support</p>
              </div>
              <div>
                <Award className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Projects</p>
              </div>
              <div>
                <Star className="w-10 h-10 mx-auto mb-3 text-yellow-600 fill-yellow-600" />
                <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Booking Modal */}
        {openModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl transform animate-slideUp">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Confirm Your Booking
                </h2>
                <button
                  onClick={() => setOpenModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {user ? (
                <div className="space-y-6">
                  <p className="text-gray-700">
                    You selected:{" "}
                    <span className="font-bold text-blue-600">
                      {selectedPlan?.replace("plan_", "").toUpperCase()}
                    </span>
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpenModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 font-medium">
                    Please login before booking the service.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {errorMsg && (
          <div className="fixed top-6 right-6 z-50 animate-slideInRight">
            <div
              className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md ${
                errorMsg.toLowerCase().includes("already")
                  ? "bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-700"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-700"
              }`}
            >
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-semibold flex-1">{errorMsg}</p>
              <button
                onClick={() => setErrorMsg(null)}
                className="p-1 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          .animate-slideInRight {
            animation: slideInRight 0.4s ease-out;
          }
        `}</style>
      </section>

      <Footer />
    </>
  );
}
