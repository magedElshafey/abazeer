const BlogSkelton = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {[...Array(4)]?.map((_, i) => (
        <div
          key={i}
          className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-4 space-y-4 animate-pulse"
        >
          {/* صورة المقالة */}
          <div className="w-full h-48 bg-gray-200 rounded-md" />

          {/* عنوان المقالة */}
          <div className="h-6 bg-gray-200 rounded-md w-3/4" />

          {/* وصف بسيط */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded-md w-5/6" />
          </div>

          {/* معلومات النشر */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded-md w-1/3" />
            <div className="h-4 bg-gray-200 rounded-md w-1/4" />
          </div>

          {/* زر Read More */}
          <div className="h-10 bg-gray-300 rounded-md w-32 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default BlogSkelton;
