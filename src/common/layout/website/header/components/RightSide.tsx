import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../../store/AuthProvider";
import { Link } from "react-router-dom";
import us from "../../../../../assets/us.png";
import ksa from "../../../../../assets/ksa.png";
import { useLanguage } from "../../../../../store/LanguageProvider";
import { IoIosArrowDown } from "react-icons/io";
import Border from "../../../../components/border/Border";

type Lang = {
  flag: string;
  title: string;
  label: string;
};

const LANGUAGES: Lang[] = [
  { flag: us, title: "english", label: "en" },
  { flag: ksa, title: "arabic", label: "ar" },
];

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
      key={lang.label}
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
const Divider = () => <Border />;
const RightSide = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

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
  return (
    <div className="flex gap-3 items-center">
      {!user && (
        <>
          <Link to="/auth/login" className="text-transition">
            {t("login")}
          </Link>
          <Divider />
          <Link to="/auth/register" className="text-transition">
            {t("register")}
          </Link>
          <Divider />
        </>
      )}
      {user && (
        <>
          <Link to="/my-profile" className="text-transition">
            {t("my profile")}
          </Link>
          <Divider />
        </>
      )}
      {/* Language Dropdown */}
      {currentLang && (
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Change language"
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

          {/* Dropdown */}
          <div
            className={`absolute top-full left-0 w-[140px] flex flex-col bg-white border rounded-md z-30 shadow-md
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
              <LanguageOption
                key={lang.label}
                lang={lang}
                onClick={handleChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSide;
