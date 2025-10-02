import FeatureCard from "./FeatureCard";
import { features } from "../../../../../../../data/data";
const Features = () => {
  return (
    <section
      className="py-6 border-b border-t"
      aria-labelledby="features-heading"
    >
      <div className="containerr">
        <h2 id="features-heading" className="sr-only">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
          {features.map((item) => (
            <FeatureCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
