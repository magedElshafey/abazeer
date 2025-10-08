import useGetAllProducts from "../products/api/useGetAllProducts";
import useGetSampleCategories from "./api/categories/useGetSampleCategories";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import Slider from "../../common/components/slider/Slider";
import CategoryCard from "../categories/components/card/CategoryCard";
import ProductCard from "../products/components/card/ProductCard";
import HomeHero from "./components/HomeHero";
import EmptyData from "@/common/components/empty-data/EmptyData";
const Home = () => {
  const queryResult = useGetAllProducts();
  const categoriesQueryResult = useGetSampleCategories();
  console.log("categories", categoriesQueryResult?.data);
  return (
    <div className="flex flex-col gap-4">
      <HomeHero />
      <div className="containerr">
        <FetchHandler
          queryResult={categoriesQueryResult}
          skeletonType="category"
        >
          {queryResult?.data && queryResult?.data?.length ? (
            <Slider
              title="shop with categories"
              spacing={10}
              loop
              breakPoints={{
                "(min-width: 1280px)": {
                  slides: {
                    perView: 6,
                    spacing: 16,
                  },
                },
                "(max-width: 1280px)": {
                  slides: {
                    perView: 5,
                    spacing: 16,
                  },
                },
                "(max-width: 1024px)": {
                  slides: {
                    perView: 4,
                    spacing: 16,
                  },
                },
                "(max-width: 768px)": {
                  slides: {
                    perView: 3,
                    spacing: 16,
                  },
                },
                "(max-width: 580px)": {
                  slides: {
                    perView: 2,
                    spacing: 12,
                  },
                },
              }}
            >
              {categoriesQueryResult?.data?.map((item) => (
                <CategoryCard key={item?.id} category={item} />
              ))}
            </Slider>
          ) : (
            <EmptyData />
          )}
        </FetchHandler>

        <div className="space-between-sections">
          <FetchHandler queryResult={queryResult} skeletonType="product">
            <Slider
              title="products"
              spacing={10}
              loop
              breakPoints={{
                "(min-width: 1280px)": {
                  slides: {
                    perView: 5,
                    spacing: 16,
                  },
                },
                "(max-width: 1280px)": {
                  slides: {
                    perView: 4,
                    spacing: 16,
                  },
                },
                "(max-width: 1024px)": {
                  slides: {
                    perView: 3,
                    spacing: 16,
                  },
                },
                "(max-width: 768px)": {
                  slides: {
                    perView: 2,
                    spacing: 16,
                  },
                },
                "(max-width: 580px)": {
                  slides: {
                    perView: 1,
                    spacing: 12,
                  },
                },
              }}
            >
              {queryResult?.data?.length ? (
                queryResult?.data?.map((item) => (
                  <ProductCard key={item?.id} product={item} />
                ))
              ) : (
                <EmptyData />
              )}
            </Slider>
          </FetchHandler>
        </div>
      </div>
    </div>
  );
};
export default Home;
