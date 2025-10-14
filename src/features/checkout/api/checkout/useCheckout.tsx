import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/store/CartProvider";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useNavigate } from "react-router-dom";
const useCheckout = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  type CheckoutPayload = {
    products: { product_id: number; quantity: number }[];
    payment_type: string;
    notes?: string;
    address_id: number;
    // coupon_code?: string;
  };

  return useMutation({
    mutationKey: [apiRoutes?.orders],
    mutationFn: async (order: CheckoutPayload) => {
      const { data } = await Axios.post(apiRoutes?.orders, order);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiRoutes?.cart],
      });
      navigate("/order-success");
    },
  });
};

export default useCheckout;
