import { useState } from "react";
import useReviewStore from "@/Store/ReviewStore";

import { Star } from "lucide-react";
import { usePathname } from "next/navigation";

const CreateReview = () => {
  const pathname = usePathname(); // Use pathname from Next.js App router
  
  const { addReview, loading, error } = useReviewStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract the product ID from the pathname (assuming /product/[id])
  const productId = pathname.split("/")[2];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty rating or comment
    if (!rating || !comment) {
      setFormError("Please provide a rating and a comment.");
      return;
    }

    // Reset the form error state
    setFormError("");

    // Send the review to the server using the review store
    try {
      await addReview({ productId, rating: Number(rating), comment });
      setIsSubmitted(true);
      setTimeout(() => {
        setRating(5);
        setComment("");
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting review:", err.message);
      setFormError("Failed to submit your review. Please try again.");
    }
  };

  // Star rating component
  const StarRating = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              size={28}
              className={`${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              } cursor-pointer transition-colors duration-150`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Write a Review</h1>
      <p className="text-gray-600 mb-6">Share your experience with this product</p>

      {formError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {formError}
        </div>
      )}

      {isSubmitted && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
          Your review has been submitted successfully. Thank you!
        </div>
      )}

      

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you rate this product?
          </label>
          <StarRating />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience with this product..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 min-h-32"
          />
          <p className="mt-2 text-sm text-gray-500">
            {comment.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
