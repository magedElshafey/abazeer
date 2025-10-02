import { FaPlus, FaMinus, FaImage } from "react-icons/fa6";

const CartTableSkeleton = () => {
  return (
    <div className="w-full animate-pulse text-center">
      {/* Header only for large screens */}
      <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-100 p-3 rounded-md mb-4">
        <div>Product</div>
        <div>Name</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Remove</div>
      </div>

      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="grid md:grid-cols-6 grid-cols-1 gap-4 bg-white p-4 mb-4 rounded-lg shadow-sm"
        >
          {/* Product Image */}
          <div className="flex justify-center ">
            <div className="h-44 md:h-20 w-full md:w-20 bg-gray-200 rounded-md flex items-center justify-center">
              <FaImage size={20} className=" text-gray-400" />
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col justify-center">
            <div className="h-4 w-full md:w-32 bg-gray-200 rounded mb-2 mx-auto" />
            <div className="h-4 w-3/4 md:w-24 bg-gray-200 rounded mb-2 mx-auto" />
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 justify-center">
            <div className="h-8 w-8 bg-gray-300 rounded flex items-center justify-center">
              <FaMinus size={18} />
            </div>

            <div className="h-4 w-6 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-300 rounded flex items-center justify-center">
              <FaPlus size={18} />
            </div>
          </div>

          {/* Price */}
          <div className="flex justify-center items-center">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Remove Button */}
          <div className="flex justify-center items-center">
            <div className="h-8 w-28 bg-red-300 flex items-center justify-center rounded-md">
              delete
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartTableSkeleton;
