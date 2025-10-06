import { FC } from "react";
import { useTranslation } from "react-i18next";
import useGetUserAddresses from "../../api/addresses/useGetUserAddresses";
import Loader from "@/common/components/loader/spinner/Loader";
import { FiMapPin } from "react-icons/fi";
import EmptyStateCard from "../../components/common/EmptyStateCard";

const Addresses: FC = () => {
    const { t } = useTranslation();
    const { data: addresses, isLoading } = useGetUserAddresses();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                    <Loader />
                    <span className="text-text-light">{t("loading")}</span>
                </div>
            </div>
        );
    }

    if (!addresses || addresses.length === 0) {
        return (
            <EmptyStateCard
                icon={FiMapPin}
                link="create"
                buttonText={t("add_first_address")}
                title={t("no_addresses_title")}
                description={t("no_addresses_description")}
            />
        );
    }

    return (
        <div>
            {/* Addresses will be rendered here in the future */}
        </div>
    );
};

export default Addresses;


