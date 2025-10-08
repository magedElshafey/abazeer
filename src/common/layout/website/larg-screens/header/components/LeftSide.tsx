import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Border from "../../../../../components/border/Border";
import LoginPrompt from "@/common/components/login-prompt/LoginPrompt";
const LeftSide = () => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 items-center">
      <Link to="/about-us" className="text-transition" aria-label={t("about")}>
        {t("about us")}
      </Link>
      <Border />
      <LoginPrompt>
        <Link
          to="/my-profile/favorites"
          className="text-transition"
          aria-label={t("whishlist")}
        >
          {t("whishlist")}
        </Link>
      </LoginPrompt>
      <Border />
      <Link
        to="/order-tracking"
        className="text-transition"
        aria-label={t("order tracking")}
      >
        {t("order tracking")}
      </Link>
    </div>
  );
};

export default LeftSide;
