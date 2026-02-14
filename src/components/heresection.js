import React, { useState, useEffect } from "react";
// import RatingBadge from "@/components/RatingBadge";
import {
  Sparkles,
  Zap,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HereSection({ reviewData }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const overallRating =
    reviewData.length > 0
      ? (
          reviewData.reduce((acc, review) => acc + Number(review.rating), 0) /
          reviewData.length
        ).toFixed(1)
      : 0;

  const features = [
    {
      title: "Fast Delivery",
      desc: "MVPs in 2-4 weeks based on project scope.",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Transparent Pricing",
      desc: "No surprise costs, clear quotes upfront.",
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "24/7 Support",
      desc: "Monthly maintenance plans available.",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { value: "500+", label: "Projects" },
    { value: "300+", label: "Clients" },
    { value: "98%", label: "Satisfied" },
  ];

  const featuresOurSite = [
    "Money-back guarantee",
    "Free consultation",
    "24/7 support",
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="flex justify-center mb-8 animate-fadeInDown">
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-lg"></span>
            </span>
            Available for new projects
          </div> */}
        </div>

        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8 animate-fadeInUp">
            Digital Experiences
            <br />
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-gradient-x">
                That Convert
              </span>
              <Sparkles className="absolute -top-6 -right-6 sm:-right-8 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            We craft high-performance websites, e-commerce platforms, and brands
            that don&apos;t just look stunning—
            <span className="text-white font-semibold">
              {" "}
              they drive real business growth.
            </span>{" "}
            Fast turnaround, measurable results.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp animation-delay-400">
            <button
              onClick={() => router.push("/startProject")}
              className="group relative px-8 py-4 cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl font-bold shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transform transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </button>

            <button className="group px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-2xl font-bold hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View Our Work
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeInUp animation-delay-600">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(overallRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-left">
                {/* <RatingBadge rating={overallRating} /> */}
                <p className="text-2xl font-bold text-white">{overallRating}</p>
                <p className="text-xs text-gray-400">Rating</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-6 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              {stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                  {/* Divider except after last item */}
                  {idx !== stats.length - 1 && (
                    <div className="h-8 w-px bg-white/20"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* <div className="inline-flex items-center gap-6 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400">Projects</p>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">300+</p>
                <p className="text-xs text-gray-400">Clients</p>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-xs text-gray-400">Satisfied</p>
              </div>
            </div> */}
          </div>

          {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm animate-fadeInUp animation-delay-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>24/7 support</span>
            </div>
          </div> */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm animate-fadeInUp animation-delay-800">
            {featuresOurSite.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${1000 + idx * 200}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 bg-gradient-to-r ${item.gradient}`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h4 className="font-bold text-white text-xl mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </p>

                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight
                      className={`w-5 h-5 text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
