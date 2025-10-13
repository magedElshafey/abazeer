const OrderCardSkeleton: React.FC = () => {
  return (
    <article
      className="w-full bg-white shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row gap-5 animate-pulse"
      aria-busy="true"
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
        <div className="w-full h-full rounded-xl bg-gray-200 border border-gray-100"></div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow gap-2">
        {/* Product Name */}
        <div className="w-40 h-4 bg-gray-200 rounded-md"></div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-4 h-4 bg-gray-200 rounded-sm"
              aria-hidden="true"
            ></div>
          ))}
          <div className="w-8 h-3 bg-gray-200 rounded-md ml-1"></div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-200 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex flex-col justify-between items-end text-right w-full sm:w-auto">
        <div className="w-10 h-3 bg-gray-200 rounded-md mb-1"></div>
        <div className="w-16 h-4 bg-gray-200 rounded-md"></div>

        <div className="h-[1px] bg-gray-200 my-2 w-full sm:w-20"></div>

        <div className="w-10 h-3 bg-gray-200 rounded-md mb-1"></div>
        <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
      </div>
    </article>
  );
};

export default OrderCardSkeleton;
