"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../server/authAction";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constant/constant";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";

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
          registerUser({ email, password, userName }),
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
          response.data.msg || "Password reset email sent successfully.",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-10 h-10" />
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {isLogin ? "Welcome Back!" : "Join Us Today!"}
                </h2>

                <p className="text-white/90 text-lg mb-8 max-w-sm mx-auto">
                  {isLogin
                    ? "Sign in to access your account and continue your journey with us"
                    : "Create an account and unlock all our amazing tech services"}
                </p>

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 hover:scale-105"
                >
                  <span>{isLogin ? "Create Account" : "Back to Login"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-12 flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white/30"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/5">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {isLogin ? "Sign In" : "Create Account"}
                </h3>
                <p className="text-gray-400">
                  {isLogin
                    ? "Enter your credentials to access your account"
                    : "Fill in your details to get started"}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {!isLogin && (
                  <div className="relative group">
                    <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm"
                      required
                    />
                  </div>
                )}

                <div className="relative group">
                  <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="block text-white text-sm font-medium mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                    >
                      {showPass ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={requestPasswordReset}
                      className="text-sm text-purple-400 hover:text-purple-300 transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {message && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm text-center">
                    ✓ {message}
                  </div>
                )}
                {authError && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm text-center">
                    ⚠ {authError}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>
                        {isLogin ? "Signing In..." : "Creating Account..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Terms - Registration Only */}
                {!isLogin && (
                  <p className="text-xs text-gray-400 text-center">
                    By creating an account, you agree to our{" "}
                    <button className="text-purple-400 hover:underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-purple-400 hover:underline">
                      Privacy Policy
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Secure authentication powered by industry-standard encryption</p>
        </div>
      </div>
    </div>
  );
}
