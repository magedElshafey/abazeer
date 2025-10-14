import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
const OrderSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className="space-between-sections flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-green-100 text-center p-6"
      role="main"
      aria-labelledby="order-success-title"
    >
      {/* Success Icon */}
      <div
        className="animate-bounce-slow flex items-center justify-center mb-6"
        aria-hidden="true"
      >
        <CheckCircle2 className="text-green-600 animate-scale-up" size={96} />
      </div>

      {/* Title */}
      <h1
        id="order-success-title"
        className="text-2xl md:text-4xl font-semibold text-gray-800 mb-3 animate-fade-in"
      >
        {t("Your request has been completed successfully")} 🎉
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-8 animate-fade-in delay-100">
        {t(
          "Thank you for your trust! You can track your order status from the Orders page, or return to the Home page."
        )}
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 animate-fade-in delay-200"
      >
        <Home size={20} aria-hidden="true" />
        {t("Back to main page")}
      </button>
    </div>
  );
};

export default OrderSuccess;
