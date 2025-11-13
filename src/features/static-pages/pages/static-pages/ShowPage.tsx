import { useParams } from "react-router-dom";
import useStaticPageDetails from "../../api/details/useStaticPageDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SEO from "@/common/components/seo/Seo";
import SectionTitle from "@/common/components/titles/SectionTitle";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
const ShowPage = () => {
  const { slug } = useParams();
  console.log("slug is", slug);
  const queryResult = useStaticPageDetails(slug || "");
  return (
    <div className="containerr">
      <FetchHandler queryResult={queryResult} skeletonType="custome">
        <SEO title={queryResult?.data?.name || ""} />
        {queryResult && queryResult?.data && (
          <>
            <div className="flex-center">
              <SectionTitle title={queryResult?.data?.name} />
            </div>
            <div
              className={`my-4 text-gray-500 leading-relaxed ${
                slug === "9-our-branches" ? "text-center" : ""
              }`}
            >
              <HtmlConverter html={queryResult?.data?.description || ""} />
            </div>
          </>
        )}
      </FetchHandler>
    </div>
  );
};

export default ShowPage;
