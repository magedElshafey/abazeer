import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Nav } from "../../../../../../../types/Nav";
interface FooterLinkListProps {
  title?: string;
  links: Nav[];
}

const FooterLinkList: React.FC<FooterLinkListProps> = ({ title, links }) => {
  const { t } = useTranslation();
  return (
    <nav aria-label={title || "Footer navigation"}>
      {title && (
        <h3 className="font-semibold mb-4 text-md lg:text-lg xl:text-xl">
          {t(title)}
        </h3>
      )}
      <ul>
        {links.map((item) => (
          <li key={item.link} className="mb-2">
            <Link
              to={item.link}
              className="text-transition focus:outline-none focus:ring-2 focus:ring-orangeColor rounded-sm"
            >
              {t(item.name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(FooterLinkList);
