import { FaImage } from "react-icons/fa";

const FullImageSkeleton = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
      {[...Array(6)]?.map((_, i) => (
        <div
          key={i}
          className="h-48 shadow  overflow-hidden bg-gray-200  animate-pulse flex items-center justify-center"
        >
          <FaImage className="text-gray-400 " size={50} />
        </div>
      ))}
    </div>
  );
};

export default FullImageSkeleton;
