// hooks
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetHomeSlider from "../api/hero/useGetHomeSlider";
import useGetHomeBanner from "../api/hero/useGetHomeBanner";
import useGetAllProducts from "../../products/api/useGetAllProducts";
import useGetSampleCategories from "../api/categories/useGetSampleCategories";
import useGetBrands from "../../brands/api/useGetBrands";
import useGetBlogs from "../../static-pages/api/blogs/useGetBlogs";
import useGetFlashsale from "../api/flash-sale/useGetFlashsale";
// types
import { Brand } from "../../brands/types/brand.types";
import { Product } from "../../products/types/product.types";
import { CategoriesListType } from "../../categories/types/category.types";
// components
import SEO from "@/common/components/seo/Seo";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import HomeHero from "../components/hero/HomeHero";
import HomeSection from "../components/home-section/HomeSection";
import CategoryCard from "../../categories/components/card/CategoryCard";
import ProductCard from "../../products/components/card/ProductCard";
import BrandsCard from "../../brands/components/card/BrandsCard";
import BlogCard from "../../static-pages/components/blogs/card/BlogCard";
import SectionTitle from "@/common/components/titles/SectionTitle";
import MainBtn from "@/common/components/buttons/MainBtn";
import FlashSaleSection from "../components/flash-sale/components/FlashSaleSection";
// constant
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import useGetAllGallries from "../api/gallery/useGetAllGallries";
import useGetAds from "../api/ads/useGetAds";
import Slider from "@/common/components/slider/Slider";

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
  const blogsQueryResult = useGetBlogs();

  const flashsaleQueryReuslt = useGetFlashsale();
  const sliderQueryResult = useGetHomeSlider();
  const bannerQueryResult = useGetHomeBanner();
  const galleryQueryResult = useGetAllGallries();
  const adsQueryResult = useGetAds();
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/blogs");
  }, [navigate]);
  return (
    <>
      <SEO title={t("home")} />
      <FetchHandler queryResult={sliderQueryResult} skeletonType="slider">
        {sliderQueryResult &&
          sliderQueryResult?.data &&
          bannerQueryResult &&
          bannerQueryResult?.data && (
            <HomeHero
              sliders={sliderQueryResult?.data}
              banner={bannerQueryResult?.data}
            />
          )}
      </FetchHandler>

      <div className="containerr">
        <div className="space-between-sections">
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
        </div>
        <div className="space-between-sections">
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
        </div>
      </div>

      <FetchHandler queryResult={flashsaleQueryReuslt} skeletonType="product">
        {flashsaleQueryReuslt?.data && (
          <div className="space-between-sections">
            <FlashSaleSection data={flashsaleQueryReuslt?.data} />
          </div>
        )}
      </FetchHandler>
      <div className="containerr">
        <div className="space-between-sections">
          <HomeSection<Product, { product: Product }>
            title={t("just landing")}
            queryResult={landingProducts}
            skeletonType="product"
            CardComponent={ProductCard}
            getCardProps={(item) => ({ product: item })}
          />
        </div>
        <div className="space-between-sections">
          <FetchHandler queryResult={galleryQueryResult} skeletonType="image">
            {galleryQueryResult?.data &&
              galleryQueryResult?.data?.length > 0 && (
                <>
                  <Slider
                    title="Pictures from our farms"
                    breakPoints={{
                      "(min-width: 1280px)": {
                        slides: { perView: 7, spacing: 16 },
                      },
                      "(max-width: 1280px)": {
                        slides: { perView: 6, spacing: 16 },
                      },
                      "(max-width: 1024px)": {
                        slides: { perView: 5, spacing: 16 },
                      },
                      "(max-width: 768px)": {
                        slides: { perView: 4, spacing: 16 },
                      },
                      "(max-width: 580px)": {
                        slides: { perView: 3, spacing: 12 },
                      },
                    }}
                  >
                    {galleryQueryResult?.data?.map((item) => (
                      <img
                        key={item?.id}
                        alt={item?.name}
                        src={item?.image || "/images/g.png"}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover rounded-lg"
                      />
                    ))}
                  </Slider>
                </>
              )}
          </FetchHandler>
        </div>
        <div className="space-between-sections">
          <HomeSection<Product, { product: Product }>
            title={t("featured products")}
            queryResult={featuredProducts}
            skeletonType="product"
            CardComponent={ProductCard}
            getCardProps={(item) => ({ product: item })}
          />
        </div>
        <div className="space-between-sections">
          <HomeSection<Product, { product: Product }>
            title={t("essential products")}
            queryResult={essentialProducts}
            skeletonType="product"
            CardComponent={ProductCard}
            getCardProps={(item) => ({ product: item })}
          />
        </div>
        <div className="space-between-sections">
          <FetchHandler queryResult={adsQueryResult} skeletonType="image">
            {adsQueryResult?.data && adsQueryResult?.data?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {adsQueryResult?.data?.map((ad) => (
                  <Link
                    key={ad?.id}
                    to={`/products?filter-category=${ad?.category_id}`}
                    className="block w-full overflow-hidden rounded-xl"
                  >
                    <div className="relative w-full aspect-[688/420]">
                      <img
                        loading="lazy"
                        alt={ad?.category?.name || "Ad image"}
                        src={ad?.image || "/images/placeholder.jpg"}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        decoding="async"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </FetchHandler>
        </div>
        <div className="space-between-sections">
          <FetchHandler queryResult={blogsQueryResult} skeletonType="blog">
            {blogsQueryResult?.data && blogsQueryResult?.data?.length > 0 && (
              <div>
                <div className="flex-between flex-col md:flex-row  mb-6">
                  <SectionTitle title="latest blogs" />
                  {blogsQueryResult?.data?.length > 5 && (
                    <MainBtn text="show more" onClick={handleNavigate} />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5">
                  {blogsQueryResult?.data?.slice(0, 5)?.map((blog) => (
                    <BlogCard key={blog?.id} data={blog} />
                  ))}
                </div>
              </div>
            )}
          </FetchHandler>
        </div>
      </div>
    </>
  );
};

export default Home;
