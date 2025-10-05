import { memo } from "react";

interface SquareImageProps {
  src: string;
  alt: string;
}

const SquareImage: React.FC<SquareImageProps> = memo(({ src, alt }) => {
  return (
    <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
      <img
        alt={alt}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
});

SquareImage.displayName = "SquareImage";
export default SquareImage;
