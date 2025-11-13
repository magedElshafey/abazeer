import { FC } from "react";
import AllProductsHeader from "../components/all-products/AllProductsHeader";
import ProductsFilters from "../components/all-products/ProductsFilters";
import ProductsList from "../components/all-products/ProductsList";
import ProductsFiltersProvider from "../providers/ProductsFiltersProvider";
import ProductsViewProvider from "../providers/ProductsViewProvider";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";

const AllProducts: FC = () => {
  const { data: settings } = useGetWebsiteSettings();

  return (
    <div>
      <div className="w-full flex-center bg-[url('/images/slider-background.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="containerr py-10">
          <div className="h-[300px] flex-center w-full overflow-hidden">
            <img
              src={settings?.product_banner || "/images/1650x420.png"}
              className="rounded-md w-full h-full object-center object-contain"
            />
          </div>
        </div>
      </div>
      <div className="containerr">
        <ProductsFiltersProvider>
          <ProductsViewProvider>
            <AllProductsHeader />
            <div className="flex flex-col lg:flex-row gap-4">
              <ProductsFilters />
              <ProductsList />
            </div>
          </ProductsViewProvider>
        </ProductsFiltersProvider>
      </div>
    </div>
  );
};

export default AllProducts;
