import { FaImage } from "react-icons/fa";

const ProductDetailsSkeleton = () => {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Column (Image & Thumbnails) */}
      <div className="animate-pulse space-y-4">
        {/* Main Product Image */}
        <div className="bg-gray-200 h-80 w-full rounded-lg mb-4 flex items-center justify-center">
          <FaImage size={50} className=" text-gray-400" />
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center space-x-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-16 w-16 rounded-md flex items-center justify-center"
            >
              <FaImage size={20} className=" text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Second Column (Product Details) */}
      <div className="animate-pulse space-y-6">
        {/* Product Category */}
        <div className="h-4 bg-gray-200 rounded w-1/4" />

        {/* Product Name */}
        <div className="h-6 bg-gray-200 rounded w-2/3" />

        {/* Product Price */}
        <div className="h-6 bg-gray-200 rounded w-1/2" />

        {/* Product Ratings */}
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

        {/* Product Description Section */}
        <div className="space-y-4">
          {/* Type */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />

          {/* Brand */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />

          {/* Size Options */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />

          {/* Color Options */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Add to Cart Button */}
        <div className="h-10 bg-gray-200 rounded-lg cursor-pointer w-1/2"></div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
