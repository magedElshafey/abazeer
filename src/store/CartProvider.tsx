import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthProvider";
import { useCartApi } from "@/features/cart/api/useCartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "@/features/cart/types/Cart.types";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    getCart,
    addToCart: addCartAPI,
    removeFromCart: removeCartAPI,
    updateQuantity: updateQuantityAPI,
    clearCart: clearCartAPI,
  } = useCartApi();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<CartItem[]>([]);

  // 🧠 Load local cart on mount
  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_KEY);
    if (localData) setItems(JSON.parse(localData));
  }, []);

  // 🔁 Sync local cart with API when user logs in/out
  useEffect(() => {
    const syncCart = async () => {
      try {
        if (user) {
          // Send local cart to API
          const localData = localStorage.getItem(LOCAL_KEY);
          if (localData) {
            const parsed = JSON.parse(localData);
            const formatted = parsed.map((p: CartItem) => ({
              product_id: p.id,
              quantity: p.quantity,
            }));
            await addCartAPI(formatted);
            localStorage.removeItem(LOCAL_KEY);
          }
          // Load from API
          const data = await getCart();
          setItems(data?.items || []);
        } else {
          // When user logs out: save cart back to local
          try {
            const data = await getCart();
            if (data?.items)
              localStorage.setItem(LOCAL_KEY, JSON.stringify(data.items));
          } catch {
            /* ignore errors */
          }
        }
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    };
    syncCart();
  }, [user]);

  const persistLocal = (updated: CartItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  // 🧠 optimistic mutation handlers
  const addMutation = useMutation({
    mutationFn: (products: { product_id: number; quantity: number }[]) =>
      addCartAPI(products),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      }),
  });

  const removeMutation = useMutation({
    mutationFn: (item_id: number) => removeCartAPI(item_id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      item_id,
      quantity,
    }: {
      item_id: number;
      quantity: number;
    }) => updateQuantityAPI(item_id, quantity),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      }),
  });

  const clearMutation = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      }),
  });

  // ✨ Core methods
  const addToCart = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        const exists = prev.find((i) => i.id === item.id);
        if (exists) {
          toast.info(t("Item already in cart"));
          return prev;
        }
        const updated = [...prev, item];
        if (!user) {
          persistLocal(updated);
        } else {
          addMutation.mutate([
            { product_id: item.id, quantity: item.quantity },
          ]);
        }
        toast.success(t("Added to cart"));
        return updated;
      });
    },
    [user]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      setItems((prev) => {
        const updated = prev.filter((i) => i.id !== id);
        if (!user) persistLocal(updated);
        else {
          const item = prev.find((i) => i.id === id);
          if (item && "item_id" in item)
            removeMutation.mutate((item as any).item_id);
        }
        toast.success(t("Removed from cart"));
        return updated;
      });
    },
    [user]
  );

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      setItems((prev) => {
        const updated = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
        if (!user) persistLocal(updated);
        else {
          const item = prev.find((i) => i.id === id);
          if (item && "item_id" in item)
            updateMutation.mutate({ item_id: (item as any).item_id, quantity });
        }
        return updated;
      });
    },
    [user]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (!user) localStorage.removeItem(LOCAL_KEY);
    else clearMutation.mutate();
  }, [user]);

  const isInCart = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
