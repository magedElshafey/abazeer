import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { useCartApi } from "@/features/cart/api/useCartApi";
import { useCartMutations } from "@/features/cart/api/useCartMutations";
import type { CartItem } from "@/features/cart/types/Cart.types";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
const playAddSound = () => {
  const audio = new Audio("/sounds/cart.mp3");
  audio.volume = 0.5;
  audio.play().catch(() => {});
};

interface CartContextProps {
  items: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);
const LOCAL_KEY = "cart_items";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { getCart, getCartTotal } = useCartApi();
  const [items, setItems] = useState<CartItem[]>([]);
  const { addMutation, removeMutation, updateMutation, clearMutation } =
    useCartMutations(items, setItems);

  // Load local cart for guest
  useEffect(() => {
    if (!user) {
      const localData = localStorage.getItem(LOCAL_KEY);
      if (localData) setItems(JSON.parse(localData));
    }
  }, [user]);

  // Fetch cart for logged-in user
  const { data: cartData } = useQuery({
    queryKey: [apiRoutes.cart],
    queryFn: getCart,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    if (cartData?.items && user) setItems(cartData.items);
  }, [cartData, user]);

  // Persist local cart for guests
  const persistLocal = (updated: CartItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  // Fetch total from API for logged-in user
  const { data: totalData } = useQuery({
    queryKey: [apiRoutes.cart, "total"],
    queryFn: getCartTotal,
    enabled: !!user,
  });

  // Methods
  const addToCart = (item: CartItem) => {
    if (!user) {
      if (items.some((i) => i.id === item.id)) {
        return toast.info(t("Item already in cart"));
      }
      const updated = [...items, item];
      setItems(updated);
      persistLocal(updated);
      toast.success(t("Added to cart"));
      playAddSound();
    } else {
      addMutation.mutate([{ product_id: item.id, quantity: item.quantity }], {
        onSuccess: () => playAddSound(),
      });
    }
  };

  const removeFromCart = (id: number) => {
    if (!user) {
      const updated = items.filter((i) => i.id !== id);
      setItems(updated);
      persistLocal(updated);
      toast.success(t("Removed from cart"));
    } else {
      removeMutation.mutate(id);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (!user) {
      const updated = items.map((i) => (i.id === id ? { ...i, quantity } : i));
      setItems(updated);
      persistLocal(updated);
    } else {
      updateMutation.mutate({ item_id: id, quantity });
    }
  };

  const clearCart = () => {
    if (!user) {
      setItems([]);
      localStorage.removeItem(LOCAL_KEY);
    } else {
      clearMutation.mutate();
    }
  };

  const itemIds = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  const isInCart = useCallback((id: number) => itemIds.has(id), [itemIds]);

  const localTotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          (item.has_discount && item.sale_price
            ? item.sale_price
            : +item.price * item.quantity),
        0
      ),
    [items]
  );

  const total = user ? totalData?.total ?? 0 : localTotal;

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
