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
  const { isFetching, refetch, isLoading } = useLogOut();
  const handleClick = () => {
    toast.warning(t("Are you sure you want to log out?"), {
      description: t("Please confirm your action."),
      duration: 5000,
      action: {
        label: t("Confirm"),
        onClick: async () => {
          const response = await refetch();
          console.log("respnse from logout", response);
        },
      },
      cancel: {
        label: t("Cancel"),
        onClick: () => toast.dismiss(),
      },
    });
  };
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
