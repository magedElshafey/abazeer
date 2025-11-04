import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

const useApplyCoupon = () => {

  return useMutation({
    mutationKey: [apiRoutes?.applyCoupon],
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await Axios.post(apiRoutes?.applyCoupon, { code });
      Axios.get(apiRoutes.cart, {params: {
        coupon_code: code
      }});
      return data;
    },
  });
};

export default useApplyCoupon;
