const EditProfileSkeleton = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse space-y-6">
      {/* صورة البروفايل */}
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-gray-200" />
      </div>

      {/* الاسم */}
      <div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>

      {/* البريد الإلكتروني */}
      <div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>

      {/* كلمة المرور الحالية */}
      <div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>

      {/* كلمة المرور الجديدة */}
      <div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>

      {/* زر حفظ التعديلات */}
      <div className="h-10 w-1/2 bg-gray-300 rounded mx-auto" />
    </div>
  );
};

export default EditProfileSkeleton;
