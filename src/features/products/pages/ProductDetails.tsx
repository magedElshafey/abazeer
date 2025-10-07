import { FC } from "react";
import { useParams } from "react-router-dom";
import ProductPhotos from "../components/ProductPhotos";
import ProductInfo from "../components/ProductInfo";
import ProductFeatures from "../components/ProductFeatures";
import ProductFooter from "../components/ProductFooter";
import RelatedProducts from "../components/RelatedProducts";
import useGetProductDetails from "../api/useGetProductDetails";
import ProductDetailsSkeleton from "@/common/components/loader/skeltons/ProductDetailsSkeleton";

const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductDetails({
    productId: id || "",
  });

  if (isLoading) {
    return (
      <div className="bg-background-gray min-h-screen pb-10">
        <div className="containerr pt-10">
          <div className="bg-white p-6 lg:p-10 rounded-lg">
            <ProductDetailsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-gray min-h-screen pb-10">
      <div className="containerr pt-10">
        <div className="bg-white p-6 lg:p-10 flex flex-col lg:flex-row gap-2 rounded-lg">
          <div className="flex-1">
            <ProductPhotos media={product?.images || []} />
          </div>

          <div className="w-full lg:w-1/3">
            {product && <ProductInfo product={product} />}
          </div>
          <div className="w-full lg:w-1/5">
            <ProductFeatures />
          </div>
        </div>

        <div className="mt-8 bg-white p-2 rounded-lg">
          <ProductFooter />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg">
          <RelatedProducts products={product?.related_products_data || []} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
