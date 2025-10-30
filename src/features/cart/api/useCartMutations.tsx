import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useCartApi } from "../api/useCartApi";
import { useTranslation } from "react-i18next";
import type { CartItem } from "../types/Cart.types";
import { useCallback } from "react";

const showToast = (type: "success" | "error", message: string) => {
  if (type === "success") toast.success(message);
  else toast.error(message);
};

export const useCartMutations = (
  items: CartItem[],
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToCart, removeFromCart, updateQuantity, clearCart } = useCartApi();

  const invalidateCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
  }, [queryClient]);

  // 🧩 Add Item
  const addMutation = useMutation({
    mutationFn: (products: { product_id: number; quantity: number }[]) =>
      addToCart(products),

    onMutate: async (products) => {
      await queryClient.cancelQueries({ queryKey: [apiRoutes.cart] });
      const previous = items;

      const newItem: CartItem = {
        id: products[0].product_id,
        quantity: products[0].quantity,
        name: "",
        category: "",
        price: "0",
        image: "",
        has_discount: false,
        sale_price: 0,
        discount_percentage: 0,
        average_rate: 0,
        ratings_count: 0,
        stock_quantity: 0,
        sold_quantity: 0,
        is_in_wishlist: false,
        item_id: products[0].product_id,
        isLoading: true,
        product_id: products[0]?.product_id
      };

      setItems((prev) => [...prev, newItem]);

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("Failed to add item"));
    },

    onSettled: invalidateCart,
  });

  // 🧩 Remove Item
  const removeMutation = useMutation({
    mutationFn: (id: number) => removeFromCart(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [apiRoutes.cart] });
      const previous = items;
      setItems((prev) => prev.filter((i) => i.id !== id));
      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("Failed to remove item"));
    },

    onSettled: invalidateCart,
  });

  // 🧩 Update Quantity
  const updateMutation = useMutation({
    mutationFn: ({
      item_id,
      quantity,
    }: {
      item_id: number;
      quantity: number;
    }) => updateQuantity(item_id, quantity),

    onMutate: async ({ item_id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: [apiRoutes.cart] });
      const previous = items;
      setItems((prev) =>
        prev.map((i) => (i.id === item_id ? { ...i, quantity } : i))
      );
      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("Failed to update quantity"));
    },

    onSettled: invalidateCart,
  });

  // 🧩 Clear Cart
  const clearMutation = useMutation({
    mutationFn: clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [apiRoutes.cart] });
      const previous = items;
      setItems([]);
      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) setItems(context.previous);
      showToast("error", t("Failed to clear cart"));
    },

    onSuccess: () => showToast("success", t("Cart cleared")),
    onSettled: invalidateCart,
  });

  return { addMutation, removeMutation, updateMutation, clearMutation };
};
