import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";

interface Brand {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface BrandsCardProps {
  brand: Brand;
}

const BrandsCard: React.FC<BrandsCardProps> = memo(({ brand }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/brand/${brand.id}`);
  }, [navigate, brand.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
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
      aria-label={`Go to brand page: ${brand.title}`}
      aria-describedby={`brand-${brand.id}-desc`}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      className="bg-background-gray cursor-pointer transition-colors duration-200 hover:bg-white shadow-lg pb-3 rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Image Section */}
      <div className="w-full aspect-[1.56] overflow-hidden rounded-lg">
        <img
          src={brand.image}
          alt={`Brand logo: ${brand.title}`}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text Section */}
      <div id={`brand-${brand.id}-desc`} className="px-4 mt-5">
        <p className="uppercase mb-1 font-semibold text-slate-500">
          {brand.category}
        </p>
        <p
          className="text-md md:text-lg lg:text-xl font-bold truncate text-foreground transition-colors duration-200 group-hover:text-orangeColor"
          title={brand.title}
        >
          {brand.title}
        </p>
      </div>
    </article>
  );
});

BrandsCard.displayName = "BrandsCard";
export default BrandsCard;
