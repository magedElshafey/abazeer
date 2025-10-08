import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

interface SettingsCardProps {
  title: string;
  description: string;
  icon: IconType;
  children: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

const SettingsCard: FC<SettingsCardProps> = ({
  title,
  description,
  icon: Icon,
  children,
  iconBgColor = "bg-yellow-100",
  iconColor = "text-yellow-600",
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 bg-background-gray/60 -m-6 mb-6 px-6 pt-6">
        <div className={`p-3 ${iconBgColor} rounded-full`}>
          <Icon className={iconColor} size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{t(title)}</h2>
          <p className="text-sm text-gray-600">{t(description)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;
