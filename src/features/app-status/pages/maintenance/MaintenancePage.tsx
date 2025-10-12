import { useTranslation } from "react-i18next";
import AnimatedTitle from "../../components/AnimatedTitle";

const MaintenancePage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 text-center"
    >
      <div className="max-w-md">
        <AnimatedTitle title="title" />
        <p className="text-lg mb-6">{t("message")}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-orangeColor text-white rounded-xl hover:bg-orange-400 transition-all"
        >
          {t("button")}
        </button>
      </div>
      <footer className="mt-10 text-sm text-gray-500">
        {t("copyright")} © {new Date().getFullYear()} {t("abazeer")}
      </footer>
    </div>
  );
};

export default MaintenancePage;
