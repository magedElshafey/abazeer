import CategoryCard from "../categories/components/card/CategoryCard";
const category = {
  image: "../../../public/images/400x400.png",
  id: 1,
  title: "test",
};
const Home = () => {
  return (
    <div className="containerr">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        <CategoryCard category={category} />
      </div>
    </div>
  );
};
export default Home;
