import React from "react";
import { FaImage } from "react-icons/fa";

const SliderSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[350px] md:h-[450px] overflow-hidden relative">
      <div className="absolute top-1/2 left-4 w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
      <div className="absolute top-1/2 right-4 w-10 h-10 bg-gray-300 rounded-full animate-pulse" />

      <div className="w-full h-full flex">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
              <FaImage size={50} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderSkeleton;
