"use client";

import { useEffect, useState } from "react";
import {
  getOneService,
  removeService,
} from "../../../store/features/serviceSlice";
import {
  createUserService,
  getUserAllService,
} from "../../../store/features/userServiceSlice";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/navbar";
import { useDispatch } from "react-redux";
import NextServLoader from "../../../components/nexservloader";
import Footer from "../../../components/footer";
import Image from "next/image";
import Link from "next/link";

export default function ServiceDetailPage() {
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.serviceId;
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userService, setUserService] = useState([]);

  const { title, description, image, category, pricingPlans } = serviceData;

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setLoading(true);

      try {
        // Always call this
        const serviceRes = await dispatch(getOneService(serviceId)).unwrap();
        setServiceData(serviceRes.data);

        // Only call user services if user exists
        if (storedUser) {
          const userSerData = await dispatch(getUserAllService()).unwrap();
          setUserService(userSerData.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, serviceId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const storedUser = JSON.parse(localStorage.getItem("user"));
  //     setUser(storedUser);
  //     setLoading(true);

  //     try {
  //       const [serviceRes , userSerData] = await Promise.all([
  //         dispatch(getOneService(serviceId)).unwrap(),
  //         dispatch(getUserAllService()).unwrap(),
  //       ]);

  //       setServiceData(serviceRes.data);
  //       setUserService(userSerData.data);
  //       // console.log("Service is here:", serviceId);
  //     } catch (err) {
  //       console.error("Fetch Error:", err);
  //       setError("Failed to load data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, serviceId]);

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
    (s) => s?.serviceId?._id === serviceData._id
  );

  if (loading) return <NextServLoader />;

  return (
    <>
      <Navbar />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 mt-10">
          {/* Header */}
          {/* Active service box */}

          <div className="flex flex-col md:flex-row  gap-8">
            <Image
              src={image || "/placeholder.png"}
              alt={title}
              width={700}
              height={700}
              className="object-cover md:w-1/2 w-full h-full rounded-lg transition-all duration-300"
              priority
            />
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-700">
                {title}
              </h1>

              <div className="flex flex-wrap gap-3">
                {category.map((cat) => (
                  <span
                    key={cat}
                    className="bg-gradient-to-r from-pink-300 to-pink-500 text-white px-4 py-1 rounded-full font-medium text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-lg">{description}</p>
              {user?.isAdmin === true && (
                <div className="flex items-center gap-3 mt-4">
                  <Link
                    href={`/update-service/${serviceId}`}
                    className="px-4 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 
    rounded-lg text-sm font-medium transition"
                  >
                    update
                  </Link>

                  <button
                    onClick={handleDeleteService}
                    className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 
    rounded-lg text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              )}
              {user && activeService ? (
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-lg p-4 shadow-sm">
                  {/* Header */}
                  <h3 className="text-green-800 flex items-center gap-2 font-semibold text-base">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Your Service is Activated
                  </h3>

                  {/* Status */}
                  <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-2 mt-2 sm:mt-0">
                    <span className="font-semibold text-gray-800">Status:</span>

                    {activeService.status === "processing" && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-400 rounded-md text-sm font-medium">
                        ⏳ Processing
                      </span>
                    )}

                    {activeService.status === "Booked" && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-400 rounded-md text-sm font-medium">
                        Booked
                      </span>
                    )}

                    {activeService.status === "completed" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-500 rounded-md text-sm font-medium">
                        ✔ Completed
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <></>
                // <div className="mt-5 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-center">
                //   You have not selected this service yet.
                // </div>
              )}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-700">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["basic", "standard", "premium"].map((planKey) => {
                const plan = pricingPlans[planKey];
                if (!plan) return null;
                return (
                  <div
                    key={plan.planId}
                    className={`border-2 rounded-2xl bg-gray-50 p-6 flex flex-col justify-between shadow-lg transition-all duration-300 group 
                  ${
                    planKey === "basic"
                      ? "border-blue-500 hover:bg-blue-50"
                      : ""
                  }
                  ${
                    planKey === "standard"
                      ? "border-pink-500 hover:bg-pink-100"
                      : ""
                  }
                  ${
                    planKey === "premium"
                      ? "border-blue-800 hover:bg-blue-500 hover:text-white"
                      : ""
                  }
                `}
                  >
                    <h3
                      className={`text-2xl font-semibold mb-4 capitalize 
                    ${
                      planKey === "basic"
                        ? "text-blue-500"
                        : planKey === "standard"
                        ? "text-pink-500"
                        : "text-blue-800 group-hover:text-white"
                    }`}
                    >
                      {planKey}
                    </h3>
                    <p
                      className={`text-4xl font-bold mb-4 text-gray-700  ${
                        planKey === "premium"
                          ? "text-blue-800 group-hover:text-white"
                          : ""
                      }`}
                    >
                      ${plan.price}
                    </p>

                    <ul className="space-y-3 mb-6 pt-7 border-t border-gray-300">
                      {plan.features.map((f, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center gap-3 text-gray-700 ${
                            planKey === "premium"
                              ? "group-hover:text-white"
                              : ""
                          }`}
                        >
                          <span
                            className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-[12px]
                            ${
                              planKey === "basic"
                                ? "bg-blue-500"
                                : planKey === "standard"
                                ? "bg-pink-500"
                                : "bg-blue-800"
                            }
                           `}
                          >
                            ✔
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSelectPlan(plan.planId)}
                      // onClick={() => {addUserService(plan.planId)}}
                      className={`mt-auto py-3 px-6 rounded-xl font-semibold transition transform hover:scale-105
                    ${
                      planKey === "basic"
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : planKey === "standard"
                        ? "bg-pink-500 hover:bg-pink-600 text-white"
                        : "bg-blue-800 hover:bg-blue-900 text-white"
                    }`}
                    >
                      Select{" "}
                      {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
                    </button>
                  </div>
                );
              })}
            </div>

            {openModal && (
              <div
                onClick={() => setOpenModal(false)}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              >
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Confirm Your Booking
                  </h2>

                  {user ? (
                    <>
                      <p className="text-gray-600 mb-4">
                        You selected:{" "}
                        <span className="font-bold">{selectedPlan}</span>
                      </p>

                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setOpenModal(false)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-200"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handleConfirmBooking}
                          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-red-600 mb-4">
                      Please login before booking the service.
                    </p>
                  )}
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                className={`rounded-md px-3 py-2 mt-2 text-sm${
                  errorMsg.toLowerCase().includes("already")
                    ? "text-red-600 bg-red-100 border border-red-400"
                    : "text-green-600 bg-green-100 border border-green-400"
                }
              `}
              >
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
