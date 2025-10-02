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
      className="flex flex-col items-center gap-1 text-transition"
    >
      <Icon size={20} />
      <p className="text-sm">{t(title)}</p>
    </button>
  );
};

export default IconBadge;
