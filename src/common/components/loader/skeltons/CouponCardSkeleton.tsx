import React from "react";

const CouponCardSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 ">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="w-full  p-4 border rounded-2xl shadow-sm bg-white animate-pulse space-y-3"
        >
          {/* Title */}
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>

          {/* Description */}
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>

          {/* Input + Button */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-10 bg-gray-200 rounded-lg relative">
              {/* Placeholder bar inside input */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 w-20 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CouponCardSkeleton;
