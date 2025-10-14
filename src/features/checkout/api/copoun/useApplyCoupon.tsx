import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [apiRoutes?.applyCoupon],
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await Axios.post(apiRoutes?.applyCoupon, { code });
      console.log("data is", data);
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [apiRoutes?.cart],
      }),
  });
};

export default useApplyCoupon;
