import { useState, useEffect, useCallback } from "react";
import Logo from "../../../components/logo/Logo";
import logo from "../../../../assets/logo (1).png";
import SidebarIcon from "../navbar/icons/SidebarIcon";
const MobileNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const openSidebar = useCallback(() => setShowSidebar(true), []);
  const closeSidebar = useCallback(() => setShowSidebar(false), []);
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
    <div>
      <div className="containerr py-3 flex-between ">
        <SidebarIcon openSidebar={openSidebar} />
        <Logo logo={logo} />
      </div>
    </div>
  );
};

export default MobileNavbar;
