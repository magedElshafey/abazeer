const FeatureSkeltion = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {[...Array(4)]?.map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md animate-pulse"
        >
          {/* أيقونة */}
          <div className="w-12 h-12 bg-gray-200 rounded-full" />

          {/* وصف الـ feature */}
          <div className="w-full h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default FeatureSkeltion;
