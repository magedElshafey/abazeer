import Search from "../../larg-screens/navbar/search/Search";
import Backdrop from "../mobile-navbar/common/Backdrop";
import SidebarIntro from "../mobile-navbar/common/SidebarIntro";
import { memo } from "react";

interface SearchSidebarProps {
  showSidebar: boolean;
  onClose: () => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  showSidebar,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      <Backdrop isOpen={showSidebar} onClick={onClose} aria="close search" />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[85%] bg-white shadow-md border z-40 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!showSidebar}
        aria-label="Search Sidebar"
      >
        <SidebarIntro onClose={onClose}>
          <Search />
        </SidebarIntro>
      </aside>
    </>
  );
};

export default memo(SearchSidebar);
