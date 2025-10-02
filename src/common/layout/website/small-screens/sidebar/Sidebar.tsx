import { IoCloseSharp } from "react-icons/io5";
import { navLinks } from "../../../../../data/data";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import LoginButton from "../navbar/icons/LoginButton";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-[80%] max-w-sm bg-background-light dark:bg-background-dark transform duration-300 overflow-y-auto 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      aria-hidden={!isOpen}
      aria-label="Sidebar Navigation"
    >
      {/* Header */}
      <div className="flex justify-end p-3">
        <button
          aria-label="Close Sidebar"
          onClick={onClose}
          className="text-red-700 hover:scale-110 transition"
        >
          <IoCloseSharp size={28} />
        </button>
      </div>

      {/* Links */}
      <nav>
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

      {/* <div className="p-4">
        <LoginButton />
      </div> */}
    </aside>
  );
};

export default Sidebar;
