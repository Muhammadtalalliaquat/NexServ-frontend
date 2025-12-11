"use client";

import { useState, useEffect, startTransition } from "react";
import Navbar from "../../components/navbar";
import UserProdile from "../../components/userProdile";
import PlanHistory from "../../components/userPlanHistory";
import UserFeedBack from "../../components/userReview";
import { FaUser, FaHistory, FaCog } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
export default function Dashborad() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    startTransition(() => {
      setUser(storedUser);
    });
  }, []);

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser size={18} /> },
    { id: "planHistory", label: "Plan History", icon: <FaHistory size={18} /> },
    { id: "FeedBack", label: "Feed back", icon: <VscFeedback size={18} /> },
    { id: "settings", label: "Settings", icon: <FaCog size={18} /> },
  ];

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen mt-12">
        {/* Sidebar */}
        <div className="bg-gray-100 md:w-1/5 w-full md:min-h-screen p-4 border-r border-gray-300 shadow-md flex flex-col gap-6">
          {/* Navigation */}
          <nav className="flex flex-col gap-3 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 transition font-medium ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
            {/* <button
              onClick={() => setActiveTab("profile")}
              className={`text-left px-3 py-2 rounded-md border-b border-gray-300 font-medium transition ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("planHistory")}
              className={`text-left px-3 py-2 rounded-md border-b border-gray-300 font-medium transition ${
                activeTab === "planHistory"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Plan History
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`text-left px-3 py-2 rounded-md border-b border-gray-300 font-medium transition ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Settings
            </button> */}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 md:p-10">
          {activeTab === "profile" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Profile
              </h1>
              <p className="text-gray-600 pb-6 border-b border-gray-200">
                Welcome, {user?.userName}! Here you can view your profile
                details.
              </p>
              <UserProdile />
              {/* Add profile info card here */}
            </div>
          )}

          {activeTab === "planHistory" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Plan History
              </h1>
              <p className="text-gray-600 mb-4 pb-6 border-b border-gray-200">
                Review all your previously subscribed plans and their status.
              </p>
              <PlanHistory />
              {/* Add plan history table or cards here */}
            </div>
          )}

          {activeTab === "FeedBack" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Your Feed Back
              </h1>
              <p className="text-gray-600 mb-4 pb-6 border-b border-gray-200">
                Upload a your Feed Back in our website.
              </p>
              <UserFeedBack />
              {/* Add settings forms here */}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Settings
              </h1>
              <p className="text-gray-600 mb-4 pb-6 border-b border-gray-200">
                Update your account settings and preferences.
              </p>
              {/* Add settings forms here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
