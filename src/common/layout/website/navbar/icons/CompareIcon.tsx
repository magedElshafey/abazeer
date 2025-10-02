import { GoGitCompare } from "react-icons/go";
import { Link } from "react-router-dom";
const CompareIcon = () => {
  return (
    <Link to="/compare" className="relative">
      <GoGitCompare size={20} className="text-transition" />
      <div className="absolute -left-4 -top-3 bg-orangeColor flex items-center justify-center text-nowrap w-5 h-5 text-sm">
        <p> 0</p>
      </div>
    </Link>
  );
};

export default CompareIcon;
