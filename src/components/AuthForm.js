"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../server/authAction";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constant/constant";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
// import styles from "./main.module.css";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const authError = useSelector((state) => state.user.error);
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ email, password }));

        console.log(result.user, "data revicced");
        if (result.success) {
          if (result.user?.isAdmin === true) {
            router.push("/add-service");
          } else {
            router.push("/home");
          }
          // router.push("/adminDashboard");
        } else {
          setIsSubmitting(false);
          console.log("Please verify your email before proceeding.");
        }
      } else {
        const result = await dispatch(
          registerUser({ email, password, userName })
        );

        if (result.success) {
          router.push("/emailVerify");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // setError("An unexpected error occurred. Please try again.");
    }
  };

  const requestPasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      setMessage("");
      const response = await axios.post(ApiRoutes.forgotPassword, { email });

      if (!response.data.error) {
        setMessage(
          response.data.msg || "Password reset email sent successfully."
        );
        return;
      }
      // Backend failed (email not registered, etc.)
      setMessage(response.data.msg || "This email is not registered.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "Failed to send reset email. Please try again.";
      console.error("Error:", errorMessage);
      setMessage(errorMessage);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     const token = await user.getIdToken();
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", JSON.stringify(user));
  //     console.log("user data here ", user, token);
  //     router.push("/fashion-store");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-[1rem] flex flex-col md:flex-row w-full max-w-[900px] overflow-hidden">
        {/* Left Blue Panel */}
        <div
          className="w-full md:w-1/2 bg-pink-700 text-white flex flex-col justify-center items-center p-10 
           rounded-bl-[4rem] rounded-br-[4rem]    /* Mobile */
           sm:rounded-tr-[1rem] sm:rounded-br-[6rem] sm:rounded-bl-[0rem]  /* Small screens */
           md:rounded-tr-[8rem] md:rounded-br-[8rem]  /* Tablet */
           lg:rounded-tr-[10rem] lg:rounded-br-[10rem]"
        >
          <h2 className="text-4xl font-extrabold mb-4">
            {isLogin ? "Hello, Welcome!" : "Welcome Back!"}
          </h2>
          <p className="mb-6 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            className="border border-white rounded-lg px-6 py-2 font-semibold 
            hover:bg-white hover:text-pink-700 transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? "Login" : "Registration"}
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700 transition"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700 transition"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700 transition"
                required
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {isLogin && (
              <div className="text-center text-sm mb-4">
                <button
                  type="button"
                  className="text-gray-500 hover:underline"
                  onClick={requestPasswordReset}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {message && (
              <p className="text-orange-500 text-center text-sm mt-2">
                {message}
              </p>
            )}
            {authError && (
              <p className="text-red-500 text-center text-sm mt-2">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-700 text-white py-3 font-semibold rounded-lg 
          hover:bg-pink-600 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>

            {/* Social Icons */}
            {/* <div className="flex justify-center gap-3 mt-4">
              <button className="border border-gray-300 rounded-lg p-2">
                <i className="fab fa-google"></i>
              </button>
              <button className="border border-gray-300 rounded-lg p-2">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="border border-gray-300 rounded-lg p-2">
                <i className="fab fa-github"></i>
              </button>
              <button className="border border-gray-300 rounded-lg p-2">
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
