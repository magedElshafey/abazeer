import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [apiRoutes?.applyCoupon],
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await Axios.post(apiRoutes?.applyCoupon, { code });
      return data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
      await queryClient.refetchQueries({
        queryKey: [apiRoutes.cart, variables.code],
      });
    },
  });
};

export default useApplyCoupon;
