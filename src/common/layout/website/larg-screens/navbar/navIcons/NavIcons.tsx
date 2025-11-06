import CartIcon from "../icons/CartIcon";
import WhishListIcon from "../icons/WhishListIcon";
import NotificationIcon from "../icons/NotificationIcon";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-x-2 sm:gap-x-3 md:gap-x-4 shrink-0">
      <WhishListIcon />
      <NotificationIcon />
      <CartIcon />
    </div>
  );
};

export default NavIcons;
