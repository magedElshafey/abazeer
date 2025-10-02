const HeroSkeleton = () => {
  return (
    <div className="w-full h-[70vh] bg-gray-100 relative overflow-hidden animate-pulse">
      {/* صورة الخلفية كـ placeholder */}
      <div className="absolute inset-0 bg-gray-300" />

      {/* محتوى التايتل والوصف */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 sm:px-16 space-y-4">
        {/* Title */}
        <div className="h-8 w-1/2 bg-gray-200 rounded" />
        <div className="h-8 w-1/3 bg-gray-200 rounded" />

        {/* Description */}
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default HeroSkeleton;
