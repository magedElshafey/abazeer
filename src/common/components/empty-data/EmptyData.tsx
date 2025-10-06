import React from "react";
import { useTranslation } from "react-i18next";
interface EmptyDataProps {
  title?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <span className="text-center text-red-600">
      {t(title ? title : "No data found")}
    </span>
  );
};

export default React.memo(EmptyData);
