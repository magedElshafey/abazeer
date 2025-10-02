import { memo } from "react";
import type { Socials } from "../../../../../../../types/Socials";
interface SocialLinksProps {
  socials: Socials[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socials }) => {
  return (
    <nav aria-label="Social media links">
      <ul className="flex items-center gap-3">
        {socials.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${item.icon.name} page`}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-full text-transition"
            >
              <item.icon size={20} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(SocialLinks);
