const ListSkeleton = () => {
  return (
    <div className="my-5 space-y-3">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex items-center gap-2 py-2 px-2"
        >
          {/* Text line skeleton */}
          <div className="h-4 bg-gray-200 rounded flex-1" />
          
          {/* Optional icon/button skeleton on the right */}
          <div className="h-4 w-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;

