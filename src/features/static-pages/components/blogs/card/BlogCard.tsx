import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";
import SquareImage from "@/common/components/images/sqaure-image/SqaureImage";
import type { BlogType } from "@/features/static-pages/types/blog.type";
import { formatDate } from "@/utils/formatDate";

interface BlogCardProps {
  data: BlogType;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const truncatedDescription =
    data?.description?.length > 60
      ? `${data?.description?.substring(0, 60)}...`
      : data?.description;

  return (
    <article
      className="flex flex-col h-full border bg-white shadow-sm rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-orangeColor"
      aria-labelledby={`blog-title-${data.id}`}
    >
      <Link
        to={`/blogs/${data.id}-${data?.slug}`}
        aria-label={data?.name}
        className="block"
      >
        <SquareImage
          alt={data?.name}
          src={data?.image || "/images/600x600.jpg"}
        />
      </Link>

      <div className="flex flex-col flex-grow p-4">
        <h2
          id={`blog-title-${data.id}`}
          className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800"
        >
          <Link
            to={`/blogs/${data.id}${data?.slug ? `-${data.slug}` : ""}`}
            className="focus:outline-none focus:ring-2 focus:ring-orangeColor rounded"
          >
            {data?.name}
          </Link>
        </h2>

        <div className="flex-grow text-gray-600 text-sm mb-4">
          <HtmlConverter html={truncatedDescription} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Link
            to={`/blogs/${data.id}${data?.slug ? `-${data.slug}` : ""}`}
            className="px-4 py-2 text-sm font-medium text-white bg-orangeColor rounded-lg hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orangeColor"
          >
            {t("show more")}
          </Link>

          <time
            dateTime={data?.created_at}
            className="text-xs text-gray-400 whitespace-nowrap"
          >
            {t("created at")} : {formatDate(data?.created_at)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
