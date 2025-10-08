import { FC } from "react";
import FavoritesTable from "../components/FavoritesTable";
import Hero from "@/common/components/hero/Hero";

const Favorites: FC = () => {
    return (
        <div>
            <Hero title="favorites" />
            <FavoritesTable />
        </div>
    );
};

export default Favorites;


