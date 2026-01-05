import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function UserFeedBack({ reviewData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  const totalSlides = Math.ceil(reviewData.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalSlides - 1));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="relative z-10 overflow-visible min-h-screen w-full py-24 px-4 md:px-10 bg-gradient-to-b from-slate-900 via-purple-900/100 to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm mb-6">
              <Star className="w-4 h-4 fill-purple-300" />
              <span>Testimonials</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                {" "}
                Clients Say
              </span>
            </h2>
            <p className="text-gray-300 text-lg">
              Don&apos;t just take our word for it—hear from the businesses
              we&apos;ve helped transform
            </p>
          </div>

          {/* Reviews carousel */}
          <div className="w-full max-w-6xl mx-auto relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviewData.map((review) => (
                  <div
                    key={review._id}
                    className={`flex-shrink-0 w-full ${
                      itemsPerSlide === 2 ? "md:w-1/2" : "md:w-full"
                    } p-4`}
                  >
                    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] h-full">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        {/* Quote icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Quote className="w-6 h-6 text-white" />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-600"
                              } transition-all duration-300`}
                            />
                          ))}
                        </div>

                        {/* Review text */}
                        <p className="text-gray-200 text-base leading-relaxed mb-6">
                          &quot;{review.comment}&quot;
                        </p>

                        {/* Author info */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div>
                            <h3 className="text-white font-semibold text-lg">
                              {review.author?.userName || "Anonymous"}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>

                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {review.author?.userName?.[0] || "?"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={prevSlide}
                className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 hover:scale-110"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-gradient-to-r from-pink-500 to-purple-600"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 hover:scale-110"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats bar */}
          {/* <div className="mt-16 max-w-4xl mx-auto grid grid-cols-3 gap-8">
            {[
              { label: "Happy Clients", value: "200+" },
              { label: "Projects Done", value: "350+" },
              { label: "Satisfaction", value: "4.9/5" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
}
