import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    discount?: number;
};

// Sample data - in a real app, this would come from props or API
const relatedProducts: Product[] = [
        {
            id: 1,
            title: "Wireless Bluetooth Headphones",
            image: "/images/600x600.jpg",
            price: 299.99,
            oldPrice: 399.99,
            discount: 25
        },
        {
            id: 2,
            title: "Smart Watch Series 5",
            image: "/images/600x600.jpg",
            price: 199.50,
            oldPrice: 249.99,
            discount: 20
        },
        {
            id: 3,
            title: "Portable Power Bank 10000mAh",
            image: "/images/600x600.jpg",
            price: 49.99,
            oldPrice: 69.99,
            discount: 29
        },
        {
            id: 4,
            title: "USB-C Fast Charging Cable",
            image: "/images/600x600.jpg",
            price: 19.99
        },
        {
            id: 5,
            title: "Wireless Gaming Mouse",
            image: "/images/600x600.jpg",
            price: 79.99,
            oldPrice: 99.99,
            discount: 20
        },
        {
            id: 6,
            title: "Bluetooth Speaker Pro",
            image: "/images/600x600.jpg",
            price: 129.99,
            oldPrice: 159.99,
            discount: 19
        }
    ];

const RelatedProducts: FC = () => {
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
                    {relatedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="keen-slider__slide"
                        >
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full hover:shadow-md transition-shadow duration-200">
                                {/* Product Image */}
                                <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                
                                {/* Product Title */}
                                <h3 className="text-lg font-medium text-text-light mb-3 line-clamp-2 min-h-[3.5rem]">
                                    {product.title}
                                </h3>
                                
                                {/* Price Section */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xl font-bold text-orangeColor">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.oldPrice && (
                                        <del className="text-lg text-text-gray opacity-60 line-through">
                                            ${product.oldPrice.toFixed(2)}
                                        </del>
                                    )}
                                    {product.discount && (
                                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
