import WebsiteLinks from "../links/WebsiteLinks";
import AllCategories from "./AllCategories";

const CategoriesHeader = () => {
  return (
    <div className="hidden md:block bg-white shadow-sm py-4">
      <div className="containerr flex items-center gap-4">
        <AllCategories />
        <WebsiteLinks />
      </div>
    </div>
  );
};

export default CategoriesHeader;
