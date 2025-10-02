import { useState, useEffect, useCallback } from "react";
import Logo from "../../../components/logo/Logo";
import logo from "../../../../assets/logo (1).png";
import SidebarIcon from "../navbar/icons/SidebarIcon";
import { TfiSearch } from "react-icons/tfi";
import SearchSidebar from "./components/SearchSidebar";
import Sidebar from "../sidebar/Sidebar";

const MobileNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const openSidebar = useCallback(() => setShowSidebar(true), []);
  const closeSidebar = useCallback(() => setShowSidebar(false), []);
  const openSearch = useCallback(() => setShowSearchSidebar(true), []);
  const closeSearch = useCallback(() => setShowSearchSidebar(false), []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setShowSidebar(false);
    };
    // run once on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="containerr py-3 flex-between ">
        <SidebarIcon openSidebar={openSidebar} />
        <Logo logo={logo} />
        <button onClick={openSearch} className="text-transition">
          <TfiSearch size={20} />
        </button>
      </div>
      <SearchSidebar showSidebar={showSearchSidebar} onClose={closeSearch} />
      <Sidebar onClose={closeSidebar} isOpen={showSidebar} />
    </>
  );
};

export default MobileNavbar;
