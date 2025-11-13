import { memo } from "react";
import SectionTitle from "@/common/components/titles/SectionTitle";
import useAboutApi from "../../api/about/useAboutApi";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import AboutCard from "../../components/about/AboutCard";
import SEO from "@/common/components/seo/Seo";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
const About: React.FC = () => {
  const queryResult = useAboutApi();
  // const data = {
  //   banner: {
  //     image: "/images/1650x420.png",
  //     description: "رواد التغذية العضوية في المملكة العربية السعودية منذ 1982",
  //   },
  //   aboutUs: {
  //     image: "/images/400x400.png",
  //     title: "معلومات عنا",
  //     description:
  //       "في عام 1982، تحققت نقلة نوعية في المملكة العربية السعودية عن طريق افتتاح شركة أبازير المتخصصة في مجال الأغذية الصحية. انبثقت هذه الفكرة بواسطة المهندس خالد الحداد، و الذي كان شغوفاً بأهمية الغذاء الطبيعي و دوره في صحة الإنسان حيث عكف على دراسة النظريات الغذوية المختلفة و من ثم تطبيق هذه الدراسات عبر إنشاء مزارع خاصة بأبازير تلتزم بالمعايير العالمية للزراعة العضوية و من ثم توفير المنتج العضوي كخيار طبيعي و صحي للمستهلك، لتكون بذلك أول شركة متخصصة في مجال الأغذية العضوية في المملكة العربية السعوديةو بتوفيق من الله، فقد توسعت شركة أبازير و أصبحت الشركة الرائدة في السوق السعودي عبر كونها الوكيل الوحيد للعديد من العلامات التجارية المرموقة و المعترف بها دولياً في مجال المنتجات العضوية بالإضافة للمنتجات العضوية التي يتم إنتاجها من مزارع أبازير العضوية مثل المحاصيل الزراعية و المنتجات الحيوانية. تقوم شركة أبازير بإمداد السوق السعودي بكل هذه المنتجات عبر فروعها المتعددة و شبكة قنوات التوزيع في أنحاء المملكة. نجاح أبازير المستمر و المتصاعد مبني على إتباعها لمقاييس و ضوابط دقيقة في تقديم المنتج المثالي و الخدمات المتميزة و كل ما هو جد في عالم التغذية العضوية العالمية.",
  //     from: "منذ 1982",
  //     jobTitle: "رواد التغذية العضوية",
  //   },
  // };
  return (
    <FetchHandler queryResult={queryResult} skeletonType="about">
      <SEO title="About" />
      <section
        className=" overflow-x-hidden py-8"
        role="main"
        aria-labelledby="about-section-title"
      >
        {/* hero image */}
        <div className="w-screen h-[450px] lg:h-[500px] relative mb-8">
          {/* Background Image */}
          <img
            src={
              queryResult?.data?.header?.image || "/images/default-banner.jpg"
            }
            alt={queryResult?.data?.header?.name || "Banner Image"}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div
            style={{
              color: "white !important",
            }}
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center z-10 px-4 !text-white"
          >
            {queryResult?.data?.header?.name && (
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                {queryResult?.data?.header?.name}
              </h1>
            )}

            {queryResult?.data?.header?.description && (
              <div className="!text-white">
                <HtmlConverter html={queryResult?.data?.header?.description} />
              </div>
            )}
          </div>
        </div>

        <div className="containerr">
          {/* first content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 space-between-sections mb-24">
            {/* image */}
            <div className="relative ">
              <img
                alt={queryResult?.data?.main?.name}
                src={queryResult?.data?.main?.image}
                loading="lazy"
                decoding="async"
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* <div className=" absolute -bottom-20 min-w-[180px] left-[50%] translate-y-[-50%] bg-orangeColor p-4 rounded-md text-white">
                {queryResult?.data?.main?.description && (
                  <HtmlConverter html={queryResult?.data?.main?.description} />
                )}
              </div> */}
            </div>
            {/* text content */}
            <div>
              {/* description */}
              {queryResult?.data?.main?.name && (
                <SectionTitle title={queryResult?.data?.main?.name} mb="mb-5" />
              )}
              {queryResult?.data?.main?.description && (
                <HtmlConverter html={queryResult?.data?.main?.description} />
              )}
            </div>
          </div>

          {/* about us array Content */}
          <section aria-live="polite">
            {queryResult?.data?.other &&
              queryResult?.data?.other?.length > 0 && (
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
