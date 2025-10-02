import FeatureCard from "./FeatureCard";
import feat1 from "../../../../../../assets/feat-01.png";
import feat2 from "../../../../../../assets/feat-02.png";
import feat3 from "../../../../../../assets/feat-03.png";
import feat4 from "../../../../../../assets/feat-04.png";
import feat5 from "../../../../../../assets/feat-05.png";
export type Feature = {
  image: string;
  title: string;
  description: string;
  id: number;
};
const features: Feature[] = [
  {
    id: 1,
    image: feat1,
    title: "Free Shipping",
    description: "For all orders over $200",
  },
  {
    id: 2,
    image: feat2,
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    id: 3,
    image: feat3,
    title: "100% Secure Payment",
    description: "Guarantee secure payments",
  },
  {
    id: 4,
    image: feat4,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
  {
    id: 5,
    image: feat5,
    title: "Daily Offers",
    description: "Discount up to 70% OFF",
  },
];
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
