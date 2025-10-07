import { FC } from "react";
import { Link } from "react-router-dom";
import ProductRate from "./ProductRate";
import { useTranslation } from "react-i18next";
import MainBtn from "../../../common/components/buttons/MainBtn";
import { CiShoppingCart } from "react-icons/ci";
import ProductQuantity from "./ProductQuantity";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import { ProductDetails } from "../types/product.types";
import HtmlConverter from "../../../common/components/htmlConverter/HtmlConverter";

type Props = Pick<ProductDetails, "sale_price" | "name" | "price" | "description" | "stock_status" | "stock_quantity" | "category" | "brand" | "average_rate" | "reviews" | "has_discount">;

const ProductInfo: FC<Props> = ({ 
    sale_price,
    name,
    price,
    brand,
    category,
    description,
    stock_quantity,
    stock_status,
    average_rate,
    reviews,
    has_discount
}) => {
    const { t } = useTranslation();

    return (
        <div className="px-2 flex flex-col gap-4">
            <div className="border-b pb-4">
                <p className="text-inherit text-xl mb-2 text-wrap">
                    {name}
                </p>
                <ProductRate rating={average_rate} reviewCount={reviews.length} />
            </div>
            <div>
                <p className="inline text-2xl font-bold text-text-darkRed">
                    {has_discount ? sale_price : price} {t("SAR")}
                </p>
                <span className="invisible">
                    place
                </span>
                {has_discount && (
                    <p className="inline text-lg font-bold text-text-gray opacity-60 line-through">
                        {price} {t("SAR")}
                    </p>
                )}
            </div>
            <div className="appearance-auto">
                <HtmlConverter html={description} />
            </div>
            <div className={`text-sm w-fit flex items-center gap-4 rounded border py-1 px-2 ${
                stock_status === 'in_stock' 
                    ? 'bg-background-green/20 border-background-green' 
                    : 'bg-red-50 border-red-300'
            }`}>
                <p>
                    {t("availability")}
                </p>
                <p className={stock_status === 'in_stock' ? 'text-background-green' : 'text-red-600'}>
                    {stock_quantity} {t("currently available")}
                </p>
            </div>
            <div>
                <p>
                    {t("quantity")}
                </p>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 mt-1">
                    <ProductQuantity className="w-full" />
                    <MainBtn
                        className="w-full"
                    >
                        <div className="flex-center gap-2">
                            <CiShoppingCart />
                            <p>
                                {t("add_to_cart")}
                            </p>
                        </div>
                    </MainBtn>
                    <MainBtn
                        className="w-full py-1"
                        theme="secondary"
                    >
                        {t("buy_now")}
                    </MainBtn>
                </div>
            </div>
            <div className="flex items-center gap-5 pb-4 border-b">
                <div className="flex items-center gap-2">
                    <FaRegHeart />
                    <p className="text-lg pb-1">
                        {t("wishlist")}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <GoGitCompare />
                    <p className="text-lg pb-1">
                        {t("compare")}
                    </p>
                </div>
            </div>
            
            {/* Product Metadata Section */}
            <div className="space-y-3">
                {/* Brand */}
                {brand && (
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 me-2">{t("brand")}:</span>
                        <Link 
                            to={`/products?brand=${brand.id}`}
                            className="text-gray-600 hover:text-orangeColor hover:underline transition-colors duration-200"
                        >
                            {brand.name}
                        </Link>
                    </div>
                )}
                
                {/* Category */}
                {category && (
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 me-2">{t("category")}:</span>
                        <Link 
                            to={`/products?category=${category.id}`}
                            className="text-gray-600 hover:text-orangeColor hover:underline transition-colors duration-200"
                        >
                            {category.name}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductInfo;