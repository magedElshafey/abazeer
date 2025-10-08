import { FC } from "react";

const BrandsCardSkeleton: FC = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 md:gap-6 lg:gap-8">
      {[...Array(4)]?.map((_, i) => (
        <article
          key={i}
          className="bg-background-gray shadow-lg pb-3 rounded-xl animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full aspect-[1.56] overflow-hidden rounded-lg bg-gray-200" />

          {/* Text Skeleton */}
          <div className="px-4 mt-5 space-y-3">
            {/* category */}
            <div className="h-4 w-20 bg-gray-200 rounded" />
            {/* name */}
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
          </div>
        </article>
      ))}
    </div>
  );
};

export default BrandsCardSkeleton;
