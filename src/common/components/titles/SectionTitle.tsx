import React from "react";
import { useTranslation } from "react-i18next";
interface SectionTitleProps {
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const { t } = useTranslation();
  console.log("title rendering");
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-12 inline-block relative">
      {t(title)}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-400 rounded-full"></span>
    </h2>
  );
};

export default React.memo(SectionTitle);
