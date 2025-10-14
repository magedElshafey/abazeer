const FooterSkeleton = () => {
  return (
    <footer className="bg-white shadow-md" role="contentinfo">
      {/* Features Section */}
      <section className="py-4 border-b border-t">
        <div className="containerr">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-2">
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
                {/* Text */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SiteMap Section */}
      <section className="py-4 border-b border-t">
        <div className="containerr">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Logo + Description */}
            <div className="animate-pulse">
              <div className="w-32 h-12 bg-gray-200 rounded mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-4/6" />
              </div>
              <ul className="space-y-3">
                <li className="h-3 bg-gray-200 rounded w-3/4" />
                <li className="h-3 bg-gray-200 rounded w-2/3" />
                <li className="h-3 bg-gray-200 rounded w-4/5" />
              </ul>
            </div>

            {/* Useful Links */}
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
              <ul className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <li key={i} className="h-3 bg-gray-200 rounded w-2/3" />
                ))}
              </ul>
            </div>

            {/* Help Center */}
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
              <ul className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <li key={i} className="h-3 bg-gray-200 rounded w-2/3" />
                ))}
              </ul>
            </div>

            {/* My Account */}
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="h-3 bg-gray-200 rounded w-2/3" />
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 h-12 bg-gray-200 rounded-md" />
                <div className="h-12 w-full sm:w-24 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <div className="py-3 containerr border-t">
        <div className="flex-between flex-wrap gap-3 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;

