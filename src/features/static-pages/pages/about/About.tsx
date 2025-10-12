import { memo } from "react";
import SectionTitle from "@/common/components/titles/SectionTitle";
import useAboutApi from "../../api/about/useAboutApi";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import AboutCard from "../../components/about/AboutCard";
import EmptyData from "@/common/components/empty-data/EmptyData";
import SEO from "@/common/components/seo/Seo";
const About: React.FC = () => {
  const queryResult = useAboutApi();

  return (
    <>
      <SEO title="About" />
      <section
        className="containerr py-8"
        role="main"
        aria-labelledby="about-section-title"
      >
        {/* Section Title */}
        <div className="w-full flex-center mb-6">
          <SectionTitle id="about-section-title" title="About" />
        </div>

        {/* Content */}
        <section aria-live="polite">
          <FetchHandler queryResult={queryResult} skeletonType="about">
            {queryResult?.data?.length ? (
              <ul
                className="flex flex-col gap-10"
                role="list"
                aria-label="About information list"
              >
                {queryResult?.data.map((item, index) => (
                  <li key={item.id} role="listitem">
                    <AboutCard data={item} index={index} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyData />
            )}
          </FetchHandler>
        </section>
      </section>
    </>
  );
};

export default memo(About);
