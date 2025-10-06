import { FC } from "react"
import Avatar from "@/common/components/avatar/Avatar";
import ProfileCard from "../components/ProfileCard";
import { FiPackage, FiMapPin, FiSettings, FiShoppingCart } from "react-icons/fi";
import MainBtn from "@/common/components/buttons/MainBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/store/AuthProvider";

const Overview: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { name } = user!;

    const avatarUrl = "/images/600x600.jpg"; // fallback image from public

    return (
        <div className="flex items-center gap-4 sm:gap-6 flex-col">
            <div className="w-full border p-5 rounded-md flex flex-col items-center gap-2">
                <Avatar url={avatarUrl} alt={name} size={100} />
                <div className="flex flex-col gap-1 text-center">
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                        {t("welcome_back_user", { username: name })}
                    </p>
                    <p className="text-text-gray text-sm sm:text-base">
                        {t("overview_subtitle")}
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <ProfileCard
                        theme="order"
                        icon={FiPackage}
                        title={t("view_orders")}
                        description={t("view_orders_description")}
                        link="orders"
                        buttonText={t("view_orders_button")}
                    />
                </div>
                <div className="flex-1">
                    <ProfileCard
                        theme="addresses"
                        icon={FiMapPin}
                        title={t("manage_addresses")}
                        description={t("manage_addresses_description")}
                        link="addresses"
                        buttonText={t("manage_addresses_button")}
                    />
                </div>
                <div className="flex-1">
                    <ProfileCard
                        theme="settings"
                        icon={FiSettings}
                        title={t("account_settings")}
                        description={t("edit_account_description")}
                        link="settings"
                        buttonText={t("edit_account_button")}
                    />
                </div>
            </div>
            <div className="w-full rounded-md border bg-cyan-50 p-4 sm:p-5 flex items-center gap-4">
                <div className="p-4 rounded-full flex-center bg-cyan-400 text-white">
                    <FiShoppingCart size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg">{t("orders_banner_title")}</p>
                    <p className="text-sm text-gray-600 truncate sm:whitespace-normal sm:line-clamp-2">{t("orders_banner_description")}</p>
                </div>
                <div className="shrink-0">
                    <Link to="/" className="block">
                        <MainBtn className="!bg-cyan-400 !text-black">
                            {t("orders_banner_cta")}
                        </MainBtn>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Overview;