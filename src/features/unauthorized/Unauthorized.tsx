import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
const Unauthorized = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <ShieldAlert className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="mt-6 text-4xl font-bold text-gray-800">
          {t("Unauthorized Access")}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {t("Sorry, you don’t have permission to view this page.")}
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            {t("Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
