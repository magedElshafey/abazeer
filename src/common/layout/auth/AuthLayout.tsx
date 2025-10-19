import { Outlet } from "react-router-dom";
import BgImg from "./BgImg";
import Logo from "../../components/logo/Logo";
import { useLocation } from "react-router-dom";
import LangBtn from "./LangBtn";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
const AuthLayout = () => {
  const { pathname } = useLocation();
  const { data } = useGetWebsiteSettings();
  const isPasswordSuccess = pathname === "/auth/reset-password-success";
  const isForgetPages =
    pathname === "/auth/forget-password" ||
    pathname === "/auth/forget-password-otp" ||
    pathname === "/auth/reset-password";
  return (
    <>
      <LangBtn />
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* left side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="containerr mt-4">
            <div className="w-full flex-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9">
              {isPasswordSuccess ? (
                <img
                  alt="password-change-sucfully"
                  src={"/images/Vector.png"}
                  className="w-[93px] h-[93px] object-contain"
                />
              ) : isForgetPages ? (
                <img
                  alt="loading"
                  src={"/images/gifaya.gif"}
                  className="w-[144px] h-[144px] object-contain"
                />
              ) : (
                <Logo logo={data?.site_logo || "/images/logo.png"} />
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
    </>
  );
};

export default AuthLayout;
