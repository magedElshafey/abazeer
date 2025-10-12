import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { NavbarType } from "@/types/navbar.types";

const Logo: React.FC<NavbarType> = ({ logo }) => {
  const { pathname } = useLocation();
  const isAuthPages = pathname.startsWith("/auth");
  console.log("logo from api", logo);
  return (
    <Link to="/" className="shrink-0">
      <img
        alt="Abazeer logo"
        src={logo || "/images/logo.png"}
        className={`${
          isAuthPages ? "h-[50px]" : "h-[44px]"
        } w-auto object-contain`}
      />
    </Link>
  );
};

export default Logo;
