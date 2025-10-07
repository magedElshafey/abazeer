import Skeleton from "@/common/components/loader/skeltons/Skeleton";
import Loader from "@/common/components/loader/spinner/Loader";
import { useTranslation } from "react-i18next";
import { SkeletonType } from "../../../types/SkeltonType";
interface FetchHandlerProps {
  children: React.ReactNode;
  queryResult: any;
  skeletonType: SkeletonType;
  loadingType?: "skeleton" | "loader";
}

const FetchHandler: React.FC<FetchHandlerProps> = ({
  children,
  queryResult,
  skeletonType,
  loadingType = "skeleton",
}) => {
  const { isLoading, isError, isSuccess, error } = queryResult;
  const { t } = useTranslation();

  return (
    <>
      {isLoading && (
        <div className="">
          {loadingType === "skeleton" ? (
            <Skeleton type={skeletonType} />
          ) : (
            <Loader />
          )}
        </div>
      )}

      {isError && (
        <div className="w-full bg-red-500 text-white p-4 text-center z-50">
          <p>{t(error?.message || "Something went wrong")}</p>
        </div>
      )}

      {isSuccess && children}
    </>
  );
};

export default FetchHandler;
