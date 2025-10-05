import { useNavigate } from "react-router-dom";
import { Categories } from "../../types/Categories";

interface CategoryCardProps {
  category: Categories;
}
const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(`/category/${category?.id}`);
  return (
    <div
      onClick={handleNavigate}
      className="bg-background-gray cursor-pointer duration-300 hover:bg-white shadow-lg p-3 rounded-md"
    ></div>
  );
};

export default CategoryCard;
