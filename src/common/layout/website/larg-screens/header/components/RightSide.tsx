import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../../../store/AuthProvider";
import { Link } from "react-router-dom";
import Border from "../../../../../components/border/Border";
import LanguageDropdown from "../../../common/lang-menu/LangMenu";

const Divider = () => <Border />;
const RightSide = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="flex gap-3 items-center">
      {!user && (
        <>
          <Link to="/auth/login" className="text-transition">
            {t("login")}
          </Link>
          <Divider />
          <Link to="/auth/register" className="text-transition">
            {t("register")}
          </Link>
          <Divider />
        </>
      )}
      {user && (
        <>
          <Link to="/my-profile" className="text-transition">
            {t("my profile")}
          </Link>
          <Divider />
        </>
      )}
      {/* Language Dropdown */}
      <LanguageDropdown />
    </div>
  );
};

export default RightSide;
