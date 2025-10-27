import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { useCartApi } from "./hooks/useCartApi";
import { useCartMutations } from "./hooks/useCartMutations";
import type { CartItem, CartResponse } from "@/features/cart/types/Cart.types";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
const playAddSound = (path: string) => {
  const audio = new Audio(path);
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
  isInCart: (id: number) => CartItem | undefined;
  cartQuery: UseQueryResult<CartResponse>
}

const CartContext = createContext<CartContextProps | undefined>(undefined);
export const LOCAL_KEY = "cart_items";

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
    const localData = localStorage.getItem(LOCAL_KEY);
    if (!user) {
      if (localData) {
        setItems(JSON.parse(localData));
      } else setItems([]);
    }
  }, [user]);

  // Fetch cart for logged-in user
  const cartQuery = useQuery({
    queryKey: [apiRoutes.cart],
    queryFn: getCart,
    enabled: !!user,
  });

  const {data: cartData} = cartQuery;
  useEffect(() => {
    if (!user) return;
    const localData = localStorage.getItem(LOCAL_KEY);
    if (localData) {
      const guestItems: CartItem[] = JSON.parse(localData);

      if (guestItems.length > 0) {
        const formatted = guestItems.map((i) => ({
          product_id: i.id,
          quantity: i.quantity,
        // Find only the items that has not been in the cart before.
        })).filter(item => cartData?.items.findIndex((el: CartItem) => el.id === item.product_id) === -1);
        if(formatted.length) addMutation.mutate(formatted, {
          onSuccess: () => {
            localStorage.removeItem(LOCAL_KEY);
          },
        });
      }
    }

    if (cartData?.items) {
      setItems(cartData.items);
    }
  }, [user, cartData]);

  // Persist local cart for guests
  const persistLocal = useCallback((updated: CartItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  }, []);

  // Fetch total from API for logged-in user
  const { data: totalData } = useQuery({
    queryKey: [apiRoutes.cart, "total"],
    queryFn: getCartTotal,
    enabled: !!user,
  });

  // Methods

  // 🧩 Add item
  const addToCart = useCallback(
    (item: CartItem) => {
      if (!user) {
        if (items.some((i) => i.id === item.id)) {
          return toast.info(t("Item already in cart"));
        }
        const updated = [...items, {...item}];
        setItems(updated);
        persistLocal(updated);
        playAddSound("/sounds/cart.mp3");
      } else {
        addMutation.mutate([{ product_id: item.id, quantity: item.quantity }], {
          onSuccess: () => playAddSound("/sounds/cart.mp3"),
        });
      }
    },
    [user, items, addMutation, persistLocal, t]
  );


  // 🧩 Remove item
  const removeFromCart = useCallback(
    (id: number) => {
      if (!user) {
        const updated = items.filter((i) => i.id !== id);
        setItems(updated);
        persistLocal(updated);
        playAddSound("/sounds/remove.mp3");

      } else {
        removeMutation.mutate(id, {
          onSuccess: () => playAddSound("/sounds/remove.mp3"),
        });
      }
    },
    [user, items, removeMutation, persistLocal, t]
  );

  // 🧩 Update quantity
  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (!user) {
        const updated = items.map((i) =>
          i.item_id === id ? { ...i, quantity } : i
        );
        setItems(updated);
        persistLocal(updated);
      } else {
        updateMutation.mutate({ item_id: id, quantity });
      }
    },
    [user, items, updateMutation, persistLocal]
  );

  // 🧩 Clear cart
  const clearCart = useCallback(() => {
    if (!user) {
      setItems([]);
      localStorage.removeItem(LOCAL_KEY);
    } else {
      clearMutation.mutate();
    }
  }, [user, clearMutation]);

  const isInCart = useCallback((id: number) => items.find(item => item.id === id), [items]);

  const localTotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price =
          item.has_discount && item.sale_price ? +item.sale_price : +item.price;

        return sum + price * item.quantity;
      }, 0),
    [items]
  );

  const total = user ? totalData?.total ?? 0 : Math.floor(localTotal);
  const value = useMemo(
    () => ({
      items,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      cartQuery
    }),
    [
      items,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      cartQuery
    ]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
