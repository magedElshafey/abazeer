import CartIcon from "../icons/CartIcon";
import CompareIcon from "../icons/CompareIcon";
import WhishListIcon from "../icons/WhishListIcon";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-x-2 sm:gap-x-3 md:gap-x-7 shrink-0">
      <CompareIcon />
      <WhishListIcon />
      <CartIcon />
    </div>
  );
};

export default NavIcons;
