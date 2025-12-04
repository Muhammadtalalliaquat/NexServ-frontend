"use client";

import { useState, useEffect, startTransition } from "react";
import Navbar from "../../components/navbar";

export default function Dashborad() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    startTransition(() => {
      setUser(storedUser);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen mt-12">
        {/* Sidebar */}
        <div className="bg-gray-100 md:w-1/4 w-full md:min-h-screen p-4 border-r border-gray-300 shadow-md flex flex-col gap-6">
          {/* User Avatar / Profile */}
          {/* <UserProfile
              user={user}
              handleLogout={() => console.log("Logout")}
            /> */}

          {/* Navigation */}
          <nav className="flex flex-col gap-3 mt-6">
            <button
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
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 md:p-10">
          {activeTab === "profile" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Profile
              </h1>
              <p className="text-gray-600">
                Welcome, {user?.userName}! Here you can view your profile
                details.
              </p>
              {/* Add profile info card here */}
            </div>
          )}

          {activeTab === "planHistory" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Plan History
              </h1>
              <p className="text-gray-600 mb-4">
                Review all your previously subscribed plans and their status.
              </p>
              {/* Add plan history table or cards here */}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Settings
              </h1>
              <p className="text-gray-600 mb-4">
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
