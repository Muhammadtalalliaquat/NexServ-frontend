"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const features = [
  {
    title: "Fast Process",
    desc: "Sign up instantly and get quick access to premium features.",
  },
  {
    title: "Secure System",
    desc: "Your data is safe with top-level security and encryption.",
  },
  {
    title: "Premium Services",
    desc: "Access a wide range of professional digital services.",
  },
];

export default function GetStartedPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("myDiv").classList.remove("opacity-0");
      document.getElementById("myDiv").classList.add("opacity-100");
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white flex items-center justify-center p-6">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-pink-100 opacity-0 transition-all duration-500 ease-out"
        id="myDiv"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Get Started with{" "}
          <span className="text-blue-600 font-extrabold">
            Nex<span className="font-extrabold text-pink-600">Serv</span>
          </span>
        </h1>

        <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
          Join our professional service platform and take your experience to the
          next level. Create your account and start exploring services designed
          for businesses & creators.
        </p>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-pink-50 shadow-sm border border-pink-100 text-center hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            className="px-4 py-3 mx-auto font-bold rounded-xl bg-pink-600 hover:bg-pink-700 text-white shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform duration-150"
            // className="px-4 py-3 mx-auto font-bold rounded-xl bg-pink-600 hover:bg-pink-700 text-white shadow-md flex items-center justify-center gap-2"
            onClick={() => router.push("/nexserv")}
          >
            Start now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            className="text-pink-600 font-semibold hover:underline"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
