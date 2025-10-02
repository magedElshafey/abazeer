import { RiCloseLine } from "react-icons/ri";
import Search from "../../navbar/search/Search";

interface SearchSidebarProps {
  showSidebar: boolean;
  onClose: () => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  showSidebar,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/40 z-30" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[85%] bg-white shadow-md border z-40 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full h-36 bg-orangeColor p-3">
          <button
            onClick={onClose}
            className="transition duration-200 hover:scale-105 hover:text-red-700 mb-3"
          >
            <RiCloseLine size={25} />
          </button>
          <Search />
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
