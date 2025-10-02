import { useAuth } from "../../../../../store/AuthProvider";
import { useTranslation } from "react-i18next";
import { sidebarLinks } from "../../../../../data/data";
import SidebarIntro from "../mobile-navbar/common/SidebarIntro";
import { memo } from "react";
import Backdrop from "../mobile-navbar/common/Backdrop";
import { Link } from "react-router-dom";
import LanguageDropdown from "../../common/lang-menu/LangMenu";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
        aria="close sidebar navigation"
      />
      <aside
        className={`fixed top-0 right-0 h-screen overflow-y-auto w-[85%] bg-white shadow-md border z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Sidebar Navigation"
      >
        <SidebarIntro onClose={onClose} height="h-24">
          <div className="flex-center">
            <p className="text-white text-xl font-bold">{t("useful links")}</p>
          </div>
        </SidebarIntro>

        <nav aria-label="Main Navigation" className="mt-2">
          <ul className="flex flex-col">
            {sidebarLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  onClick={onClose}
                  to={item.link}
                  className="block text-lg font-medium text-transition py-2 border-b ms-2"
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                onClick={onClose}
                to="/compare"
                className="block text-lg font-medium text-transition py-2 border-b ms-2"
              >
                {t("compare")}
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link
                    onClick={onClose}
                    to="/auth/login"
                    className="block text-lg font-medium text-transition py-2 border-b ms-2"
                  >
                    {t("login")}
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={onClose}
                    to="/auth/register"
                    className="block text-lg font-medium text-transition py-2 border-b ms-2"
                  >
                    {t("register")}
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link
                  onClick={onClose}
                  to="/my-profile"
                  className="block text-lg font-medium text-transition py-2 border-b ms-2"
                >
                  {t("my profile")}
                </Link>
              </li>
            )}
            <li className="py-2 border-b ms-2">
              <LanguageDropdown />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default memo(Sidebar);
