import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Border from "../../../../../components/border/Border";
const LeftSide = () => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 items-center">
      <Link to="/about" className="text-transition" aria-label={t("about")}>
        {t("about us")}
      </Link>
      <Border />
      <Link
        to="/whishlist"
        className="text-transition"
        aria-label={t("whishlist")}
      >
        {t("whishlist")}
      </Link>
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
