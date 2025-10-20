import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import useGetFavorites from "@/features/user/api/favorites/useGetFavorites";
import Loader from "@/common/components/loader/spinner/Loader";
import LoginPrompt from "@/common/components/login-prompt/LoginPrompt";

const WhishListIcon = () => {
  const { data, isLoading } = useGetFavorites();

  return (
    <LoginPrompt>
      <Link to="/my-profile/favorites" className="relative">
        <FaRegHeart size={20} className="text-transition" />
        <div className="absolute -end-4 -top-3 bg-orangeColor flex items-center justify-center text-nowrap w-5 h-5 text-sm">
          <p>
            {isLoading ? (
              <Loader color="white" />
            ) : (
              (data || []).length.toString()
            )}
          </p>
        </div>
      </Link>
    </LoginPrompt>
  );
};

export default WhishListIcon;
