import Slider from "../../common/components/slider/Slider";
import CategoryCard from "../categories/components/card/CategoryCard";
import ProductCard from "../products/components/card/ProductCard";
import HomeHero from "./components/HomeHero";
import useGetAllProducts from "../products/api/useGetAllProducts";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import EmptyData from "@/common/components/empty-data/EmptyData";
const Home = () => {
  const queryResult = useGetAllProducts();
  // Mock category data
  const mockCategory = {
    id: 1,
    image: "/images/400x400.png", // Using existing image from public folder
    title: "Electronics",
  };
  // const product: {
  //   id: number;
  //   title: string;
  //   category: string;
  //   image: string;
  //   reviews: {
  //     avg: number;
  //     total: number;
  //   };
  //   quantity: number;
  //   remaining: number;
  //   price_before_disccount: number;
  //   price_afterDisccount: number;
  //   disccount_percentage: number;
  // } = {
  //   id: 1,
  //   image: "../../../public",
  //   title: "test",
  //   category: "category test",
  //   reviews: {
  //     avg: 4,
  //     total: 25,
  //   },
  //   quantity: 150,
  //   remaining: 4,
  //   price_afterDisccount: 100,
  //   price_before_disccount: 2500,
  //   disccount_percentage: 40,
  // };
  return (
    <div className="flex flex-col gap-4">
      <HomeHero />
      <div className="containerr">
        <Slider
          sliderPerView={8}
          title="categories"
          spacing={10}
          loop
          breakPoints={{
            "(max-width: 1024px)": {
              slides: {
                perView: 6,
                spacing: 16,
              },
            },
            "(max-width: 768px)": {
              slides: {
                perView: 4,
                spacing: 16,
              },
            },
            "(max-width: 580px)": {
              slides: {
                perView: 2,
                spacing: 16,
              },
            },
          }}
        >
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
          <CategoryCard category={mockCategory} />
        </Slider>
        <div className="my-4">
          <FetchHandler queryResult={queryResult} skeletonType="product">
            <Slider
              title="products"
              spacing={10}
              loop
              breakPoints={{
                "(min-width: 1024px)": {
                  slides: {
                    perView: 6,
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
                    perView: 1,
                    spacing: 16,
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
