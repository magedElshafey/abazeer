import Slider from "../../common/components/slider/Slider";
import CategoryCard from "../categories/components/card/CategoryCard";
import HomeHero from "./components/HomeHero";

const Home = () => {
  // Mock category data
  const mockCategory = {
    id: 1,
    image: "/images/400x400.png", // Using existing image from public folder
    title: "Electronics"
  };

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
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
          <CategoryCard
            category={mockCategory}
          />
        </Slider>
      </div>
    </div>
  );
};
export default Home;
