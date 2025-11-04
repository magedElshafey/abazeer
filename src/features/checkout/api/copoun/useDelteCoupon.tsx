import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useCart } from "@/store/CartProvider";
const useDeleteCoupon = () => {
  const { t } = useTranslation();
  const { cartQuery, setCouponCode } = useCart();
  return useMutation({
    mutationKey: [apiRoutes?.removeCoupon],
    mutationFn: async () => {
      const { data } = await Axios.delete(apiRoutes?.removeCoupon);
      return data;
    },
    onSuccess: () => {
      toast.success(t("coupon removed successfully"));
      cartQuery.refetch();
      setCouponCode({
        code: "",
        value: "",
        type: "",
      });
    },
  });
};

export default useDeleteCoupon;
