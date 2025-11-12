import WebsiteLinks from "../links/WebsiteLinks";
import AllCategories from "./AllCategories";
import RecentlyViewed from "./RecentlyViewed";

const CategoriesHeader = () => {
  return (
    <div className="hidden relative containerr bg-white shadow-sm py-4 md:flex justify-between items-center">
      <div className="flex items-center gap-4">
        <AllCategories />
        <WebsiteLinks />
      </div>
      <RecentlyViewed />
    </div>
  );
};

export default CategoriesHeader;
