import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedTitle from "../../components/AnimatedTitle";
import AppStatusFooter from "@/common/components/app-status/AppStatusFooter";

const NotFound = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-gray-100 text-gray-800 px-6 text-center overflow-hidden"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 left-0 w-60 h-60 bg-orange-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 rounded-full blur-2xl opacity-40 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-md flex flex-col items-center">
        {/* أيقونة العدسة المكسورة (SVG بدل lucide-react) */}
        <div className="flex justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-orangeColor animate-float"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.1-5.4A6.75 6.75 0 1110.75 4.5a6.75 6.75 0 017.05 6.75z"
            />
            <line
              x1="13"
              y1="13"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <AnimatedTitle title="404" />

        <p className="mt-3 text-lg text-gray-600 leading-relaxed">
          {t("Oops! The page you are looking for doesn’t exist.")}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 rounded-xl bg-orangeColor text-white font-medium shadow-md hover:bg-orange-500 hover:shadow-lg transition-all"
        >
          {t("Back to Home")}
        </Link>
      </div>

      <AppStatusFooter />
    </div>
  );
};

export default NotFound;
