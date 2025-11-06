import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppStatusFooter from "@/common/components/app-status/AppStatusFooter";
import AnimatedTitle from "../app-status/components/AnimatedTitle";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/");
  };

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <AnimatedTitle title={`${error.status} - ${error.statusText}`} />
        <p className="text-gray-700 mb-6">
          {error.data?.message || t("Something went wrong.")}
        </p>
        <button
          onClick={handleRetry}
          className="bg-orangeColor text-white px-4 py-2 rounded"
        >
          {t("Retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <AnimatedTitle title={t("Unexpected Error")} />
      <p className="text-gray-700 mb-6">
        {(error as Error)?.message || t("An unknown error occurred.")}
      </p>
      <button
        onClick={handleRetry}
        className="bg-orangeColor text-white px-4 py-2 rounded"
      >
        {t("Retry")}
      </button>
      <AppStatusFooter />
    </div>
  );
};

export default ErrorBoundary;
