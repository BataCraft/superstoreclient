import React from 'react';

const CardSkeleton = () => {
  // Create an array of 8 items to match the displayed products
  const skeletonItems = Array(8).fill(null);

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mt-2"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-10">
        {skeletonItems.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <div className="space-y-4">
              {/* Image skeleton */}
              <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse"></div>
              
              {/* Category skeleton */}
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mt-8"></div>
              
              {/* Title skeleton */}
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              
              {/* Price skeleton */}
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              {/* Discount badge skeleton */}
              <div className="absolute top-2 right-2 h-6 w-12 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* View More button skeleton */}
      <div className="text-center mt-8">
        <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;