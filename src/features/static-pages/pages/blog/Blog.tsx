import { useParams } from "react-router-dom";
import useGetSingleBlog from "../../api/blog/useGetSingleBlog";
import { useTranslation } from "react-i18next";
import { getIdFromParam } from "@/utils/getIdFromParam";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SEO from "@/common/components/seo/Seo";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import { formatDate } from "@/utils/formatDate";

const Blog = () => {
  const { t } = useTranslation();
  const { slugAndId } = useParams();
  const id = getIdFromParam(slugAndId);
  const queryResult = useGetSingleBlog(id ? +id : 0);
  const blog = queryResult?.data;

  return (
    <div className="container mx-auto px-4 py-10">
      <FetchHandler queryResult={queryResult} skeletonType="blogDetails">
        {blog ? (
          <>
            <SEO title={blog?.name} />

            {/* Blog Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Image Section */}
              <div className="relative w-full overflow-hidden rounded-2xl shadow-md h-[450px]">
                <img
                  src={blog?.image || "/placeholder.jpg"}
                  alt={blog?.name}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                  {blog?.name}
                </h1>

                <div className="prose prose-lg max-w-none leading-relaxed">
                  <HtmlConverter html={blog?.description} />
                </div>

                <div className="flex justify-end mt-6">
                  <time
                    dateTime={blog?.created_at}
                    className="text-sm text-gray-500 italic"
                  >
                    {t("created at")} : {formatDate(blog?.created_at)}
                  </time>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </FetchHandler>
    </div>
  );
};

export default Blog;
