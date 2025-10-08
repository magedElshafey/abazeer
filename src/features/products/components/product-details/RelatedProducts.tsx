import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useKeenSlider } from "keen-slider/react";
import { MdProductionQuantityLimits } from "react-icons/md";
import "keen-slider/keen-slider.min.css";
import type { Product } from "../../types/product.types";
import ProductCard from "../card/ProductCard";
import EmptyData from "@/common/components/empty-data/EmptyData";

interface RelatedProductsProps {
    products: Product[];
}

const RelatedProducts: FC<RelatedProductsProps> = ({ products }) => {
    const { t } = useTranslation();
    
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: false,
            mode: "snap",
            slides: {
                perView: 4,
                spacing: 16,
            },
            breakpoints: {
                "(max-width: 1024px)": {
                    slides: {
                        perView: 3,
                        spacing: 16,
                    },
                },
                "(max-width: 768px)": {
                    slides: {
                        perView: 2,
                        spacing: 16,
                    },
                },
                "(max-width: 480px)": {
                    slides: {
                        perView: 1,
                        spacing: 16,
                    },
                },
            },
        },
        []
    );

    const nextSlide = () => {
        instanceRef.current?.next();
    };

    const prevSlide = () => {
        instanceRef.current?.prev();
    };

    // If no products, show empty state
    if (!products || products.length === 0) {
        return (
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-text-light mb-6">
                    {t("related-products") || "Related Products"}
                </h2>
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <MdProductionQuantityLimits className="w-20 h-20 text-gray-400 mb-4" />
                    <EmptyData title="No related products found" />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-text-light mb-6">
                {t("related-products") || "Related Products"}
            </h2>
            
            {/* Keen Slider container */}
            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:shadow-xl"
                >
                    <IoChevronBack className="w-6 h-6 text-gray-600" />
                </button>
                
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:shadow-xl"
                >
                    <IoChevronForward className="w-6 h-6 text-gray-600" />
                </button>

                {/* Keen Slider */}
                <div ref={sliderRef} className="keen-slider px-12">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="keen-slider__slide"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
