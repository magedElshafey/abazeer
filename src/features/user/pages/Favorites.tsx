import { FC } from "react";
import FavoritesTable from "../components/FavoritesTable";
import { useTranslation } from "react-i18next";

const Favorites: FC = () => {
    const {t} = useTranslation();

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {t("favorites")}
            </h1>
            <FavoritesTable />
        </div>
    );
};

export default Favorites;


