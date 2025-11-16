import { memo } from "react";
import SectionTitle from "@/common/components/titles/SectionTitle";
import useAboutApi from "../../api/about/useAboutApi";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import AboutCard from "../../components/about/AboutCard";
import SEO from "@/common/components/seo/Seo";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import { useTranslation } from "react-i18next";
const About: React.FC = () => {
  const queryResult = useAboutApi();
  const { i18n } = useTranslation();
  return (
    <FetchHandler queryResult={queryResult} skeletonType="about">
      <SEO title="About" />
      <section
        className="overflow-x-hidden py-8"
        role="main"
        aria-labelledby="about-section-title"
      >
        {/* hero image */}
        <div className="w-screen h-[450px] lg:h-[500px] relative mb-8">
          <img
            src={
              queryResult?.data?.header?.image || "/images/default-banner.jpg"
            }
            alt={queryResult?.data?.header?.name || "Banner Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center z-10 px-4 text-white">
            {queryResult?.data?.header?.name && (
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                {queryResult?.data?.header?.name}
              </h1>
            )}
            {queryResult?.data?.header?.description && (
              <div>
                <HtmlConverter html={queryResult?.data?.header?.description} />
              </div>
            )}
          </div>
        </div>

        <div className="containerr">
          {/* first content with wrap-around text */}
          <div className="mb-24 relative">
            {/* Image floated left on desktop */}
            <div
              className={`${
                i18n.language === "ar" ? "float-left" : "float-right"
              } w-full md:w-1/2 md:mr-8 mb-4 md:mb-0`}
            >
              <img
                alt={queryResult?.data?.main?.name}
                src={queryResult?.data?.main?.image}
                loading="lazy"
                decoding="async"
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-300"
              />
            </div>

            {/* Text content */}
            <div>
              {queryResult?.data?.main?.name && (
                <SectionTitle title={queryResult?.data?.main?.name} mb="mb-5" />
              )}
              {queryResult?.data?.main?.description && (
                <HtmlConverter html={queryResult?.data?.main?.description} />
              )}
            </div>

            {/* clearfix */}
            <div className="clear-both"></div>
          </div>

          {/* about us array Content */}
          <section aria-live="polite">
            {queryResult?.data?.other &&
              queryResult?.data?.other.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                  role="list"
                  aria-label="About information list"
                >
                  {queryResult?.data?.other.map((item, index) => (
                    <AboutCard key={item.id} data={item} index={index} />
                  ))}
                </div>
              )}
          </section>
        </div>
      </section>
    </FetchHandler>
  );
};

export default memo(About);
