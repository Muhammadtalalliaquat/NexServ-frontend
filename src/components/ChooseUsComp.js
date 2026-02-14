
import { useState } from "react";
import {
  Shield,
  Zap,
  Users,
  DollarSign,
  CheckCircle,
  Award,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  //   {
  //     icon: Zap,
  //     title: "Fast Delivery",
  //     description:
  //       "Get your services done quickly and efficiently, saving you time.",
  //     color: "from-yellow-500 to-orange-500",
  //     bgColor: "from-yellow-50 to-orange-50",
  //     stat: "24-48hrs",
  //     statLabel: "Average Delivery",
  //   },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your data and projects are safe with us with 100% confidentiality.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    stat: "100%",
    statLabel: "Data Protected",
  },
  {
    icon: Users,
    title: "Professionals Team",
    description:
      "Professionals with experience in every domain to deliver top-quality work.",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    stat: "50+",
    statLabel: "Expert Professionals",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Top-quality services at fair and transparent prices.",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    stat: "30%",
    statLabel: "Cost Savings",
  },
];

const WhyChooseNexServ = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose NexServ?
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We provide reliable digital and technical services tailored to your
            needs. Here&apos;s why thousands of clients trust us with their projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  isHovered ? "transform -translate-y-2" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Background Gradient (on hover) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-900 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div
                    className={`pt-4 border-t border-gray-200 group-hover:border-transparent transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                        >
                          {feature.stat}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {feature.statLabel}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300`}
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient transition-all duration-300 pointer-events-none`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        {/* <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mb-4 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">500+</p>
              <p className="text-sm text-gray-600 font-medium">
                Projects Completed
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-4 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">300+</p>
              <p className="text-sm text-gray-600 font-medium">Happy Clients</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">4.9/5</p>
              <p className="text-sm text-gray-600 font-medium">Client Rating</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl mb-4 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">98%</p>
              <p className="text-sm text-gray-600 font-medium">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 active:scale-95"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-xl shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 active:scale-95"
            >
              View Our Services
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            ✓ No credit card required • ✓ Free consultation • ✓ 24/7 Support
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseNexServ;
