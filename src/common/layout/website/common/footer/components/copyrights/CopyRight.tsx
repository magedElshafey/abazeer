import { useTranslation } from "react-i18next";
import SocialLinks from "./SocialLinks";
export interface SocialProps {
  social_facebook: string | null;
  social_twitter: string | null;
  social_instagram: string | null;
  phone: string;
}
const CopyRight: React.FC<SocialProps> = ({
  social_facebook,
  social_twitter,
  social_instagram,
  phone,
}) => {
  const { t } = useTranslation();

  return (
    <div className="py-3 containerr border-t" role="contentinfo">
      <div className="flex-between flex-wrap gap-3">
        <p className="text-sm text-gray-600">
          {t("copyright")} © {new Date().getFullYear()} {t("abazeer")}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <p>{t("by qutell")}</p>
          <a
            href="https://www.qutell.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline text-transition"
          >
            {t("qutell")}
          </a>
        </div>
        <SocialLinks
          social_facebook={social_facebook}
          social_twitter={social_twitter}
          social_instagram={social_instagram}
          phone={phone}
        />
      </div>
    </div>
  );
};

export default CopyRight;
