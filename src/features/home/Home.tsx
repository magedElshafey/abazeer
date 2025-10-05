import BrandsCard from "../brands/components/card/BrandsCard";

const brand = {
  image: "../../../public/images/card-big-image.png",
  id: 1,
  title: "test",
  category: "test category",
};
const Home = () => {
  return (
    <div className="containerr">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <BrandsCard brand={brand} />
      </div>
    </div>
  );
};
export default Home;
