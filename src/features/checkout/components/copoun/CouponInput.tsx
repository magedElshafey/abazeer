import { memo, useCallback, forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import handlePromisError from "@/utils/handlePromiseError";
import useApplyCoupon from "../../api/copoun/useApplyCoupon";
import MainBtn from "@/common/components/buttons/MainBtn";

interface CouponInputProps {
  code: string;
  readOnly?: boolean;
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCode: (value: string) => void;
  setShowCouponInput: (value: boolean) => void;
}

const CouponInput = memo(
  forwardRef<HTMLInputElement, CouponInputProps>(
    (
      { code, readOnly = false, handleCodeChange, setCode, setShowCouponInput },
      ref
    ) => {
      const { t } = useTranslation();
      const { isPending, mutateAsync } = useApplyCoupon();
      const inputRef = useRef<HTMLInputElement | null>(null);

      const handleApplyCoupon = useCallback(async () => {
        if (!code.trim()) return;

        try {
          const response = await mutateAsync({ code });

          if (response?.status) {
            toast.success(response.message);
            if (!readOnly) {
              setCode("");
              setShowCouponInput(false);
              // Return focus to input after reset
              inputRef.current?.focus();
            }
          }
        } catch (error) {
          handlePromisError(error);
        }
      }, [code, readOnly, mutateAsync, setCode, setShowCouponInput]);

      return (
        <div
          className="flex-between py-2 px-4 bg-gray-100 rounded-md focus-within:ring-2 focus-within:ring-orange-400 transition-all"
          aria-label={t("coupon input")}
        >
          <label htmlFor="coupon-code" className="sr-only">
            {t("coupon code")}
          </label>

          <input
            id="coupon-code"
            type="text"
            ref={(ref as React.RefObject<HTMLInputElement>) || inputRef}
            readOnly={readOnly}
            value={code}
            placeholder={t("enter your coupon code")}
            onChange={handleCodeChange}
            aria-invalid={!readOnly && !code ? true : false}
            aria-label={t("enter your coupon code")}
            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-500"
          />

          <MainBtn
            type="button"
            disabled={!code || isPending}
            onClick={handleApplyCoupon}
            aria-label={t("apply coupon")}
            aria-busy={isPending}
          >
            {isPending ? (
              <>
                <Loader
                  className="animate-spin w-4 h-4 mr-1"
                  aria-hidden="true"
                />
              </>
            ) : (
              t("apply")
            )}
          </MainBtn>
        </div>
      );
    }
  )
);

CouponInput.displayName = "CouponInput";

export default CouponInput;
