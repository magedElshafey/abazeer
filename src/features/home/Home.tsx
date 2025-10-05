import CategoryCard from "../categories/components/card/CategoryCard";
import HomeHero from "./components/HomeHero";
const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <CategoryCard />
      <HomeHero />
    </div>
  );
};
export default Home;
