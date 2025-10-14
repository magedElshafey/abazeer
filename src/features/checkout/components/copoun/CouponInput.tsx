// import { useTranslation } from "react-i18next";
// import { Loader } from "lucide-react";
// import { toast } from "sonner";
// import handlePromisError from "@/utils/handlePromiseError";
// import useApplyCoupon from "../../api/copoun/useApplyCoupon";

// interface CouponInputProps {
//   code?: string;
//   readOnly?: boolean;
//   handleCodeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   setCode?: React.Dispatch<React.SetStateAction<string>>;
//   setShowCouponInput?: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const CouponInput: React.FC<CouponInputProps> = ({
//   code = "",
//   readOnly = false,
//   handleCodeChange = undefined,
//   setCode = undefined,
//   setShowCouponInput = undefined,
// }) => {
//   const { t } = useTranslation();
//   const { isPending, mutateAsync } = useApplyCoupon();
//   const handleClick = async (code: string) => {
//     try {
//       const response = await mutateAsync({ code });
//       if (response?.status) {
//         toast.success(response?.message);
//         if (!readOnly) {
//           if (setCode && setShowCouponInput) {
//             setCode("");
//             setShowCouponInput(false);
//           }
//         }
//       }
//     } catch (error) {
//       handlePromisError(error);
//     }
//   };
//   return (
//     <div className="flex-between py-2 px-5 bg-[#efefef] rounded-md">
//       <input
//         type="text"
//         readOnly={readOnly}
//         value={code ? code : ""}
//         className="bg-transparent border-none outline-none"
//         placeholder={t("enter your coupon code")}
//         onChange={handleCodeChange}
//       />
//       <button
//         disabled={!code || isPending}
//         onClick={() => handleClick(code ?? "")}
//         className="flex-center rounded-md py-2 px-4 text-white bg-blue-500 cursor-pointer disabled:bg-blue-500/50 disabled:cursor-not-allowed"
//       >
//         {isPending ? <Loader /> : t("apply")}
//       </button>
//     </div>
//   );
// };

// export default CouponInput;
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import handlePromisError from "@/utils/handlePromiseError";
import useApplyCoupon from "../../api/copoun/useApplyCoupon";
import MainBtn from "@/common/components/buttons/MainBtn";

interface CouponInputProps {
  code?: string;
  readOnly?: boolean;
  handleCodeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
  setShowCouponInput?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponInput: React.FC<CouponInputProps> = memo(
  ({
    code = "",
    readOnly = false,
    handleCodeChange,
    setCode,
    setShowCouponInput,
  }) => {
    const { t } = useTranslation();
    const { isPending, mutateAsync } = useApplyCoupon();

    const handleClick = useCallback(async () => {
      if (!code) return;

      try {
        const response = await mutateAsync({ code });
        if (response?.status) {
          toast.success(response.message);

          if (!readOnly && setCode && setShowCouponInput) {
            setCode("");
            setShowCouponInput(false);
          }
        }
      } catch (error) {
        handlePromisError(error);
      }
    }, [code, readOnly, mutateAsync, setCode, setShowCouponInput]);

    return (
      <div
        className="flex-between py-2 px-4 bg-gray-100 rounded-md focus-within:ring-2 focus-within:ring-orange-400"
        aria-label={t("coupon input")}
      >
        <label htmlFor="coupon-code" className="sr-only">
          {t("coupon code")}
        </label>
        <input
          id="coupon-code"
          type="text"
          readOnly={readOnly}
          value={code}
          placeholder={t("enter your coupon code")}
          onChange={handleCodeChange}
          aria-invalid={!readOnly && !code ? true : false}
          className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-500"
        />
        <MainBtn
          type="button"
          disabled={!code || isPending}
          onClick={handleClick}
          // className="ml-3 flex-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all"
          aria-label={t("apply coupon")}
        >
          {isPending ? (
            <Loader className="animate-spin w-4 h-4" aria-hidden="true" />
          ) : (
            t("apply")
          )}
        </MainBtn>
      </div>
    );
  }
);

export default CouponInput;
