import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import { useProductsView } from "../../providers/ProductsViewProvider";

const ViewToggle: FC = () => {
    const {view, setView} = useProductsView();
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-2">
            <span className="font-medium text-text-gray hidden sm:inline">{t("view")}</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                    type="button"
                    onClick={() => setView("cards")}
                    className={`p-2 transition-colors ${
                        view === "cards" 
                            ? "bg-orangeColor text-white" 
                            : "bg-white text-text-gray hover:bg-gray-50"
                    }`}
                    aria-label={t("grid_view")}
                >
                    <HiViewGrid size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`p-2 transition-colors ${
                        view === "list" 
                            ? "bg-orangeColor text-white" 
                            : "bg-white text-text-gray hover:bg-gray-50"
                    }`}
                    aria-label={t("list_view")}
                >
                    <HiViewList size={18} />
                </button>
            </div>
        </div>
    );
};

export default memo(ViewToggle);
