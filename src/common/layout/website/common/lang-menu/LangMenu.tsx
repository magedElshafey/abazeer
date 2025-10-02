import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../../../store/LanguageProvider";
import { IoIosArrowDown } from "react-icons/io";
import { LANGUAGES } from "../../../../../data/data";
import type { Lang } from "../../../../../types/Lang";
const LanguageOption = ({
  lang,
  onClick,
}: {
  lang: Lang;
  onClick: (label: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => onClick(lang.label)}
      className="flex-center gap-2 p-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
      role="menuitem"
    >
      <span>{t(lang.title)}</span>
      <img
        alt={lang.title}
        src={lang.flag}
        className="w-7 h-7 object-contain"
      />
    </button>
  );
};

// ✅ Hook لتحديد حجم الشاشة
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMobile;
};

const LanguageDropdown = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const { currentLang, otherLangs } = useMemo(() => {
    const current = LANGUAGES.find((l) => l.label === language)!;
    const others = LANGUAGES.filter((l) => l.label !== language);
    return { currentLang: current, otherLangs: others };
  }, [language]);

  const handleChange = useCallback(
    (label: string) => {
      changeLanguage(label);
      setOpen(false);
    },
    [changeLanguage]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!currentLang) return null;

  return (
    <div
      className="relative"
      {...(!isMobile && {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      })}
    >
      <button
        className="flex items-center gap-2 group cursor-pointer focus:outline-none w-full md:w-auto"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => isMobile && setOpen((prev) => !prev)}
      >
        <span className="transition duration-200 group-hover:text-orangeColor">
          {t(currentLang.title)}
        </span>
        <img
          alt={currentLang.title}
          src={currentLang.flag}
          className="w-7 h-7 object-contain"
        />
        <IoIosArrowDown
          size={15}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute md:top-full md:left-0 md:w-[140px] w-full flex flex-col bg-white border rounded-md z-30 shadow-md
          transition-all duration-300 ease-in-out
          ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        role="menu"
        aria-hidden={!open}
      >
        {otherLangs.map((lang) => (
          <LanguageOption key={lang.label} lang={lang} onClick={handleChange} />
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
