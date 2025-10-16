import { memo } from "react";
import { useTranslation } from "react-i18next";
import SidebarIntro from "../../../mobile-navbar/common/SidebarIntro";
import Backdrop from "../../../mobile-navbar/common/Backdrop";
import CartDetails from "@/features/cart/components/details/CartDetails";
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
        aria="close cart navigation"
      />
      <aside
        className={`fixed top-0 right-0 h-screen overflow-y-auto w-[85%] bg-white shadow-md border z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="cart Navigation"
      >
        <SidebarIntro onClose={onClose} height="h-24">
          <div className="flex-center">
            <p className="text-white text-xl font-bold">{t("cart")}</p>
          </div>
        </SidebarIntro>

        <div aria-label="cart Navigation" className="mt-2 px-1">
          <CartDetails onClose={onClose} />
        </div>
      </aside>
    </>
  );
};

export default memo(CartSidebar);
