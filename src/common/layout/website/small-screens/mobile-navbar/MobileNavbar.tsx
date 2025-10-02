import { useState, useEffect, useCallback, useMemo } from "react";
import Logo from "../../../../components/logo/Logo";
import logo from "../../../../../assets/logo (1).png";
import SidebarIcon from "../sidebar/SidebarIcon";
import { TfiSearch } from "react-icons/tfi";
import SearchSidebar from "../search/SearchSidebar";
import Sidebar from "../sidebar/Sidebar";

const MobileNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);

  // ✅ Stable callbacks
  const openSidebar = useCallback(() => setShowSidebar(true), []);
  const closeSidebar = useCallback(() => setShowSidebar(false), []);
  const openSearch = useCallback(() => setShowSearchSidebar(true), []);
  const closeSearch = useCallback(() => setShowSearchSidebar(false), []);

  // ✅ Close sidebar if screen >= lg
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setShowSidebar(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoMemo = useMemo(() => <Logo logo={logo} />, []);

  return (
    <>
      <div className="containerr py-3 flex-between">
        <SidebarIcon openSidebar={openSidebar} />
        {logoMemo}
        <button
          onClick={openSearch}
          aria-label="Open search"
          className="text-transition"
        >
          <TfiSearch size={20} aria-hidden="true" />
        </button>
      </div>

      {/* ✅ Sidebars are lazy-rendered for performance */}
      {showSearchSidebar && (
        <SearchSidebar showSidebar={showSearchSidebar} onClose={closeSearch} />
      )}
      {showSidebar && <Sidebar onClose={closeSidebar} isOpen={showSidebar} />}
    </>
  );
};

export default MobileNavbar;
