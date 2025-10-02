import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CiUser } from "react-icons/ci";

const RegisterButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/auth/register"
      className="cursor-pointer bg-background-babyBlue rounded-xl w-full p-4 flex-center gap-3 text-darkBlue font-medium border border-darkBlue 
                 focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-offset-2"
      aria-label={t("create an account")}
    >
      <CiUser size={20} aria-hidden="true" />
      <span>{t("create an account")}</span>
    </Link>
  );
};

export default RegisterButton;
