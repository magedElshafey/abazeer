import { memo, useCallback, forwardRef, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import handlePromisError from "@/utils/handlePromiseError";
import useApplyCoupon from "../../api/copoun/useApplyCoupon";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useCart } from "@/store/CartProvider";

interface CouponInputProps {
  code: { code: string; value: string; type: string };
  handleCodeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CouponInput = memo(
  forwardRef<HTMLInputElement, CouponInputProps>(
    ({ code, handleCodeChange }, ref) => {
      const { t } = useTranslation();
      const { setCouponCode, couponCode, cartQuery } = useCart();
      const { isPending, mutateAsync } = useApplyCoupon();
      const inputRef = useRef<HTMLInputElement | null>(null);

      useEffect(() => {
        if (couponCode?.code) {
          handleCodeChange?.({
            target: { value: couponCode.code },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }, [couponCode]);

      const handleApplyCoupon = useCallback(async () => {
        try {
          const response = await mutateAsync({ code: code.value });
          if (response?.status) {
            toast.success(response.message);
            setCouponCode({
              code: response?.data?.code ?? "",
              value: response?.data?.value ?? "",
              type: response?.data?.type ?? "",
            });
          }
        } catch (error) {
          handlePromisError(error);
        }
      }, [code, mutateAsync, setCouponCode, cartQuery]);

      const handleRemoveCoupon = useCallback(() => {
        setCouponCode(undefined);
        toast.info(t("Coupon removed successfully"));
        cartQuery.refetch();
      }, [setCouponCode, t, cartQuery]);

      const hasActiveCoupon = !!couponCode?.code;

      return (
        <div
          className="flex-between py-2 px-4 bg-gray-100 rounded-md focus-within:ring-2 focus-within:ring-orangeColor/80 transition-all"
          aria-label={t("coupon input")}
        >
          <label htmlFor="coupon-code" className="sr-only">
            {t("coupon code")}
          </label>

          <input
            id="coupon-code"
            type="text"
            ref={(ref as React.RefObject<HTMLInputElement>) || inputRef}
            value={code.value}
            placeholder={t("enter your coupon code")}
            onChange={(e) => handleCodeChange?.(e)}
            aria-invalid={!code ? true : false}
            aria-label={t("enter your coupon code")}
            disabled={hasActiveCoupon}
            className={`flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-500 ${
              hasActiveCoupon ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />

          {hasActiveCoupon ? (
            <MainBtn
              type="button"
              theme="danger"
              onClick={handleRemoveCoupon}
              aria-label={t("remove coupon")}
            >
              {t("remove")}
            </MainBtn>
          ) : (
            <MainBtn
              type="button"
              disabled={!code.value || isPending}
              onClick={handleApplyCoupon}
              aria-label={t("apply coupon")}
              aria-busy={isPending}
            >
              {isPending ? (
                <Loader
                  className="animate-spin w-4 h-4 mr-1"
                  aria-hidden="true"
                />
              ) : (
                t("apply")
              )}
            </MainBtn>
          )}
        </div>
      );
    }
  )
);

CouponInput.displayName = "CouponInput";
export default CouponInput;
