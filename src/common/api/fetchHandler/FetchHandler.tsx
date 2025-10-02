import Skeleton from "../loader/skeltons/Skeleton";
import Loader from "../loader/spinner/Loader";
import { useTranslation } from "react-i18next";
import { SkeletonType } from "../../../types/SkeltonType";
interface FetchHandlerProps {
  children: React.ReactNode;
  queryResult: any;
  skeletonType: SkeletonType;
  loadingType?: "skeleton" | "loader"; // إضافة نوع التحميل (skeleton أو loader)
}

const FetchHandler: React.FC<FetchHandlerProps> = ({
  children,
  queryResult,
  skeletonType,
  loadingType = "skeleton", // الافتراضي هو 'skeleton'
}) => {
  const { isLoading, isError, isSuccess, error } = queryResult;
  const { t } = useTranslation();

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-white">
          {/* عرض Skeleton أو Loader بناءً على loadingType */}
          {loadingType === "skeleton" ? (
            <Skeleton type={skeletonType} />
          ) : (
            <Loader />
          )}
        </div>
      )}

      {/* عرض رسالة الخطأ داخل المكون بدلاً من Popup */}
      {isError && (
        <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-4 text-center z-50">
          <p>{t(error?.message || "Something went wrong")}</p>
        </div>
      )}

      {isSuccess && children}
    </div>
  );
};

export default FetchHandler;
