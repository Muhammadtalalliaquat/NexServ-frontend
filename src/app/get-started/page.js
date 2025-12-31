"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Zap, Shield, Users, Check } from "lucide-react";
import Link from "next/link";

export default function ModernGetStarted() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Get your projects done in record time with our streamlined platform",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      desc: "Bank-level security keeps your data safe and protected",
    },
    {
      icon: Users,
      title: "Expert Community",
      desc: "Connect with thousands of professionals and grow together",
    },
  ];

  const benefits = [
    "Access to premium services",
    "24/7 customer support",
    "Free trial for 30 days",
    "Cancel anytime, no questions asked",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div
        className={`relative z-10 w-full  max-w-6xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className=" p-8 md:p-12">
          {/* <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Join 10,000+ satisfied users</span>
            </div>
          </div> */}

          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 leading-tight">
            <span className="text-white">Get Started with </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              NexServ
            </span>
          </h1>

          <p className="text-gray-300 text-lg text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            Join our professional service platform and take your experience to
            the next level. Create your account and start exploring services
            designed for businesses & creators.
          </p>

          <div className="grid md:grid-cols-1 gap-6 mb-12">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              What You&apos;ll Get
            </h3>
            <div className="grid md:grid-cols-1 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <Link
              href={"/home"}
              className="group relative px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transform transition-all duration-300 hover:scale-105 overflow-hidden inline-flex items-center gap-3"
            >
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <p className="text-gray-400 text-sm mt-4">
              No credit card required • Cancel anytime • 30-day money back
              guarantee
            </p>
          </div>

          <div className="text-center text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/login"
              onClick={() => console.log("Navigate to login")}
              className="text-pink-400 font-semibold hover:text-pink-300 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>10,000+ Active Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>99.9% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
