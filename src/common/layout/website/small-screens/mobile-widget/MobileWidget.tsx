import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../store/AuthProvider";
import IconBadge from "./components/common/IconBadge";
import { IoHomeOutline, IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";

const MobileWidget = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCategoriesSidebar, setShowCategoriesSidebar] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // ✅ memoize handlers
  const openCategoriesSidebar = useCallback(
    () => setShowCategoriesSidebar(true),
    []
  );
  const openCartSidebar = useCallback(() => setShowCartSidebar(true), []);
  const homeAction = useCallback(() => navigate("/"), [navigate]);
  const wishlistAction = useCallback(() => navigate("/wishlist"), [navigate]);
  const accountAction = useCallback(
    () => navigate(user ? "/my-profile" : "/auth/login"),
    [navigate, user]
  );

  // ✅ define icons config to avoid repetition
  const actions = useMemo(
    () => [
      { Icon: IoHomeOutline, title: "home", onClick: homeAction },
      {
        Icon: TbCategoryPlus,
        title: "categories",
        onClick: openCategoriesSidebar,
      },
      { Icon: IoCartOutline, title: "cart", onClick: openCartSidebar },
      { Icon: IoHeartOutline, title: "wishlist", onClick: wishlistAction },
      { Icon: FaRegUser, title: "my account", onClick: accountAction },
    ],
    [
      homeAction,
      openCategoriesSidebar,
      openCartSidebar,
      wishlistAction,
      accountAction,
    ]
  );

  return (
    <nav
      className="fixed bottom-0 z-30 left-0 right-0 w-full bg-white shadow-2xl px-2 py-4"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="containerr">
        <ul className="flex justify-between items-center gap-5 overflow-x-auto">
          {actions.map(({ Icon, title, onClick }) => (
            <li key={title}>
              <IconBadge Icon={Icon} title={title} onClick={onClick} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MobileWidget;
