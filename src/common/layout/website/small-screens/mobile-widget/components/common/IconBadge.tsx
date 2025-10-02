import type { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

interface IconBadgeProps {
  Icon: IconType;
  title: string;
  onClick: () => void;
}

const IconBadge: React.FC<IconBadgeProps> = ({ Icon, title, onClick }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      aria-label={t(title)}
      className="flex flex-col items-center gap-1 text-gray-700 hover:text-orangeColor transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor rounded-lg p-1"
    >
      <Icon size={22} aria-hidden="true" />
      <span className="text-sm">{t(title)}</span>
    </button>
  );
};

export default IconBadge;
