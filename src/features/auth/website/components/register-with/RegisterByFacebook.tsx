import { useTranslation } from "react-i18next";
import facebook from "../../../../../assets/facebook.png";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
const RegisterByGoogle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    toast.dismiss();
    toast.success(t("you are logged in succfully"));
    navigate("/", {
      replace: true,
      state: { from: location },
    });
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="rounded-xl w-full p-4 flex-center gap-3 bg-[#F5F5F5] transition-all group duration-150 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={t("Sign in with facebook Account")}
    >
      <img
        src={facebook}
        alt=""
        aria-hidden="true"
        className="w-6 h-6 object-contain"
      />
      <span className="group-hover:underline">
        {t("Sign in with facebook Account")}
      </span>
    </button>
  );
};

export default RegisterByGoogle;
