import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../card/ProductCard";
import ProductListCard from "../card/ProductListCard";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import { useProductsView } from "../../providers/ProductsViewProvider";
import useInfiniteProducts from "../../api/useInfiniteProducts";
import MainBtn from "@/common/components/buttons/MainBtn";
import ProductSkelton from "@/common/components/loader/skeltons/ProductSkelton";

const ProductsList: FC = () => {
  const { t } = useTranslation();

  const { view } = useProductsView();
  // const queryResult = useGetAllProducts();
  const queryResult = useInfiniteProducts();
  const products = (queryResult.data?.pages || []).flatMap((page) => page.data);

  return (
    <div className="w-full flex-1">
      <div className="bg-white rounded-lg">
        <FetchHandler queryResult={queryResult} skeletonType="product">
          {products && products.length > 0 ? (
            <div
              className={`
                            ${
                              view === "cards"
                                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4"
                                : "flex flex-col gap-4"
                            }
                        `}
            >
              {products.map((product) =>
                view === "cards" ? (
                  <ProductCard
                    className="p-2"
                    key={product.id}
                    product={product}
                  />
                ) : (
                  <ProductListCard key={product.id} product={product} />
                )
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500 text-2xl xl:text-4xl">
                {t("No products found")}
              </div>
            </div>
          )}

          {queryResult.isFetchingNextPage && <ProductSkelton />}

          {queryResult.hasNextPage && !queryResult.isFetchingNextPage && (
            <div className="py-10 flex-center">
              <MainBtn
                onClick={() => {
                  queryResult.fetchNextPage();
                }}
              >
                {t("load more")}
              </MainBtn>
            </div>
          )}
        </FetchHandler>
      </div>
    </div>
  );
};

export default memo(ProductsList);
