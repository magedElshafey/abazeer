import { useRef, useCallback, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import "./double-slider.css";
import { useProductsFilters } from "@/features/products/providers/ProductsFiltersProvider";

interface PriceFilterProps {
  initialMin?: number;
  step?: number;
  initialMax?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  initialMin = 0,
  initialMax = 10000,
  step=100
}) => {
  const { t, i18n } = useTranslation();
  const {
    filters: {
      price_from,
      price_to
    },
    handleChangeFilters
  } = useProductsFilters();


  const minPrice = parseInt(price_from || "") || initialMin;
  const maxPrice = parseInt(price_to || "") || initialMax;

  const minValRef = useRef(minPrice || 0);
  const maxValRef = useRef(maxPrice || 25000);
  const range = useRef<HTMLDivElement>(null);
  // Convert to percentage
  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - initialMin) / (initialMax - initialMin)) * 100),
    [initialMin, initialMax]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minPrice || 0);
    const maxPercent = getPercent(maxPrice || 25000);

    if (range.current) {
      // Check if the current language is Arabic
      if (i18n.language === "ar") {
        range.current.style.right = `${minPercent}%`; // Apply style for Arabic
      } else {
        range.current.style.left = `${minPercent}%`; // Apply default style
      }

      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minPrice, maxPrice, getPercent, i18n.language]);
  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxPrice || 25000);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxPrice, getPercent]);
  
  return (
    <div className="my-5">
      <div className="flex-center relative">
        <input
          type="range"
          min={initialMin}
          max={initialMax}
          value={minPrice}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxPrice);
            handleChangeFilters("price_from", value.toString(), true);
            minValRef.current = value;
          }}
          className={`thumb thumbLeft`}
          step={step}
          style={{ zIndex: minPrice > minPrice - 100 ? 5 : undefined }}
          />
        <input
          type="range"
          min={initialMin}
          max={initialMax}
          value={maxPrice}
          step={step}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minPrice);
            handleChangeFilters("price_to", value.toString(), true);
            maxValRef.current = value;
          }}
          className={`thumb thumbRight`}
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p>
          <div className="flex items-center">
            {minPrice} {t("SAR")}
          </div>
        </p>
        <p>
          <div className="flex items-center">
            {maxPrice} {t("SAR")}
          </div>
        </p>
      </div>
    </div>
  );
};

export default memo(PriceFilter);
