import { FC } from "react";
import HomeHero from "./components/HomeHero";

const Home: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <HomeHero />
    </div>
  );
};

export default Home;
