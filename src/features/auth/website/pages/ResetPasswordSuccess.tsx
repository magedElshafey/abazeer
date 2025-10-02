import { useTranslation } from "react-i18next";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
const ResetPasswordSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div className="w-full flex-column items-center text-center">
      <header className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Password changed successfully")}
        </h1>

        <p className="text-sm mt-2 text-text-gray dark:text-gray-400">
          {t("Keep your password confidential")}
        </p>
      </header>
      <div className="w-full md:w-[170px]">
        <MainBtn text="Home" onClick={handleClick} type="button" />
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
