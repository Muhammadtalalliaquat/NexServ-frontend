"use client";

import { createReview } from "../store/features/reviewSlice";
import { useState, useEffect, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaStar } from "react-icons/fa";
import {
  Star,
  MessageCircle,
  Send,
} from "lucide-react";

export default function UserFeedBack() {
  const [user, setUser] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { loading, successMsg } = useSelector((state) => state.review);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    startTransition(() => {
      setUser(storedUser);
    });
  }, []);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const renderStars = (count, interactive = false, size = 24) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`transition-all duration-200 ${
              interactive ? "cursor-pointer" : ""
            } ${
              star <= (interactive ? hoverRating || rating : count)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${
              interactive && star <= (hoverRating || rating) ? "scale-110" : ""
            }`}
            onClick={interactive ? () => handleStarClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!rating) {
      setError("Please add a review rating");
      return;
    }

    const reviewData = {
      rating,
      comment,
    };

    dispatch(createReview(reviewData))
      .unwrap()
      .then(() => {
        setRating(0);
        setComment("");
      })
      .catch((err) => {
        console.error("Error adding review:", err);
        setError("Failed to add review. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      {user && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Write a Review
            </h3>
          </div>

          <form onSubmit={handleAddReview} className="p-6">
            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {renderStars(rating, true, 32)}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    ({rating} {rating === 1 ? "star" : "stars"})
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-sm resize-none"
                placeholder="Share your experience with our service..."
                rows="5"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {comment.length} characters
                </span>
                {comment.length > 0 && (
                  <span
                    className={`text-xs font-medium ${comment.length >= 20 ? "text-green-600" : "text-orange-500"}`}
                  >
                    {comment.length >= 20 ? "✓ Great!" : "Add more details"}
                  </span>
                )}
              </div>
            </div>

            {/* Success/Error Messages */}
            {successMsg && (
              <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl flex items-center gap-3 animate-slideDown">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-green-800 font-semibold text-sm">
                  {successMsg}
                </span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">!</span>
                </div>
                <span className="text-red-800 font-semibold text-sm">
                  {error}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 text-sm"
              disabled={loading || rating === 0}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>
        // <div className="p-5 bg-gray-50 rounded-md shadow-inner mt-4 border border-gray-200">
        //   <form
        //     onSubmit={handleAddReview}
        //     // className="p-5 bg-gray-50 rounded-xl shadow-inner mt-4 border border-gray-200"
        //   >
        //     <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
        //       Write a Review
        //     </h4>

        //     {/* Stars */}
        //     <div className="flex space-x-1 my-3">
        //       {[1, 2, 3, 4, 5].map((star) => (
        //         <FaStar
        //           key={star}
        //           size={24}
        //           className={`cursor-pointer transition-all duration-200 ${
        //             star <= rating
        //               ? "text-yellow-500 scale-110"
        //               : "text-gray-300"
        //           }`}
        //           onClick={() => handleStarClick(star)}
        //         />
        //       ))}
        //     </div>

        //     <label className="block text-gray-700 text-sm font-medium">
        //       Comment:
        //     </label>

        //     <textarea
        //       value={comment}
        //       onChange={(e) => setComment(e.target.value)}
        //       className="w-full px-4 py-3 mt-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-sm"
        //       placeholder="Write your review here..."
        //       rows="4"
        //       required
        //     />

        //     {successMsg && (
        //       <p className="text-green-600 text-sm mt-2">{successMsg}</p>
        //     )}

        //     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        //     <button
        //       type="submit"
        //       className="w-full sm:w-auto mt-4 bg-blue-600 font-semibold text-white py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm shadow-md"
        //       disabled={loading}
        //     >
        //       {loading ? "Submitting..." : "Submit Review"}
        //     </button>
        //   </form>
        // </div>
      )}
    </>
  );
}
