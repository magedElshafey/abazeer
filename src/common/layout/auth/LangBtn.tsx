import us from "../../../assets/us.png";
import ksa from "../../../assets/ksa.png";
import { useLanguage } from "../../../store/LanguageProvider";
import { useTranslation } from "react-i18next";
const LangBtn = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  return (
    <button
      onClick={() => changeLanguage(language === "ar" ? "en" : "ar")}
      className={`fixed bottom-6  flex-center gap-2 p-2 rounded-md  bg-orangeColor ${
        language === "ar" ? "left-6" : "right-6"
      }`}
    >
      <img
        alt={t(language === "ar" ? "english" : "arabic")}
        src={language === "ar" ? us : ksa}
        className="w-5 h-5 object-contain"
      />
      <span>{t(language === "ar" ? "english" : "arabic")}</span>
    </button>
  );
};

export default LangBtn;
