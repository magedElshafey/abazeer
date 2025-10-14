const NavbarSkeleton = () => {
  return (
    <>
      {/* Header Skeleton */}
      <div className="hidden md:block bg-background-gray py-2 border-b">
        <div className="containerr flex-between">
          <div className="flex gap-3 items-center animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-20" />
            ))}
          </div>
          <div className="flex gap-3 items-center animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-16" />
            ))}
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>

      {/* Main Navbar Skeleton */}
      <header className="hidden md:block bg-white shadow-sm py-6 border-b">
        <div className="containerr flex-between gap-4 xl:gap-6">
          {/* Logo Skeleton */}
          <div className="animate-pulse">
            <div className="w-32 h-12 bg-gray-200 rounded" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="flex-1 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md" />
          </div>

          {/* Hotline Skeleton */}
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>

          {/* Nav Icons Skeleton */}
          <div className="animate-pulse flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </header>

      {/* Categories Header Skeleton */}
      <div className="hidden md:block bg-white shadow-sm py-4">
        <div className="containerr flex items-center gap-4">
          {/* All Categories Button Skeleton */}
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md w-40" />
          </div>

          {/* Website Links Skeleton */}
          <div className="flex-1 animate-pulse flex items-center gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-20" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarSkeleton;

