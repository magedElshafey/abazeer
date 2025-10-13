import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";
import Reviews from "./Reviews";
import ProductSpecifications from "./ProductSpecifications";

type MenuItem = {
    id: string;
    label: string;
};

interface Props {
    product: ProductDetails;
}

const ProductFooter: FC<Props> = ({ product }) => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState("description");

    const menuItems: MenuItem[] = [
        { id: "description", label: "description" },
        { id: "specifications", label: "specifications" },
        { id: "reviews", label: "reviews" },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case "description":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-light pb-3 border-b-2 border-orangeColor">{t("product_description")}</h3>
                        <HtmlConverter html={product?.long_description} />
                    </div>
                );
            case "specifications":
                return <ProductSpecifications product={product} />;
            case "reviews":
                return <Reviews product={product!} />;
            default:
                return null;
        }
    };

    return (
        <div className="mt-8">
            {/* Mobile and Medium Screens: Vertical Layout */}
            <div className="block lg:hidden">
                <div className="space-y-6">
                    {/* Menu Items */}
                    <div className="bg-background-gray rounded-md p-4">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`text-left px-4 py-3 rounded transition-colors ${
                                        activeSection === item.id
                                            ? "bg-orangeColor text-white"
                                            : "hover:bg-gray-200 text-text-light"
                                    }`}
                                >
                                    {t(item.label)}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Large Screens: 1/4 to 3/4 Layout */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
                {/* Menu Items - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="bg-background-gray rounded-md p-4 top-4">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`text-left px-4 py-3 rounded transition-colors ${
                                        activeSection === item.id
                                            ? "bg-orangeColor text-white"
                                            : "hover:bg-gray-200 text-text-light"
                                    }`}
                                >
                                    {t(item.label)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Content - 3/4 width */}
                <div className="lg:col-span-3">
                    <div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFooter;