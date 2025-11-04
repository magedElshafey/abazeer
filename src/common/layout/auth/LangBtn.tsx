import { useLanguage } from "../../../store/LanguageProvider";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../data/data";
import { useMemo } from "react";

const LangBtn = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  // Get current language and other available languages (same pattern as Navbar)
  const { currentLang, otherLangs } = useMemo(() => {
    const current = LANGUAGES.find((l) => l.label === language)!;
    const others = LANGUAGES.filter((l) => l.label !== language);
    return { currentLang: current, otherLangs: others };
  }, [language]);

  // Get the language to switch to (the first available alternative)
  const nextLang = otherLangs[0];

  if (!currentLang || !nextLang) return null;

  const handleLanguageChange = () => {
    // Use the same changeLanguage pattern as Navbar
    changeLanguage(nextLang.label);
  };

  return (
    <button
      onClick={handleLanguageChange}
      className={`fixed bottom-6 z-50 flex-center gap-2 p-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-gray-200 transition-all ${
        language === "ar" ? "left-6" : "right-6"
      }`}
      aria-label={`Change language to ${t(nextLang.title)}`}
    >
      <img
        alt={t(nextLang.title)}
        src={nextLang.flag}
        className="w-5 h-5 object-contain"
      />
      <span>{t(nextLang.title)}</span>
    </button>
  );
};

export default LangBtn;
