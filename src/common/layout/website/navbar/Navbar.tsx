import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../store/AuthProvider";
import Logo from "../../../components/logo/Logo";
import logo from "../../../../assets/logo (1).png";
import SidebarIcon from "./icons/SidebarIcon";
import Sidebar from "../sidebar/Sidebar";
import NavIcons from "./navIcons/NavIcons";
import WebsiteLinks from "./links/WebsiteLinks";
import Search from "./search/Search";
import HotLine from "./hot-line/HotLine";
const Navbar = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="hidden lg:block bg-white shadow-sm py-3 border-b text-nowrap">
        <div className="containerr flex-between gap-4 xl:gap-6 flex-nowrap">
          <Logo logo={logo} />
          <Search />
          <HotLine hotline="65663328008" />
          <NavIcons />
        </div>
      </header>
      {/* <Sidebar isOpen={showSidebar} onClose={closeSidebar} /> */}
    </>
  );
};

export default Navbar;
/**
 * 
          <NavIcons />
          <div className="flex items-center gap-3">
           
          </div>
          <WebsiteLinks />
 */
