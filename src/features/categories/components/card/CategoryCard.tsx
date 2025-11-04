import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import SquareImage from "@/common/components/images/sqaure-image/SqaureImage";
import type { BaseCategory } from "../../types/category.types";
interface CategoryCardProps {
  category: BaseCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = memo(({ category }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/products?filter-category=${category.id}`);
  }, [navigate, category.id]);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
      className="bg-background-gray cursor-pointer duration-300 hover:bg-white 
                 shadow-md rounded-2xl flex flex-col items-center justify-start
                 p-4 sm:p-5 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 w-full h-full min-h-[240px]"
      aria-label={`View category: ${category.name}`}
    >
      <div className="mb-3 sm:mb-4">
        <SquareImage
          alt={category.name || "Category image"}
          src={category.image || "/images/400x400.png"}
        />
      </div>

      <p
        className="text-sm sm:text-base font-semibold text-center text-gray-800 line-clamp-2 leading-tight px-2"
        title={category.name}
      >
        {category.name}
      </p>
    </article>
  );
});

export default CategoryCard;
