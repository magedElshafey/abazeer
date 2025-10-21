import { FC } from "react";
import { useTranslation } from "react-i18next";
import DialogComponent from "@/common/components/dialog/dialog";
import MainBtn from "@/common/components/buttons/MainBtn";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { FaTimes } from "react-icons/fa";

interface CancelOrderButtonProps {
    orderId: string | number;
}

const CancelOrderButton: FC<CancelOrderButtonProps> = ({ orderId }) => {
    const { t } = useTranslation();

    const handleCancelOrder = async () => {
        const response = await Axios.post(`${apiRoutes.orders}/${orderId}/cancel`);
        return response;
    };

    return (
        <DialogComponent
            header={{
                title: "cancel_order",
            }}
            content={
                <div className="py-4 space-y-3">
                    <p className="text-gray-700">
                        {t("cancel_order_confirmation")}
                    </p>
                </div>
            }
            action={{
                action: handleCancelOrder,
                text: "cancel_order",
            }}
            cancel={{
                text: "cancel",
            }}
            queryKey={[apiRoutes.orders]}
            type="danger"
        >
            <MainBtn
                theme="danger"
                className="flex items-center gap-2 px-4 !w-full"
                aria-label={t("cancel_order")}
            >
                <FaTimes size={16} />
                {t("cancel_order")}
            </MainBtn>
        </DialogComponent>
    );
};

export default CancelOrderButton;
