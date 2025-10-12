import { useTranslation } from "react-i18next";
import AnimatedTitle from "../../components/AnimatedTitle";

const MaintenancePage = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-gray-100 text-gray-800 px-4 text-center overflow-hidden"
    >
      {/* خلفية دوائر */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-200 rounded-full blur-2xl opacity-50 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-md">
        {/* أيقونة الترس */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 text-orangeColor">
            <span className="block text-6xl animate-spin-slow">⚙️</span>
          </div>
        </div>

        <AnimatedTitle title="title" />

        <p className="text-lg mb-6 text-gray-600 leading-relaxed">
          {t("message")}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-orangeColor text-white rounded-xl shadow-md hover:bg-orange-500 hover:shadow-lg transition-all font-medium"
        >
          {t("button")}
        </button>
      </div>

      <footer className="relative z-10 mt-10 text-sm text-gray-500">
        {t("copyright")} © {new Date().getFullYear()} {t("abazeer")}
      </footer>
    </div>
  );
};

export default MaintenancePage;
