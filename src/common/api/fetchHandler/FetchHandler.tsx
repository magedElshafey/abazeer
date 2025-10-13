import Skeleton from "@/common/components/loader/skeltons/Skeleton";
import Loader from "@/common/components/loader/spinner/Loader";
import { useTranslation } from "react-i18next";
import { SkeletonType } from "../../../types/SkeltonType";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

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
  const { isLoading, isError, isSuccess, refetch } = queryResult;
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

      {/* ERROR STATE */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-red-100 border border-red-300 text-red-800 shadow-md my-7">
          <IoAlertCircleOutline className="w-10 h-10 text-red-600" />
          <p className="font-medium text-center">{t("Something went wrong")}</p>
          <button
            onClick={() => refetch?.()}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
          >
            <FiRefreshCcw className="w-4 h-4" />
            {t("Retry")}
          </button>
        </div>
      )}

      {isSuccess && children}
    </>
  );
};

export default FetchHandler;
