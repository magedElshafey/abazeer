import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import DialogComponent from "@/common/components/dialog/dialog";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";

interface DeleteReviewButtonProps {
  reviewId: number;
  queryKey?: string[];
  variant?: "default" | "simple";
  className?: string;
}

const DeleteReviewButton: FC<DeleteReviewButtonProps> = ({ 
  reviewId, 
  queryKey = [apiRoutes.myReviews],
  variant = "default",
  className = ""
}) => {
  const { t } = useTranslation();

  const handleDeleteReview = async () => {
    const response = await Axios.delete(`${apiRoutes.reviews}/${reviewId}`);
    return response;
  };

  const defaultButton = (
    <button
      className={`flex items-center gap-1 px-2 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 ${className}`}
      aria-label={t("remove")}
    >
      <MdDelete size={18} />
      <span className="text-sm font-medium">{t("remove")}</span>
    </button>
  );

  const simpleButton = (
    <button
      className={`px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={t("delete")}
    >
      {t("delete")}
    </button>
  );

  return (
    <DialogComponent
      header={{
        title: "delete_review",
      }}
      content={
        <div className="py-4 space-y-3">
          <p className="text-gray-700">
            {t("delete_review_confirmation")}
          </p>
          <p className="text-sm text-gray-600">
            {t("This action cannot be undone.")}
          </p>
        </div>
      }
      action={{
        action: handleDeleteReview,
        text: "remove",
      }}
      cancel={{
        text: "Cancel",
      }}
      queryKey={queryKey}
      type="danger"
    >
      {variant === "simple" ? simpleButton : defaultButton}
    </DialogComponent>
  );
};

export default DeleteReviewButton;
