import { memo } from "react";
import CopyRight from "./components/copyrights/CopyRight";
import Features from "./components/features/Features";
import SiteMap from "./components/site-map/SiteMap";
import type { Setting } from "@/features/settings/types/settings.type";
export type FooterSettings = Pick<
  Setting,
  | "site_logo"
  | "contact_email"
  | "contact_phone"
  | "contact_address"
  | "social_facebook"
  | "social_twitter"
  | "social_instagram"
  | "site_description"
>;
const Footer: React.FC<FooterSettings> = ({
  site_logo,
  social_facebook,
  social_twitter,
  social_instagram,
  contact_address,
  contact_email,
  contact_phone,
  site_description
}) => {
  return (
    <footer className="bg-white shadow-md" role="contentinfo">
      <Features />
      <SiteMap
        logo={site_logo || "/images/logo.png"}
        contact_address={contact_address}
        contact_email={contact_email}
        contact_phone={contact_phone}
        slogan={site_description}
      />
      <CopyRight
        social_facebook={social_facebook}
        social_twitter={social_twitter}
        social_instagram={social_instagram}
        phone={contact_phone}
      />
    </footer>
  );
};

export default memo(Footer);
