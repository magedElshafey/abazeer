import { useNavigate } from "react-router-dom";
import { XCircle, Home, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/common/components/seo/Seo";

const OrderFailed = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <SEO title="The order could not be completed" />
      <div
        className="space-between-sections flex flex-col justify-center items-center bg-gradient-to-br from-red-50 via-white to-red-100 text-center p-6"
        role="main"
        aria-labelledby="order-failed-title"
      >
        {/* Failed Icon */}
        <div
          className="animate-bounce-slow flex items-center justify-center mb-6"
          aria-hidden="true"
        >
          <XCircle className="text-red-600 animate-scale-up" size={96} />
        </div>

        {/* Title */}
        <h1
          id="order-failed-title"
          className="text-2xl md:text-4xl font-semibold text-gray-800 mb-3 animate-fade-in"
        >
          {t("The order could not be completed")} 😞
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-md mb-8 animate-fade-in delay-100">
          {t(
            "Something went wrong while processing your order. Please try again or contact support if the issue persists."
          )}
        </p>

        {/* Buttons Group */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in delay-200">
          {/* Retry Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
          >
            <RotateCcw size={20} aria-hidden="true" />
            {t("Try Again")}
          </button>

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
          >
            <Home size={20} aria-hidden="true" />
            {t("Back to main page")}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderFailed;
