import { FC } from "react";
import { useTranslation } from "react-i18next";
import { OrderItem } from "../../types/orders.types";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface OrderItemCardProps {
    item: OrderItem;
}

const OrderItemCard: FC<OrderItemCardProps> = ({ item }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex gap-4 flex-1">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                    {item.product.image ? (
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaImage className="text-text-gray" size={20} />
                    )}
                </div>
                <div className="flex-1 h-full flex flex-col gap-2">
                    <h4
                        className="font-semibold text-blue-500 hover:underline cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/products/${item.product.id}`)}
                    >
                        {item.product.name}
                    </h4>
                    <p className="text-text-gray text-sm">{item.product.category}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
                <div className="text-gray-600">
                    <span className="font-medium">{t("price")}:</span> {item.price} {t("SAR")}
                </div>
                <div className="text-gray-600">
                    <span className="font-medium">{t("quantity")}:</span> {item.quantity}
                </div>
                <div className="w-full h-px bg-gray-200 my-1"></div>
                <div className="font-semibold text-gray-900">
                    <span className="font-medium">{t("total")}:</span> {item.total} {t("SAR")}
                </div>
            </div>
        </div>
    );
};

export default OrderItemCard;
