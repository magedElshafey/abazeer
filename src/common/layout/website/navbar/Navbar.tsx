import Logo from "../../../components/logo/Logo";
import logo from "../../../../assets/logo (1).png";
import NavIcons from "./navIcons/NavIcons";
import Search from "./search/Search";
import HotLine from "./hot-line/HotLine";
const Navbar = () => {
  return (
    <header className="hidden md:block bg-white shadow-sm py-3 border-b">
      <div className="containerr flex-between gap-4 xl:gap-6 ">
        <Logo logo={logo} />
        <Search />
        <HotLine hotline="65663328008" />
        <NavIcons />
      </div>
    </header>
  );
};

export default Navbar;
