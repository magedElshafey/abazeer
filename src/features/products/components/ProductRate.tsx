import { FC } from 'react';
import { FiStar } from 'react-icons/fi';

interface ProductRateProps {
  rating?: number;
  reviewCount?: number;
  showReviewCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showRatingNumber?: boolean;
}

const ProductRate: FC<ProductRateProps> = ({
  rating = 0,
  reviewCount = 0,
  showReviewCount = true,
  size = 'md',
  showRatingNumber = true
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      starSize: 'w-3 h-3',
      textSize: 'text-xs',
      gap: 'gap-1'
    },
    md: {
      starSize: 'w-4 h-4',
      textSize: 'text-sm',
      gap: 'gap-1'
    },
    lg: {
      starSize: 'w-5 h-5',
      textSize: 'text-base',
      gap: 'gap-2'
    }
  };

  const config = sizeConfig[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      {/* Stars */}
      <div className={`flex items-center ${config.gap}`}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FiStar
            key={`full-${index}`}
            className={`${config.starSize} text-orangeColor fill-current`}
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <FiStar
              className={`${config.starSize} text-gray-300`}
            />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <FiStar
                className={`${config.starSize} text-orangeColor fill-current`}
              />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <FiStar
            key={`empty-${index}`}
            className={`${config.starSize} text-gray-300`}
          />
        ))}
      </div>

      {/* Rating number */}
      {showRatingNumber && (
        <span className={`${config.textSize} font-medium text-text-light`}>
          {rating.toFixed(1)}
        </span>
      )}

      {/* Review count */}
      {showReviewCount && (
        <span className={`${config.textSize} text-text-subHeader`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default ProductRate;
