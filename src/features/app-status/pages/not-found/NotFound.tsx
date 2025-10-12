import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedTitle from "../../components/AnimatedTitle";
const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-white px-6">
      <div className="text-center">
        <SearchX className="mx-auto h-12 w-12 text-gray-500" />
        <AnimatedTitle title="404" />
        <p className="mt-4 text-lg text-gray-600">
          {t("Oops! The page you are looking for doesn’t exist.")}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 rounded-xl bg-orangeColor text-white font-medium hover:bg-orange-400 transition"
        >
          {t("Back to Home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
