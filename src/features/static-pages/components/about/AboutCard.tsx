import { memo, useMemo } from "react";
import type { AboutType } from "../../types/About.type";

interface AboutCardProps {
  data: AboutType;
  index: number;
}

const AboutCard: React.FC<AboutCardProps> = ({ data, index }) => {
  const { name, image, description } = data;

  const isReversed = useMemo(() => index % 2 !== 0, [index]);

  return (
    <article
      className={`flex flex-col lg:flex-row items-center gap-6 ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
      aria-labelledby={`about-title-${index}`}
      aria-describedby={`about-desc-${index}`}
    >
      <figure className="w-full lg:w-1/2">
        <img
          src={image || "/images/card-big-image.png"}
          alt={name || "About image"}
          loading="lazy"
          decoding="async"
          className="w-full h-60 object-cover rounded-xl shadow-sm"
        />
      </figure>

      {/* Text Content */}
      <section className="w-full lg:w-1/2 space-y-4 text-center  flex-col items-center">
        <h2
          id={`about-title-${index}`}
          className="text-lg lg:text-xl font-semibold text-gray-900"
        >
          {name}
        </h2>
        <p id={`about-desc-${index}`} className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </section>
    </article>
  );
};

export default memo(AboutCard);
