const ServiceCardSkeleton = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {[...Array(4)]?.map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 space-y-4 animate-pulse"
        >
          {/* صورة الخدمة */}
          <div className="w-full h-40 bg-gray-300 rounded-md" />

          {/* اسم الخدمة */}
          <div className="h-5 w-2/3 bg-gray-200 rounded" />

          {/* وصف بسيط */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
          </div>

          {/* زر read more */}
          <div className="h-9 w-28 bg-gray-300 rounded-full mt-2" />
        </div>
      ))}
    </div>
  );
};

export default ServiceCardSkeleton;
