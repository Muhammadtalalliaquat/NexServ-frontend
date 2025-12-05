
import { useEffect, useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountDetailsUpdate } from "../server/authAction";
import { setErrorUpdate } from "../store/features/userAcountUpdateSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProdile() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userAcount);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    startTransition(() => {
      setUser(storedUser);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setErrorUpdate(null));
    const response = await dispatch(
      accountDetailsUpdate({ userName, email, password })
    );
    if (response.success) {
      console.log("Account updated successfully!");
      toast.success("Account details updated successfully! 🎉", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      console.log(response.error);
    }
  };

  return (
    <>
      <div className="mt-10">
        <div className=" mx-auto bg-white rounded-t-md shadow-md overflow-hidden">
          <div className="bg-gray-600 px-6 py-5 sm:px-8">
            <h1 className="text-white text-2xl font-semibold">
              Account Details
            </h1>
          </div>

          <div className="mb-2 bg-white shadow-lg p-6 border border-gray-200">
            <div className="flex flex-row sm:flex-row items-start sm:items-center sm:gap-4 gap-2 mb-4">
              {/* Profile Icon */}
              <div className="w-12 h-12 bg-gray-100 text-gray-600 flex items-center justify-center rounded-full text-xl font-bold uppercase">
                {user?.userName?.charAt(0)}
              </div>

              {/* User Details */}
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 break-all">
                  {user?.userName}
                </h3>
                <p className="text-sm text-gray-500 break-all">{user?.email}</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-600">
                Welcome back,{" "}
                <span className="text-blue-600 font-medium">
                  {user?.userName?.split(" ")[0] || "User"}
                </span>
                !
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-7 space-y-6 bg-white shadow-md rounded-lg">
            <p className="text-sm text-gray-700 bg-gray-100 border border-gray-200 p-3 rounded-md">
              Manage your personal information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-100 focus:border-gray-500 outline-none transition-all"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-100 focus:border-gray-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-100 focus:border-gray-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
