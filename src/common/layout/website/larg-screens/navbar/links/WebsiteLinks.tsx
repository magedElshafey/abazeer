import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navLinks } from "../../../../../../data/data";
const WebsiteLinks = () => {
  const { t } = useTranslation();
  return (
    <nav className="hidden md:flex items-center gap-x-3 2xl:gap-x-4 whitespace-nowrap">
      {navLinks?.map((item, index) => (
        <NavLink key={index} className="text-transition" to={item?.link}>
          {t(item?.name)}
        </NavLink>
      ))}
    </nav>
  );
};

export default WebsiteLinks;
