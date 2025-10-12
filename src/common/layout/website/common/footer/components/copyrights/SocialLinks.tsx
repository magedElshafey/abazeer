import { memo, useMemo } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { SocialProps } from "./CopyRight";

const ICONS = {
  facebook: {
    Icon: FaFacebook,
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  twitter: { Icon: FaXTwitter, label: "Twitter", color: "hover:text-sky-500" },
  instagram: {
    Icon: FaInstagram,
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  whatsapp: {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    color: "hover:text-green-500",
  },
};

const SocialLinks: React.FC<SocialProps> = ({
  social_facebook,
  social_twitter,
  social_instagram,
  phone,
}) => {
  const links = useMemo(() => {
    return [
      social_facebook && { type: "facebook", href: social_facebook },
      social_twitter && { type: "twitter", href: social_twitter },
      social_instagram && { type: "instagram", href: social_instagram },
      phone && { type: "whatsapp", href: `https://wa.me/${phone}` },
    ].filter(Boolean) as { type: keyof typeof ICONS; href: string }[];
  }, [social_facebook, social_twitter, social_instagram, phone]);

  if (!links.length) return null;

  return (
    <nav aria-label="Social media links">
      <ul className="flex items-center gap-3">
        {links.map(({ type, href }) => {
          const { Icon, label, color } = ICONS[type];
          return (
            <li key={type}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label} page`}
                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-full transition-colors duration-200 ${color}`}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(SocialLinks);
