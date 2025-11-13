import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../store/AuthProvider";
import IconBadge from "./components/common/IconBadge";
import { IoHomeOutline, IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import CartSidebar from "./components/cart-sidebar/CartSidebar";
import CategoriesSidebar from "./components/categories-sidebar/CategoriesSidebar";
import { useCart } from "@/store/CartProvider";
const MobileWidget = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const { user } = useAuth();
  const [showCategoriesSidebar, setShowCategoriesSidebar] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // ✅ memoize handlers
  const openCategoriesSidebar = useCallback(
    () => setShowCategoriesSidebar(true),
    []
  );
  const closeCategoriesSidebar = useCallback(
    () => setShowCategoriesSidebar(false),
    []
  );
  const openCartSidebar = useCallback(() => setShowCartSidebar(true), []);
  const closeCartSidebar = useCallback(() => setShowCartSidebar(false), []);

  const homeAction = useCallback(() => navigate("/"), [navigate]);
  const wishlistAction = useCallback(
    () => navigate(user ? "/my-profile/favorites" : "/auth/login"),
    [navigate, user]
  );
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
      {
        Icon: IoCartOutline,
        title: "cart",
        onClick: openCartSidebar,
        type: "cart",
      },
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
    <>
      <nav
        className="fixed bottom-0 z-50 left-0 right-0 w-full bg-white shadow-2xl px-2 py-4"
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="containerr">
          <ul className="flex justify-between flex-nowrap text-nowrap items-center gap-3 overflow-x-auto">
            {actions.map(({ Icon, title, onClick, type }) => (
              <li key={title} className="relative">
                <IconBadge Icon={Icon} title={title} onClick={onClick} />
                {type && type === "cart" && (
                  <div className="absolute top-0 flex-center -left-2 w-5 h-5 bg-orangeColor rounded-[50%]">
                    <p>{items?.length}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {showCartSidebar && (
        <CartSidebar isOpen={showCartSidebar} onClose={closeCartSidebar} />
      )}
      {showCategoriesSidebar && (
        <CategoriesSidebar
          isOpen={showCategoriesSidebar}
          onClose={closeCategoriesSidebar}
        />
      )}
    </>
  );
};

export default MobileWidget;
