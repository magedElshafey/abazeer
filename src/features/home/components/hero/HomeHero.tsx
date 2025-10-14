import { FC, memo, useCallback } from "react";
import HomeSlider from "./HomeSlider";
import { SliderHome } from "../../types/slider.types";
import { HomeBanner } from "../../types/banner.types";
import { useNavigate } from "react-router-dom";

interface HomeHeroProps {
  sliders: SliderHome[];
  banner: HomeBanner;
}

const HomeHero: FC<HomeHeroProps> = memo(({ sliders, banner }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/products?filter-in_offer=true");
  }, [navigate]);

  return (
    <section
      className="w-full bg-[url('/images/slider-background.jpg')] bg-no-repeat bg-center bg-cover py-10"
      aria-label="Home hero section"
    >
      <div className="containerr flex flex-col lg:flex-row gap-4 lg:max-h-[500px] overflow-hidden">
        <div className="w-full lg:w-2/3 overflow-hidden">
          <HomeSlider sliders={sliders} />
        </div>

        <button
          onClick={handleNavigate}
          className="w-full lg:w-1/3 overflow-hidden rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-orangeColor"
          aria-label="Go to offers section"
        >
          <img
            src={banner?.image || "/images/600x600.jpg"}
            alt={banner?.description || "Promotional banner"}
            className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    </section>
  );
});

export default HomeHero;
