import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import useGetFavorites from "@/features/user/api/favorites/useGetFavorites";
import Loader from "@/common/components/loader/spinner/Loader";
import LoginPrompt from "@/common/components/login-prompt/LoginPrompt";

const WhishListIcon = () => {
  const { data, isLoading } = useGetFavorites();

  return (
    <LoginPrompt>
      <Link
        to="/my-profile/favorites"
        className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-orangeColor rounded-md transition-all"
      >
        <div className="relative">
          <FaRegHeart size={22} className="text-gray-700" />
          <span className="absolute -end-4 -top-3.5 bg-orangeColor text-white flex items-center justify-center w-5 h-5 text-xs">
            {isLoading ? (
              <Loader color="white" />
            ) : (
              (data || []).length.toString()
            )}
          </span>
        </div>
      </Link>
    </LoginPrompt>
  );
};

export default WhishListIcon;
