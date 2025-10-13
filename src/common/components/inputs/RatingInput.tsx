import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

const RatingInput: FC<RatingInputProps> = ({
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  label,
}) => {
  const { t } = useTranslation();
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const handleStarHover = (rating: number) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  const displayRating = hoveredRating || value;

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm md:text-base block mb-2 font-medium text-gray-700">
          {t(label)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`flex items-center gap-1 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            className={`transition-colors duration-150 ${
              disabled ? "cursor-not-allowed" : "hover:scale-110"
            }`}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <FaStar
              size={24}
              className={
                star <= displayRating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-red-500 text-xs" role="alert">
          {error && t(error)}
        </p>
      </div>
    </div>
  );
};

export default RatingInput;
