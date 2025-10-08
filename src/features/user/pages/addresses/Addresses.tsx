import { FC } from "react";
import { useTranslation } from "react-i18next";
import useGetUserAddresses from "../../api/addresses/useGetUserAddresses";
import Loader from "@/common/components/loader/spinner/Loader";
import { FiMapPin } from "react-icons/fi";
import EmptyStateCard from "../../components/common/EmptyStateCard";
import AddressCard from "../../components/addresses/AddressCard";

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
        <div className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {t("my addresses")}
                </h1>
                <p className="text-gray-600">
                    {t("manage_addresses_description")}
                </p>
            </div>
            <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <AddressCard
                        key={address.id}
                        address={address}
                    />
                ))}
            </div>
                <EmptyStateCard
                    icon={FiMapPin}
                    link="create"
                    buttonText={t("add_another_address")}
                    title={t("need_another_address")}
                    description={t("add_multiple_addresses_description")}
                    className="bg-blue-100/30 [&>div>div>div]:bg-orangeColor/30 [&>div>div>div>svg]:text-orangeColor"
                />
            </div>
        </div>
    );
};

export default Addresses;


