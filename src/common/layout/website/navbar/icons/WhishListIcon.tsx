import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const WhishListIcon = () => {
  return (
    <Link to="/whishlist" className="relative">
      <FaRegHeart size={20} className="text-transition" />
      <div className="absolute -left-4 -top-3 bg-orangeColor flex items-center justify-center text-nowrap w-5 h-5 text-sm">
        <p> 0</p>
      </div>
    </Link>
  );
};

export default WhishListIcon;
