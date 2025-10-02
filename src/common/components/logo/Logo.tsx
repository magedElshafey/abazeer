import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
interface logoProps {
  logo?: string;
}

const Logo: React.FC<logoProps> = ({ logo }) => {
  const { pathname } = useLocation();
  const isAuthPages = pathname.startsWith("/auth");
  return (
    <Link to="/" className="shrink-0">
      <img
        alt="Abazeer logo"
        src={logo}
        className={`${
          isAuthPages ? "h-[50px]" : "h-[44px]"
        } w-auto object-contain`}
      />
    </Link>
  );
};

export default Logo;
