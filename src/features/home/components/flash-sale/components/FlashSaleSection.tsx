import React from "react";
import { Flashsale } from "@/features/products/types/flashSale.types";
import { useCountdown } from "../hooks/useCountdown";
import { useTranslation } from "react-i18next";
import Slider from "@/common/components/slider/Slider";
import ProductCard from "@/features/products/components/card/ProductCard";
const defaultBreakPoints = {
  "(min-width: 1280px)": { slides: { perView: 5, spacing: 16 } },
  "(max-width: 1280px)": { slides: { perView: 4, spacing: 16 } },
  "(max-width: 1024px)": { slides: { perView: 3, spacing: 16 } },
  "(max-width: 768px)": { slides: { perView: 2, spacing: 16 } },
  "(max-width: 580px)": { slides: { perView: 1, spacing: 12 } },
};
interface FlashSaleSectionProps {
  data: Flashsale;
}
const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ data }) => {
  const { t } = useTranslation();
  const countdown = useCountdown(data.end_date);

  if (countdown.isExpired) return null;

  return (
    <section className="bg-orange-50 py-10">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
          ⚡ {t("Flash Sale")}
        </h2>

        {/* Timer */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl shadow-md px-4 py-3 text-center w-20"
            >
              <p className="text-xl font-bold text-orange-600">{item.value}</p>
              <p className="text-sm text-gray-500">{t(item.label)}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <Slider loop spacing={10} breakPoints={defaultBreakPoints}>
          {data?.products.map((item, index: number) => (
            <ProductCard product={item} key={item?.id || index} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default React.memo(FlashSaleSection);
