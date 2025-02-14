import { Star, StarHalf } from "lucide-react";

const StarReview = ({ stars = 0 }) => {
  const ratingStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <Star className="w-5 h-5" fill="currentColor" />
        ) : stars >= number ? (
          <StarHalf className="w-5 h-5" fill="currentColor" />
        ) : (
          <Star className="w-5 h-5" />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {ratingStars}
      <span className="ml-2 text-sm text-gray-500">
        ({stars.toFixed(1)})
      </span>
    </div>
  );
};

export default StarReview;