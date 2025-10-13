import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";

interface Props {
    product: ProductDetails;
}

const ProductSpecifications: FC<Props> = ({ product }) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-light pb-3 border-b-2 border-orangeColor">
                {t("technical_specifications")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.properties && product.properties.length > 0 ? (
                    product.properties.map((property) => (
                        <div key={property.id} className="space-y-2">
                            <div className="flex justify-between border-b pb-1">
                                <span className="font-medium">{property.name}</span>
                                {property.image && (
                                    <img 
                                        src={property.image} 
                                        alt={property.name}
                                        className="h-6 w-6 object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                        {t("no_specifications_available")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSpecifications;

