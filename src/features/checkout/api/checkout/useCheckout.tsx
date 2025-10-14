import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/store/CartProvider";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useNavigate } from "react-router-dom";
const useCheckout = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [apiRoutes?.orders],
    mutationFn: async (order: FormData) => {
      const { data } = await Axios.post(apiRoutes?.orders, order);
      return data;
    },
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({
        queryKey: [apiRoutes?.cart],
      });
      navigate("/order-success");
    },
  });
};

export default useCheckout;
