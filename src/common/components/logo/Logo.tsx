import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { NavbarType } from "@/types/navbar.types";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import Skeleton from "../loader/skeltons/Skeleton";

const Logo: React.FC<NavbarType> = ({ logo }) => {
  const { pathname } = useLocation();
  const isAuthPages = pathname.startsWith("/auth");
  const { data, isLoading } = useGetWebsiteSettings();
  return (
    <Link to="/" className="shrink-0">
      {
        isLoading ?
          <div className="h-[50px] w-20 overflow-hidden">
            <Skeleton type="hero" />
          </div>
          :
          <img
            alt="Abazeer logo"
            src={logo || data?.site_logo || "/images/logo.png"}
            className={`${isAuthPages ? "h-[100px]" : "h-[44px]"
              } w-auto object-contain`}
          />
      }
    </Link>
  );
};

export default Logo;
