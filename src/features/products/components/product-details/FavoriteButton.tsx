import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Loader from "@/common/components/loader/spinner/Loader";
import LoginPrompt from "@/common/components/login-prompt/LoginPrompt";
import useAddFavorite from "../../api/useAddFavorite";

interface FavoriteButtonProps {
  productId: number;
  isInWishlist?: boolean;
  className?: string;
  showLabel?: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  productId,
  isInWishlist = false,
  className = "",
  showLabel = true,
}) => {
  const { t } = useTranslation();
  const { mutate: toggleFavorite, isPending } = useAddFavorite();

  const handleToggleFavorite = () => {
    toggleFavorite(productId);
  };

  return (
    <LoginPrompt>
      <button
        className={`flex items-center gap-2 ${className}`}
        onClick={handleToggleFavorite}
        disabled={isPending}
        aria-label={t("wishlist")}
      >
        {isPending ? (
          <Loader />
        ) : isInWishlist ? (
          <FaHeart className="text-orangeColor" aria-hidden="true" />
        ) : (
          <FaRegHeart aria-hidden="true" className="text-text-gray" />
        )}
        {showLabel && (
          <p className="text-lg pb-1">
            {t("wishlist")}
          </p>
        )}
      </button>
    </LoginPrompt>
  );
};

export default FavoriteButton;