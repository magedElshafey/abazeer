import SectionTitle from "@/common/components/titles/SectionTitle";
import useAboutApi from "../api/about/useAboutApi";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import AboutCard from "../components/about/AboutCard";
const About = () => {
  const queryResult = useAboutApi();
  return (
    <div className="containerr">
      <div className="w-full flex-center">
        <SectionTitle title="About" />
      </div>
      <div className="my-4">
        <FetchHandler queryResult={queryResult} skeletonType="about">
          {queryResult?.data?.length ? (
            <div>
              {queryResult?.data?.map((item) => (
                <AboutCard key={item?.id} data={item} />
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </FetchHandler>
      </div>
    </div>
  );
};

export default About;
