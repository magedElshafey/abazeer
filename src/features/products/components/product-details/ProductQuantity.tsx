import React, { useState } from 'react';

interface ProductQuantityProps {
  initialQuantity?: number;
  maxQuantity?: number;
  className?: string;
  onQuantityChange?: (newQuantity: number) => void;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  initialQuantity = 1,
  maxQuantity,
  className = '',
  onQuantityChange
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (maxQuantity === undefined || quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className={`flex border border-gray-300 rounded-md overflow-hidden ${className}`}>
      {/* Decrease button */}
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed border-r border-gray-300 transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        −
      </button>
      
      {/* Quantity display */}
      <div className="flex-1 px-3 py-2 flex justify-center items-center bg-white border-r border-gray-300">
        {quantity.toString()}
      </div>
      
      {/* Increase button */}
      <button
        onClick={handleIncrease}
        disabled={maxQuantity !== undefined && quantity >= maxQuantity}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default ProductQuantity;
