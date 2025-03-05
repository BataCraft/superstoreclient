"use client"
import useReviewStore from "@/Store/ReviewStore";
import { useEffect } from "react";
import CreateReview from "./CreateReviews";

const Reviews = ({ product }) => {
  const { reviews, loadReviews, loading, error } = useReviewStore();

  useEffect(() => {
    if (product?._id) {
      loadReviews(product._id); // Fetch reviews for the product
    }
  }, [product, loadReviews]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

      {/* Show loading indicator */}
      {loading && <p>Loading reviews...</p>}

      {/* Show error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Create new review form */}
      <CreateReview product={product} />

      {/* Display reviews */}
      <div className="space-y-4 mt-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-md shadow-sm">
              <p className="font-semibold">Rating: ⭐ {review.rating}/5</p>
              <p className="text-gray-600">"{review.comment}"</p>
              <p className="text-sm text-gray-400">- {review.user?.name || "Anonymous"}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
