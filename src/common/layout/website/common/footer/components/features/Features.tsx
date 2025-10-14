import FeatureCard from "./FeatureCard";
import useGetFeatures from "../../api/useGetFeatures";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

const Features = () => {
  const queryResult = useGetFeatures();
  const { data } = queryResult;

  return (
    <FetchHandler queryResult={queryResult} skeletonType="feature">
      <section
        className="py-4 border-b border-t"
        aria-labelledby="features-heading"
      >
        <div className="containerr">
          <h2 id="features-heading" className="sr-only">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
            {data?.map((item) => (
              <FeatureCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </section>
    </FetchHandler>
  );
};

export default Features;
