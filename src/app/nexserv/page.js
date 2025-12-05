"use client";

import { getAllService } from "../../store/features/serviceSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import HereSection from "../../components/heresection";
import Navbar from "../../components/navbar";
import NextServLoader from "../../components/nexservloader";
import Image from "next/image";
import Link from "next/link";

export default function HomeRoute() {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
      // setUser(storedUser);
      setLoading(true); 
      
      try {
        const [heroRes] = await Promise.all([
          dispatch(getAllService()).unwrap(),
        ]);

        setServiceData(heroRes.data);
        console.log("Service is here:", heroRes.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return <NextServLoader />;

  return (
    <>
      <Navbar />
      <HereSection />

      <section className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
            Our <span className="text-pink-600">Services</span>
          </h2>

          {serviceData.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceData.map((service, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-6 bg-gray-50 border border-gray-200 hover:border-pink-600 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.png"}
                      alt={service.title}
                      width={700}
                      height={700}
                      className="object-cover w-full h-full rounded-lg transition-all duration-300"
                      priority
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {service.description.length > 100
                      ? service.description.slice(0, 100) + "..."
                      : service.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-gray-400 text-xs">
                      Created:{" "}
                      {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/service-detail/${service._id}`}
                      className="px-3 py-1 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No services available at the moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
