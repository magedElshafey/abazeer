import ProductCard from "../products/components/card/ProductCard";
const product = {
  id: 1,
  title: "test",
  category: "category product test",
  image: "../../../public/images/600x600.jpg",
  reviews: {
    avg: 3,
    total: 10,
  },
  quantity: 16,
  remaining: 4,
  price_before_disccount: 500,
  price_afterDisccount: 300,
  disccount_percentage: 30,
};
const Home = () => {
  return (
    <div className="containerr">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <ProductCard product={product} />
      </div>
    </div>
  );
};
export default Home;
