import { useParams } from "react-router-dom";
import useStaticPageDetails from "../api/details/useStaticPageDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SEO from "@/common/components/seo/Seo";
const ShowPage = () => {
  const { slug } = useParams();
  const queryResult = useStaticPageDetails(slug || "");
  return (
    <div className="containerr">
      <FetchHandler queryResult={queryResult} skeletonType="custome">
        <SEO title={queryResult?.data?.name || ""} />
        <div></div>
      </FetchHandler>
    </div>
  );
};

export default ShowPage;
