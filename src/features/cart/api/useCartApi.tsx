import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
export const useCartApi = () => {
  const getCart = async () => {
    const { data } = await Axios.get(apiRoutes?.cart);
    return data;
  };
  const addToCart = async (
    products: { product_id: number; quantity: number }[]
  ) => {
    const { data } = await Axios.post(`${apiRoutes?.cart}/add`, products);
    return data;
  };
  const removeFromCart = async (id: number) => {
    const { data } = await Axios.delete(`${apiRoutes?.cart}/remove/${id}`);
    return data;
  };
  const updateQuantity = async (item_id: number, quantity: number) => {
    const { data } = await Axios.patch(`${apiRoutes?.cart}/update`, {
      item_id,
      quantity,
    });
    return data;
  };
  const clearCart = async () => {
    const { data } = await Axios.delete(`${apiRoutes?.cart}/clear`);
    return data;
  };
  return {
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToCart,
  };
};
