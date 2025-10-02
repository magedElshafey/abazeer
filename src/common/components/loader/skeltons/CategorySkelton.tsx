import { FaImage } from "react-icons/fa";

const CategorySkeleton = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
      {[...Array(4)]?.map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex flex-col items-center justify-center"
        >
          {/* category image */}
          <div className="bg-gray-200 h-32 w-32 rounded-full mb-4 flex items-center justify-center">
            <FaImage size={30} className=" text-gray-400" />
          </div>

          {/* category name */}
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
