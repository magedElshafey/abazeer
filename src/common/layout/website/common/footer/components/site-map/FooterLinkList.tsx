import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Nav } from "../../../../../../../types/Nav";
import { Static } from "@/features/static-pages/types/static.type";

interface FooterLinkListProps {
  title?: string;
  links: Nav[] | Static[];
}

const FooterLinkList: React.FC<FooterLinkListProps> = ({ title, links }) => {
  const { t } = useTranslation();

  const normalizedLinks = links.map((item: any) => {
    if ("slug" in item) {
      return {
        name: item.name,
        link: `static/${item.slug}`,
      };
    }
    return {
      name: item.name,
      link: item.link,
    };
  });

  return (
    <nav aria-label={title || "Footer navigation"}>
      {title && (
        <h3 className="font-semibold mb-4 text-md lg:text-lg xl:text-xl">
          {t(title)}
        </h3>
      )}
      <ul>
        {normalizedLinks.map((item) => (
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
