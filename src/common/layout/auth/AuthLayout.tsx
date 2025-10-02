import { Outlet } from "react-router-dom";
import BgImg from "./BgImg";
import Logo from "../../components/logo/Logo";
import logo from "../../../assets/logo.png";
import { useLocation } from "react-router-dom";
import successLogo from "../../../assets/Vector.png";
import gifaya from "../../../assets/gifaya.gif";
const AuthLayout = () => {
  const { pathname } = useLocation();
  const isPasswordSuccess = pathname === "/auth/reset-password-success";
  const isForgetPages =
    pathname === "/auth/forget-password" ||
    pathname === "/auth/forget-password-otp" ||
    pathname === "/auth/reset-password";
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="containerr mt-4">
          <div className="w-full flex-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9">
            {isPasswordSuccess ? (
              <img
                alt="password-change-sucfully"
                src={successLogo}
                className="w-[93px] h-[93px] object-contain"
              />
            ) : isForgetPages ? (
              <img
                alt="loading"
                src={gifaya}
                className="w-[144px] h-[144px] object-contain"
              />
            ) : (
              <Logo logo={logo} />
            )}
          </div>
          <Outlet />
        </div>
      </div>

      {/* right side */}
      <div className="w-full md:w-1/2">
        <BgImg />
      </div>
    </div>
  );
};

export default AuthLayout;
