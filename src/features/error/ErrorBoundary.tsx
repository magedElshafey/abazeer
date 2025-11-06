import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppStatusFooter from "@/common/components/app-status/AppStatusFooter";
import AnimatedTitle from "../app-status/components/AnimatedTitle";
const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();
  if (isRouteErrorResponse(error)) {
    // Errors from loaders/actions (404, 500, etc)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <AnimatedTitle title={`${error.status} - ${error.statusText}`} />
        <p className="text-gray-700 mb-6">
          {error.data?.message || "Something went wrong."}
        </p>
        <Link to="/" className="bg-orangeColor text-white px-4 py-2 rounded ">
          {t("Back to Home")}
        </Link>
      </div>
    );
  }

  // Fallback for unexpected runtime errors
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <AnimatedTitle title={t("Unexpected Error")} />
      <p className="text-gray-700 mb-6">
        {(error as Error)?.message || "An unknown error occurred."}
      </p>
      <Link to="/" className="bg-orangeColor text-white px-4 py-2 rounded ">
        {t("Back to Home")}
      </Link>
      <AppStatusFooter />
    </div>
  );
};

export default ErrorBoundary;
