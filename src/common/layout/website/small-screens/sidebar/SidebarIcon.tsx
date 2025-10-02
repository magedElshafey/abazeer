import { GiHamburgerMenu } from "react-icons/gi";
import { memo } from "react";

interface SidebarIconProps {
  openSidebar: () => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ openSidebar }) => (
  <button onClick={openSidebar} className="md:hidden" aria-label="Open sidebar">
    <GiHamburgerMenu size={20} className="text-transition" aria-hidden="true" />
  </button>
);

export default memo(SidebarIcon);
