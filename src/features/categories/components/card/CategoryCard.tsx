import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import SqaureImage from "../../../../common/components/images/sqaure-image/SqaureImage";

interface Category {
  id: number;
  image: string;
  title: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = memo(({ category }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/category/${category.id}`);
  }, [navigate, category.id]);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
      className="bg-background-gray cursor-pointer duration-300 hover:bg-white shadow-lg p-5 rounded-xl flex flex-col items-center gap-4 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`View category: ${category.title}`}
    >
      <SqaureImage
        alt={category.title || "Category image"}
        src={category.image}
      />
      <p
        className="text-md md:text-lg lg:text-xl font-bold truncate text-center text-foreground"
        title={category.title}
      >
        {category.title}
      </p>
    </article>
  );
});

export default CategoryCard;
