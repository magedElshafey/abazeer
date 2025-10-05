import { useTranslation } from "react-i18next";
import useLogOut from "../api/useLogOut";
import { useAuth } from "../../../../../../store/AuthProvider";
import { Link } from "react-router-dom";
import Border from "../../../../../components/border/Border";
import LanguageDropdown from "../../../common/lang-menu/LangMenu";
import { toast } from "sonner";
import handlePromisError from "../../../../../../utils/handlePromiseError";

const Divider = () => <Border />;
const RightSide = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
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
          <div onClick={logout}>
            (
            <span className="hover:underline text-orangeColor cursor-pointer">
              {t("logout")}
            </span>
            )
          </div>
          <Divider />
          <button
            disabled={isLoading || isFetching}
            onClick={handleClick}
            className="text-transition cursor-pointer disabled:cursor-not-allowed"
          >
            {t("log out")}
          </button>
          <Divider />
        </>
      )}
      {/* Language Dropdown */}
      <LanguageDropdown />
    </div>
  );
};

export default RightSide;
