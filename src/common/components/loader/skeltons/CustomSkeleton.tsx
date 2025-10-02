import { FaImage } from "react-icons/fa";

const CustomSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-6 lg:gap-8">
      <div className="bg-gray-200 h-60 md:h-80 w-full  rounded-md mb-4 md:mb-0 flex-shrink-0 flex items-center justify-center">
        <FaImage size={50} className=" text-gray-400" />
      </div>

      {/* Text Skeleton */}
      <div className="flex-1 space-y-4 md:ml-6">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-8" />

        {/* Description Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
};

export default CustomSkeleton;
