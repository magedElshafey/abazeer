import React from "react";

const BlogDetailsSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        {/* Image Skeleton */}
        <div className="w-full h-64 lg:h-[400px] bg-gray-300 rounded-2xl"></div>

        {/* Content Skeleton */}
        <div className="flex flex-col justify-center space-y-4">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>

          {/* Description lines */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded-md w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-11/12"></div>
            <div className="h-4 bg-gray-300 rounded-md w-10/12"></div>
            <div className="h-4 bg-gray-300 rounded-md w-9/12"></div>
          </div>

          {/* Created At */}
          <div className="h-4 bg-gray-300 rounded-md w-1/3 mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
