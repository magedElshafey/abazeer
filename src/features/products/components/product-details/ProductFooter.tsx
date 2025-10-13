import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";
import Reviews from "./Reviews";

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
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-light pb-3 border-b-2 border-orangeColor">{t("technical_specifications")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Brand</span>
                                    <span className="text-gray-600">AudioTech</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Model</span>
                                    <span className="text-gray-600">AT-2024</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Connectivity</span>
                                    <span className="text-gray-600">Bluetooth 5.0</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Battery Life</span>
                                    <span className="text-gray-600">20 hours</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Dimensions</span>
                                    <span className="text-gray-600">15 x 8 x 5 cm</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Weight</span>
                                    <span className="text-gray-600">450g</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Water Resistance</span>
                                    <span className="text-gray-600">IPX4</span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                    <span className="font-medium">Warranty</span>
                                    <span className="text-gray-600">2 years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
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