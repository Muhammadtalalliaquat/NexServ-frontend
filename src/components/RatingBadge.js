import { Star } from "lucide-react";

export default function RatingBadge({
  rating = 0,
  showProgress = true,
  variant = "default",
}) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const rounded = Number(rating).toFixed(1);
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  const variants = {
    default: {
      container:
        "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200",
      text: "text-gray-900",
      star: "text-amber-400",
      starEmpty: "text-gray-200",
      progress: "bg-gradient-to-r from-amber-400 to-orange-400",
      progressBg: "bg-gray-200",
      glow: "shadow-lg shadow-amber-500/20",
    },
    glass: {
      container: "bg-white/10 backdrop-blur-md border border-white/20",
      text: "text-white",
      star: "text-yellow-300",
      starEmpty: "text-white/20",
      progress: "bg-gradient-to-r from-yellow-300 to-amber-300",
      progressBg: "bg-white/20",
      glow: "shadow-xl shadow-purple-500/20",
    },
    dark: {
      container:
        "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700",
      text: "text-white",
      star: "text-amber-400",
      starEmpty: "text-gray-600",
      progress: "bg-gradient-to-r from-amber-400 to-yellow-500",
      progressBg: "bg-gray-700",
      glow: "shadow-2xl shadow-amber-500/30",
    },
  };

  const style = variants[variant] || variants.default;

  return (
    <div
      className={`inline-flex items-center flex-wrap gap-4 px-6 py-4 rounded-2xl ${style.container} ${style.glow} transition-all duration-300 hover:scale-105`}
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => {
          const isFull = i <= fullStars;
          const isHalf = i === fullStars + 1 && hasHalf;

          return (
            <div key={i} className="relative w-6 h-6">
              <Star
                className={`w-6 h-6 ${style.starEmpty} transition-all duration-300`}
                fill="currentColor"
              />

              {(isFull || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  <Star
                    className={`w-6 h-6 ${style.star} transition-all duration-300 drop-shadow-lg`}
                    fill="currentColor"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-start">
        <div className={`text-2xl font-bold ${style.text} leading-none`}>
          {rounded}
        </div>
        <div className={`text-xs ${style.text} opacity-60 mt-0.5`}>
          out of 5
        </div>
      </div>

      {/* Optional progress bar */}
      {showProgress && (
        <div className="flex flex-col gap-1.5 ml-2">
          <div
            className={`h-2 w-24 ${style.progressBg} rounded-full overflow-hidden`}
          >
            <div
              className={`h-full ${style.progress} rounded-full transition-all duration-500 ease-out shadow-lg`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className={`text-xs ${style.text} opacity-60 text-center`}>
            {Math.round(pct)}% satisfaction
          </div>
        </div>
      )}
    </div>
  );
}
