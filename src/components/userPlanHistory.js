import { useEffect, useState, startTransition } from "react";
import { useDispatch } from "react-redux";
import { UserFetchService } from "../store/features/userServiceSlice";
import { MdOutlineAccessTime } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import Image from "next/image";

export default function PlanHistory() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userPlanData, setUserPlanData] = useState([]);
  const [showFeatures, setShowFeatures] = useState(false);

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

  return (
    <>
      <div className="px-4 py-8 sm:px-6 lg:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          {user?.isAdmin ? "All Users Plans" : "Your Plan History"}
        </h2>

        {loading && (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {!loading && userPlanData?.length === 0 && (
          <p className="text-gray-500 text-center">No plan history found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPlanData?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition p-5"
            >
              {user?.isAdmin && (
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-700">
                    {item.author.userName}
                  </h4>
                  <p className="text-sm text-gray-500">{item.author.email}</p>
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
                            <MdOutlineKeyboardArrowUp size={20} /> Show Features
                          </>
                        ) : (
                          <>
                            <MdOutlineKeyboardArrowDown size={20} /> Hide
                            Features
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

                  {user?.isAdmin && (
                    <div className="mt-5">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
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
                        <button
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 
               bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium 
               rounded-lg shadow-md transition-all active:scale-95"
                        >
                          <LiaEdit />
                          Edit Status
                        </button>
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
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
