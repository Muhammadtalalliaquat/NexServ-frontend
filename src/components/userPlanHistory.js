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
                srv._id === id
                  ? { ...srv, status }
                  : srv
              ),
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  };

  if (!user) return;

  return (
    <>
      <div>
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold 
          bg-gradient-to-r from-blue-600 to-blue-800 
          text-white shadow-md rounded-md 
          px-5 py-4 mt-10 mb-6 tracking-wide"
        >
          {user?.isAdmin ? "All Users Plans" : "Your Plan History"}
        </h2>

        {loading && (
          <div className="relative  top-50 text-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {!loading && userPlanData?.length === 0 && (
          <p className="text-gray-500 text-center">No plan history found.</p>
        )}

        <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPlanData?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition p-5"
            >
              {user?.isAdmin && (
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-700">
                    {item.author?.userName}
                  </h4>
                  <p className="text-sm text-gray-500">{item.author?.email}</p>
                </div>
              )}

              {item.services?.map((service) => (
                <div key={service._id}>
                  <Image
                    src={service.serviceId.image}
                    alt="service"
                    width={600}
                    height={600}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />

                  <h3 className="text-lg font-bold text-gray-800">
                    {service.serviceId.title}
                  </h3>

                  <span className="text-sm text-gray-500 block mb-2">
                    Category: {service.serviceId.category.join(", ")}
                  </span>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <div className="flex flex-row items-start justify-between">
                      <p className="text-gray-700 font-medium mb-2">
                        Price:{" "}
                        <span className="text-green-600 font-semibold">
                          ${service.selectedPlan.price}
                        </span>
                      </p>

                      <button
                        onClick={() => toggleDropdown(service._id)}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                      >
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
                            )
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
                        className={`text-xs px-3 py-1 rounded-md font-medium 
                  ${
                    service.status === "processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : service.status === "Booked"
                      ? "bg-blue-100 text-blue-800"
                      : service.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
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
                              <div className="mt-2 w-48 shadow-xl bg-white transition-all duration-300 ease-out transform">
                                <div className="py-1">
                                  {[
                                    "Booked",
                                    "completed",
                                    "cancelled",
                                  ].map((status) => {
                                    const statusClassMap = {
                                      processing:
                                        "hover:bg-blue-200 active:bg-blue-300",
                                      Booked:
                                        "hover:bg-green-200 active:bg-green-300",
                                      completed:
                                        "hover:bg-purple-200 active:bg-purple-300",
                                      cancelled:
                                        "hover:bg-red-200 active:bg-red-300",
                                    };

                                    return (
                                      <button
                                        key={status}
                                        onClick={() =>
                                          updatePlanStatus(service._id, status)
                                        }
                                        className={`block w-full px-4 py-2 text-sm border border-gray-200 font-medium text-gray-700 bg-gray-100 focus:outline-none transition-all ${statusClassMap[status]}`}
                                      >
                                        {status}
                                      </button>
                                    );
                                  })}
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
