import React from "react";
import { useTranslation } from "react-i18next";
interface SectionTitleProps {
  title: string;
  id?: string;
  mb?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title, mb = "" }) => {
  const { t } = useTranslation();
  return (
    <h2
      className={`text-2xl md:text-3xl font-semibold ${
        mb ? mb : "mb-12"
      } inline-block relative`}
    >
      {t(title)}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-orangeColor rounded-full"></span>
    </h2>
  );
};

export default React.memo(SectionTitle);
