import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navLinks } from "../../../../../data/data";
import SidebarIntro from "../mobile-navbar/common/SidebarIntro";
import { memo } from "react";
import Backdrop from "../mobile-navbar/common/Backdrop";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
        aria="close sidebar navigation"
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-[80%] max-w-sm bg-background-light dark:bg-background-dark transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Sidebar Navigation"
      >
        <SidebarIntro onClose={onClose} height="h-24">
          <p className="sr-only">Sidebar header</p>
        </SidebarIntro>

        <nav aria-label="Main Navigation">
          <ul className="flex flex-col gap-4 px-4">
            {navLinks.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  onClick={onClose}
                  to={item.link}
                  className="block text-lg font-medium hover:text-darkBlue transition"
                >
                  {t(item.name)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default memo(Sidebar);
