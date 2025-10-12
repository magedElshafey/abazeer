import useGetBlogs from "../../api/blogs/useGetBlogs";
import SEO from "@/common/components/seo/Seo";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import EmptyData from "@/common/components/empty-data/EmptyData";
import BlogCard from "../../components/blogs/card/BlogCard";
const Blogs = () => {
  const queryResult = useGetBlogs();
  return (
    <>
      <SEO title="blogs" />
      <div className="containerr space-between-sections">
        <FetchHandler queryResult={queryResult} skeletonType="blog">
          {queryResult?.data && queryResult?.data?.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
              {queryResult?.data?.slice(0, 4)?.map((blog) => (
                <BlogCard key={blog?.id} data={blog} />
              ))}
            </div>
          ) : (
            <EmptyData />
          )}
        </FetchHandler>
      </div>
    </>
  );
};

export default Blogs;
