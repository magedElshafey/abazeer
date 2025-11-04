import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Brand } from "../../types/brand.types";

interface BrandsCardProps {
  brand: Brand;
}

const BrandsCard = memo(({ brand }: BrandsCardProps) => {
  const navigate = useNavigate();
  const { id, slug, image, name, category } = brand || {};
  const { id: catId, slug: catSlug, name: catName } = category || {};

  const imageSrc = image || "/images/card-big-image.png";
  const brandName = name || "Unnamed Brand";
  const categoryName = catName || "Uncategorized";

  const handleNavigate = useCallback(() => {
    if (!id) return;
    navigate(`/products?filter-brand=${id}`);
  }, [navigate, id, slug]);

  const handleCategoryNavigate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!catId) return;
      navigate(`/products?filter-category=${catId}`);
    },
    [navigate, catId, catSlug]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNavigate();
      }
    },
    [handleNavigate]
  );

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Go to brand page: ${brandName}`}
      aria-describedby={`brand-${id}-desc`}
      onClick={handleNavigate}
      onKeyDown={handleKeyPress}
      className={clsx(
        "flex flex-col justify-between bg-background-gray cursor-pointer transition-colors duration-200 hover:bg-white shadow-lg rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary h-full"
      )}
    >
      <figure className="w-full aspect-[1.56] overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={`Brand logo: ${brandName}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </figure>

      <div
        id={`brand-${id}-desc`}
        className="flex flex-col flex-grow justify-between px-4 py-4"
      >
        <button
          type="button"
          onClick={handleCategoryNavigate}
          className={`uppercase mb-1 font-semibold text-slate-500 focus:outline-none hover:underline focus-visible:underline truncate ${!catId && "invisible pointer-events-none"}`}
          aria-label={`Go to category: ${categoryName}`}
        >
          {categoryName}
        </button>

        <button
          type="button"
          className="text-md md:text-lg lg:text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-orangeColor hover:underline focus:underline focus:outline-none truncate"
          title={brandName}
          aria-label={`View details for ${brandName}`}
        >
          {brandName}
        </button>
      </div>
    </article>
  );
});

BrandsCard.displayName = "BrandsCard";
export default BrandsCard;
