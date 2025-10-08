import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import useGetAllProducts from "../products/api/useGetAllProducts";
import useGetSampleCategories from "./api/categories/useGetSampleCategories";
import useGetBrands from "../brands/api/useGetBrands";
import HomeHero from "./components/HomeHero";
import CategoryCard from "../categories/components/card/CategoryCard";
import ProductCard from "../products/components/card/ProductCard";
import BrandsCard from "../brands/components/card/BrandsCard";
import { useTranslation } from "react-i18next";
import { Brand } from "../brands/types/brand.types";
import { Product } from "../products/types/product.types";
import { CategoriesListType } from "../categories/types/category.types";
import HomeSection from "./components/home-section/HomeSection";
import SEO from "@/common/components/seo/Seo";
const Home = () => {
  const { t } = useTranslation();

  const landingProducts = useGetAllProducts({
    landing: true,
    delay: delayOptions,
  });
  const featuredProducts = useGetAllProducts({
    featured: true,
    delay: delayOptions,
  });
  const essentialProducts = useGetAllProducts({
    essential: true,
    delay: delayOptions,
  });
  const categories = useGetSampleCategories();
  const brands = useGetBrands({ featured: true, delay: delayOptions });
  return (
    <>
      <SEO title={t("home")} />
      <HomeHero />
      <div className="containerr space-y-14">
        <HomeSection<CategoriesListType, { category: CategoriesListType }>
          title={t("shop with categories")}
          queryResult={categories}
          skeletonType="category"
          CardComponent={CategoryCard}
          getCardProps={(item) => ({ category: item })}
          breakPoints={{
            "(min-width: 1400px)": { slides: { perView: 7, spacing: 16 } },
            "(max-width: 1400px)": { slides: { perView: 6, spacing: 16 } },
            "(max-width: 1280px)": { slides: { perView: 5, spacing: 16 } },
            "(max-width: 1024px)": { slides: { perView: 4, spacing: 16 } },
            "(max-width: 768px)": { slides: { perView: 3, spacing: 16 } },
            "(max-width: 580px)": { slides: { perView: 2, spacing: 12 } },
          }}
        />

        <HomeSection<Brand, { brand: Brand }>
          title={t("featured brands")}
          queryResult={brands}
          skeletonType="brand"
          CardComponent={BrandsCard}
          getCardProps={(item) => ({ brand: item })}
          breakPoints={{
            "(max-width: 1400px)": { slides: { perView: 5, spacing: 16 } },
            "(max-width: 1280px)": { slides: { perView: 4, spacing: 16 } },
            "(max-width: 1024px)": { slides: { perView: 3, spacing: 16 } },
            "(max-width: 768px)": { slides: { perView: 2, spacing: 16 } },
            "(max-width: 580px)": { slides: { perView: 1, spacing: 12 } },
          }}
        />

        <HomeSection<Product, { product: Product }>
          title={t("just landing")}
          queryResult={landingProducts}
          skeletonType="product"
          CardComponent={ProductCard}
          getCardProps={(item) => ({ product: item })}
        />

        <HomeSection<Product, { product: Product }>
          title={t("featured products")}
          queryResult={featuredProducts}
          skeletonType="product"
          CardComponent={ProductCard}
          getCardProps={(item) => ({ product: item })}
        />

        <HomeSection<Product, { product: Product }>
          title={t("essential products")}
          queryResult={essentialProducts}
          skeletonType="product"
          CardComponent={ProductCard}
          getCardProps={(item) => ({ product: item })}
        />
      </div>
    </>
  );
};

export default Home;
