import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-center">
        <SearchX className="mx-auto h-24 w-24 text-gray-500" />
        <h1 className="mt-6 text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          {t("Oops! The page you are looking for doesn’t exist.")}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          {t("Back to Home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
