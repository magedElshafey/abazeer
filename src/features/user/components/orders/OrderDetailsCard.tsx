import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface OrderDetailsCardProps {
    title: string;
    children: React.ReactNode;
}

const OrderDetailsCard: FC<PropsWithChildren<OrderDetailsCardProps>> = ({
    title,
    children
}) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(title)}
                </h3>
                <div className="h-1 bg-orangeColor rounded"></div>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
};

export default OrderDetailsCard;
