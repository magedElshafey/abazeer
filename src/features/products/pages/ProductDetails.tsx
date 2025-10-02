import { FC } from "react";
import ProductPhotos from "../components/ProductPhotos";
import ProductInfo from "../components/ProductInfo";
import ProductFeatures from "../components/ProductFeatures";

const ProductDetails: FC = () => {
    return (
        <div className="bg-background-gray min-h-screen">
            <div className="containerr pt-10">
                <div className="bg-white p-6 lg:p-10 flex flex-col lg:flex-row gap-2 rounded-lg">
                    {/* Product Photos Section */}
                    <div className="flex-1">
                        <ProductPhotos />
                    </div>
                    
                    {/* Product Information Section */}
                    <div className="w-full lg:w-1/3">
                        <ProductInfo />
                    </div>
                    <div className="w-full lg:w-1/5">
                        <ProductFeatures />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;