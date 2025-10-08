import { FC } from "react";
import AllProductsHeader from "../components/all-products/AllProductsHeader";
import AllProductsContent from "../components/all-products/AllProductsContent";
import ProductsContextProvider from "../providers/ProductsProvider";

const AllProducts: FC = () => {
    return (
        <div>
            <div className="w-full flex-center bg-[url('/images/slider-background.jpg')] bg-center bg-cover bg-no-repeat">
                <div className="containerr py-10">
                    <img
                        src="/images/1650x420.png"
                        className="rounded-md"
                    />
                </div>
            </div>
            <div className="containerr">
                <ProductsContextProvider>
                    <AllProductsHeader />
                    <AllProductsContent />
                </ProductsContextProvider>
            </div>
        </div>
    );
}

export default AllProducts;