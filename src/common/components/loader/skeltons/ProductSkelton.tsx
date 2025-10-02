import React from "react";
import { FaImage } from "react-icons/fa";

const ProductSkelton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 my-4 md:my-6 lg:my-8">
      {[...Array(4)]?.map((_, i) => (
        <div
          key={i}
          className="animate-pulse p-4 rounded-lg shadow bg-white w-full max-w-sm"
        >
          {/* img */}
          <div className="bg-gray-200 h-48 w-full rounded-md mb-4 flex items-center justify-center">
            <FaImage size={50} className=" text-gray-400" />
          </div>

          {/* name */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

          {/*  desc */}
          <div className="h-3 bg-gray-200 rounded w-full mb-1" />
          <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />

          {/* reviews */}
          <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-gray-200 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.212 3.726a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.157 2.292a1 1 0 00-.364 1.118l1.212 3.725c.3.922-.755 1.688-1.54 1.118l-3.157-2.292a1 1 0 00-1.176 0l-3.157 2.292c-.784.57-1.838-.196-1.539-1.118l1.211-3.725a1 1 0 00-.364-1.118L2.297 9.153c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.951-.69l1.212-3.726z" />
              </svg>
            ))}
          </div>

          {/*add to cart btn*/}
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkelton;
