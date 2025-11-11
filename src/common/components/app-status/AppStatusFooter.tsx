import { useTranslation } from "react-i18next";

const AppStatusFooter = () => {
  const { t } = useTranslation("Footer");
  return (
    <footer className="relative z-10 mt-10 text-sm text-gray-500">
      {t("© ")} {new Date().getFullYear()} {t("abazeer")}
    </footer>
  );
};

export default AppStatusFooter;
