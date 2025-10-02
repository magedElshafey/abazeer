const FAQSkeleton = () => {
  return (
    <div className="my-6 space-y-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse p-4 bg-white rounded-lg shadow-md space-y-3"
        >
          {/* Question Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />

          {/* Answer Skeleton (simulate expanded FAQ) */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQSkeleton;
