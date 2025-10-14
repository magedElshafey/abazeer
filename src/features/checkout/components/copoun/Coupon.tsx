import { memo, Suspense } from "react";
import { useTranslation } from "react-i18next";
import useGetAllCopouns from "../../api/copoun/useGetAllCopouns";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import CouponCard from "./CouponCard";
import EmptyData from "@/common/components/empty-data/EmptyData";
import { Loader } from "lucide-react";

const Coupon = memo(() => {
  const { t } = useTranslation();
  const queryResult = useGetAllCopouns();

  return (
    <section
      className="rounded-lg p-4 border border-dashed border-blue-400 bg-white shadow-sm"
      aria-label={t("available coupons")}
    >
      <FetchHandler queryResult={queryResult} skeletonType="coupon">
        <Suspense
          fallback={
            <div className="text-center text-gray-500 flex items-center justify-center py-4">
              <Loader className="animate-spin mr-2" />
              {t("loading coupons...")}
            </div>
          }
        >
          <header className="flex items-center w-fit gap-2 py-2 px-3 mb-4 border rounded-md bg-blue-50">
            <img
              src="/images/coupon-code.gif"
              alt={t("coupon icon")}
              loading="lazy"
              width={28}
              height={28}
              className="object-contain"
            />
            {queryResult?.data?.length ? (
              <p className="text-sm text-gray-700">
                {t("coupon codes")} ({queryResult.data.length})
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                {t("no coupons available")}
              </p>
            )}
          </header>

          {queryResult?.data?.length ? (
            <ul className="space-y-3">
              {queryResult.data.map((coupon) => (
                <CouponCard key={coupon.id} data={coupon} />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center py-4">
              <EmptyData title={t("no coupons found")} />
            </div>
          )}
        </Suspense>
      </FetchHandler>
    </section>
  );
});

export default Coupon;
