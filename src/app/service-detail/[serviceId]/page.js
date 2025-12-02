"use client";

import { useEffect, useState } from "react";
import { getOneService } from "../../../store/features/serviceSlice";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/navbar";
import { useDispatch } from "react-redux";
import NextServLoader from "../../../components/nexservloader";
import Image from "next/image";
import Link from "next/link";

export default function ServiceDetailPage() {
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  //   const router = useRouter();
  const params = useParams();
  const serviceId = params?.serviceId;

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setLoading(true);

      try {
        const [serviceRes] = await Promise.all([
          dispatch(getOneService(serviceId)).unwrap(),
        ]);

        setServiceData(serviceRes.data);
        // console.log("Service is here:", serviceId);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, serviceId]);

  if (loading) return <NextServLoader />;

  const { title, description, image, category, pricingPlans } =
    serviceData;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 mt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src={image || "/placeholder.png"}
            alt={title}
            width={700}
            height={700}
            className="object-cover md:w-1/2 w-full h-full rounded-lg transition-all duration-300"
            priority
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-5xl font-extrabold">{title}</h1>
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
                  className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 
    rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["basic", "standard", "premium"].map((planKey) => {
              const plan = pricingPlans[planKey];
              if (!plan) return null;
              return (
                <div
                  key={plan.planId}
                  className={`border-2 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all duration-300 group 
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
                  <p className="text-4xl font-bold mb-4">${plan.price}</p>
                  {/* <ul className="space-y-3 mb-6 pt-7 border-t border-gray-300">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3">
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
                          ✓
                        </span>

                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul> */}

                  <ul className="space-y-3 mb-6 pt-7 border-t border-gray-300">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3">
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
                  {/* <button className="mt-auto bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition transform hover:scale-105">
                    Select {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
                  </button> */}
                  <button
                    className={`mt-auto py-3 px-6 rounded-xl font-semibold transition transform hover:scale-105
      ${
        planKey === "basic"
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : planKey === "standard"
          ? "bg-pink-500 hover:bg-pink-600 text-white"
          : "bg-blue-800 hover:bg-blue-900 text-white"
      }`}
                  >
                    Select {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
