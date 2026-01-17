import { useEffect, useState, startTransition } from "react";
import { useDispatch } from "react-redux";
import {
  UserFetchService,
  updateService,
} from "../store/features/userServiceSlice";
import { MdOutlineAccessTime } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";
import { DollarSign, X, Tag } from "lucide-react";

export default function PlanHistory() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userPlanData, setUserPlanData] = useState([]);
  const [showFeatures, setShowFeatures] = useState(false);
  const [satusToggle, setSatusToggle] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    startTransition(() => {
      setUser(storedUser);
    });
    dispatch(UserFetchService())
      .then((result) => {
        setUserPlanData(result.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [dispatch]);

  const toggleDropdown = (id) => {
    setShowFeatures((prev) => (prev === id ? null : id));
  };

  const toggleDropdownStatus = (serviceId) => {
    setSatusToggle((prev) => (prev === serviceId ? null : serviceId));
  };

  const updatePlanStatus = (id, status) => {
    dispatch(updateService({ id, status }))
      .then((result) => {
        setLoading(false);
        const updated = result.payload?.data;
        console.log("UPDATED DATA ===>", updated);
        if (updated) {
          setUserPlanData((prev) =>
            prev.map((user) => ({
              ...user,
              services: user.services.map((srv) =>
                srv._id === id ? { ...srv, status } : srv,
              ),
            })),
          );
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  };

  const getStatusStyles = (status) => {
    const styles = {
      processing:
        "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200",
      Booked:
        "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200",
      completed:
        "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200",
      cancelled:
        "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  if (!user) return;

  return (
    <>
      {/* <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {user?.isAdmin ? "All Users Plans" : "Your Plan History"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {user?.isAdmin
                ? "Manage and monitor all user subscriptions"
                : "Track your service subscriptions and history"}
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-40">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div
                  className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-600 rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1s",
                  }}
                ></div>
              </div>
            </div>
          )}

          {!loading && userPlanData?.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No plan history found.</p>
              <p className="text-gray-400 text-sm mt-2">
                Your subscriptions will appear here once you make a purchase.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlanData?.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl shadow-lg z-50 hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                {user?.isAdmin && (
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {item.author?.userName?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.author?.userName}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {item.author?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {item.services?.map((service) => (
                  <div key={service._id}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={service.serviceId.image}
                        alt="service"
                        width={600}
                        height={600}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-lg">
                        {service.selectedPlan.planId.replace("plan_", "")}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.serviceId.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.serviceId.category.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full font-medium border border-blue-100"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm text-gray-500">Price</span>
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              ${service.selectedPlan.price}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleDropdown(service._id)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Features
                            {showFeatures === service._id ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                        </div>

                        {showFeatures === service._id && (
                          <div className="mt-3 space-y-2 animate-fade">
                            {Array.isArray(service?.selectedPlan?.features) &&
                            service.selectedPlan.features.length > 0 ? (
                              service.selectedPlan.features.map(
                                (feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2 text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 p-3 rounded-lg border border-gray-100"
                                  >
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </div>
                                )
                              )
                            ) : (
                              <div className="text-red-600 text-sm flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                                <X className="w-4 h-4" />
                                No features found for this plan!
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span
                          className={`text-xs px-4 py-2 rounded-full font-semibold ${getStatusStyles(
                            service.status
                          )}`}
                        >
                          {service.status}
                        </span>

                        {user?.isAdmin && (
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdownStatus(service._id)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transition-all active:scale-95"
                            >
                              <Edit2 size={14} />
                              Edit
                            </button>

                            {satusToggle === service._id && (
                              <div className=" right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 animate-fade">
                                {["Booked", "completed", "cancelled"].map(
                                  (status) => (
                                    <button
                                      key={status}
                                      onClick={() =>
                                        updatePlanStatus(service._id, status)
                                      }
                                      className="block w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all text-left border-b border-gray-100 last:border-b-0"
                                    >
                                      {status}
                                    </button>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        <Clock size={14} />
                        <span>
                          {new Date(service.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fade {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade {
            animation: fade 0.3s ease-out;
          }
        `}</style>
      </div> */}

      <div className="max-w-7xl mx-auto">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold 
          bg-gradient-to-r from-blue-600 to-blue-800 
          text-white shadow-md rounded-md 
          px-5 py-4 mt-10 mb-6 tracking-wide"
        >
          {user?.isAdmin ? "All Users Plans" : "Your Plan History"}
        </h2>

        {loading && (
          <div className="flex flex-col items-center justify-center py-44">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-indigo-600 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1s",
                }}
              ></div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">
              Loading your plans...
            </p>
          </div>
        )}

        {!loading && userPlanData?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No plan history found.</p>
            <p className="text-gray-400 text-sm mt-2">
              Your subscriptions will appear here once you make a purchase.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPlanData?.map((item, index) =>
            item.services?.map((service) => (
              <div
                key={`${item._id}-${service._id}-${index}`}
                className="group bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition "
              >
                {user?.isAdmin && (
                  <div className=" border-b border-gray-200 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {item.author?.userName?.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex flex-col">
                        <h4 className="font-semibold text-gray-700 leading-tight">
                          {item.author?.userName}
                        </h4>
                        <p className="text-sm text-gray-500 break-all">
                          {item.author?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative overflow-hidden group/image">
                  <Image
                    src={service.serviceId.image}
                    alt="service"
                    width={600}
                    height={600}
                    className="w-full h-48 object-cover transform group-hover/image:scale-110 transition-transform duration-500"

                    // className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-lg">
                    {service.selectedPlan.planId.replace("plan_", "")}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {service.serviceId.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.serviceId.category.map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full font-medium border border-blue-100 shadow-sm"
                      >
                        <Tag size={12} />
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-3 border-t border-gray-100 pt-3">
                    <div className="flex flex-row items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                          Price
                        </p>
                        <div className="flex items-center gap-1">
                          <DollarSign size={18} className="text-green-600" />
                          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {service.selectedPlan.price}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleDropdown(service._id)}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                      >
                        Features
                        {showFeatures === service._id ? (
                          <>
                            <MdOutlineKeyboardArrowUp size={20} />
                          </>
                        ) : (
                          <>
                            <MdOutlineKeyboardArrowDown size={20} />
                          </>
                        )}
                      </button>
                    </div>
                    {showFeatures === service._id && (
                      <ul className="mt-2 space-y-2 animate-fade">
                        {Array.isArray(service?.selectedPlan?.features) &&
                        service.selectedPlan.features.length > 0 ? (
                          service.selectedPlan.features.map(
                            (feature, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-200"
                              >
                                <span className="text-green-600 mt-1">✔</span>
                                <span>{feature}</span>
                              </li>
                            ),
                          )
                        ) : (
                          <li className="text-red-600 text-sm flex items-center gap-2">
                            ⚠ No features found for this plan!
                          </li>
                        )}
                      </ul>
                    )}
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-row sm:flex-row items-center justify-between gap-3 mt-3">
                      <span
                        className={`text-xs px-4 py-2 rounded-full font-semibold ${getStatusStyles(
                          service.status,
                        )}`}
                      >
                        {service.status}
                      </span>

                      {user?.isAdmin && (
                        <div className="relative">
                          <span
                            onClick={() => toggleDropdownStatus(service._id)}
                            className="cursor-pointer hover:text-gray-600"
                          >
                            <button
                              className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1
                         bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                         rounded-lg shadow-md transition-all active:scale-95"
                            >
                              <LiaEdit />
                              Edit Status
                            </button>
                          </span>

                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: satusToggle ? 1 : 0,
                              height: satusToggle ? "auto" : 0,
                            }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden absolute right-0 z-10"
                          >
                            {satusToggle === service._id && (
                              <div className="mt-2 w-48 bg-white  shadow-2xl border border-gray-200 overflow-hidden z-20 animate-fade">
                                <div className="py-1">
                                  {["Booked", "completed", "cancelled"].map(
                                    (status) => {
                                      return (
                                        <button
                                          key={status}
                                          onClick={() =>
                                            updatePlanStatus(
                                              service._id,
                                              status,
                                            )
                                          }
                                          className="block w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all text-left border-b border-gray-100 last:border-b-0"
                                        >
                                          {status}
                                        </button>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      )}
                    </div>

                    <div
                      className="mt-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-100 
                  px-3 py-1 rounded-full w-fit shadow-sm"
                    >
                      <MdOutlineAccessTime />

                      <span>
                        Created at:{" "}
                        {new Date(service.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
}
