import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { CartResponse } from "../types/Cart.types";

export const useCartApi = () => {
  const getCart = async (): Promise<CartResponse> => {
    const { data } = await Axios.get<{ data: CartResponse }>(apiRoutes.cart);
    return data.data;
  };

  const addToCart = async (
    products: { product_id: number; quantity: number }[]
  ) => {
    const { data } = await Axios.post(`${apiRoutes.cart}/add`, { products });
    return data;
  };

  const removeFromCart = async (id: number) => {
    const { data } = await Axios.delete(`${apiRoutes.cart}/remove/${id}`);
    return data;
  };

  const updateQuantity = async (item_id: number, quantity: number) => {
    const { data } = await Axios.put(`${apiRoutes.cart}/update`, {
      item_id,
      quantity,
    });
    return data;
  };

  const clearCart = async () => {
    const { data } = await Axios.delete(`${apiRoutes.cart}/clear`);
    return data;
  };

  const getCartTotal = async () => {
    const { data } = await Axios.get(`${apiRoutes.cart}/total`);
    console.log("get cart total", data);
    return data?.data;
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };
};
