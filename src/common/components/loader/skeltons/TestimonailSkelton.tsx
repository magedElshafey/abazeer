import React from "react";

const TestimonialsCardSkeleton: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between h-full min-h-[220px] bg-white shadow-sm animate-pulse">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0" />

        <div className="flex flex-col flex-1 gap-2 mt-2 md:mt-0">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>

      {/* Quote text */}
      <div className="mt-3 space-y-2 text-center">
        <div className="h-3 bg-gray-200 rounded w-11/12 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-10/12 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-8/12 mx-auto" />
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-end mt-3 pt-2 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
};

export default TestimonialsCardSkeleton;
