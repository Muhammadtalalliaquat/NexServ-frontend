"use client";

import { createReview } from "../store/features/reviewSlice";
import { useState, useEffect, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

export default function UserFeedBack() {
  const [user, setUser] = useState(null);
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
        <div className="p-5 bg-gray-50 rounded-md shadow-inner mt-4 border border-gray-200">
          <form
            onSubmit={handleAddReview}
            // className="p-5 bg-gray-50 rounded-xl shadow-inner mt-4 border border-gray-200"
          >
            <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Write a Review
            </h4>

            {/* Stars */}
            <div className="flex space-x-1 my-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-all duration-200 ${
                    star <= rating
                      ? "text-yellow-500 scale-110"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>

            <label className="block text-gray-700 text-sm font-medium">
              Comment:
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 mt-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm text-sm"
              placeholder="Write your review here..."
              rows="4"
              required
            />

            {successMsg && (
              <p className="text-green-600 text-sm mt-2">{successMsg}</p>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full sm:w-auto mt-4 bg-blue-600 font-semibold text-white py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm shadow-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
