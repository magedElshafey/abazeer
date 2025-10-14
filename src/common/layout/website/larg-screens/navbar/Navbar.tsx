import Logo from "../../../../components/logo/Logo";
import NavIcons from "./navIcons/NavIcons";
import Search from "./search/Search";
import HotLine from "./hot-line/HotLine";
import type { NavbarType } from "@/types/navbar.types";
const Navbar: React.FC<NavbarType> = ({ logo, hotline }) => {
  return (
    <header className="hidden md:block bg-white shadow-sm py-6 border-b">
      <div className="containerr flex-between gap-4 xl:gap-6 ">
        <Logo logo={logo || "/images/logo.png"} />
        <Search />
        <HotLine hotline={hotline || ""} />
        <NavIcons />
      </div>
    </header>
  );
};

export default Navbar;
