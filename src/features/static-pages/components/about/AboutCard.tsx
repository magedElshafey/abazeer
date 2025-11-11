import { memo } from "react";
import type { AboutType } from "../../types/About.type";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

interface AboutCardProps {
  data: AboutType;
  index: number;
}

const AboutCard: React.FC<AboutCardProps> = ({ data, index }) => {
  const { name, image, description } = data;
  console.log("description about", description);

  return (
    <article
      className="py-4 px-8 rounded-lg border shadow-xl space-y-8"
      aria-labelledby={`about-title-${index}`}
      aria-describedby={`about-desc-${index}`}
    >
      {/* Text Content */}
      <section className="w-full  space-y-4 ">
        <div className="flex gap-3">
          <div className="flex-center w-12 h-12 rounded-sm bg-white shadow-sm border p-2">
            <img
              src={image || "/images/card-big-image.png"}
              alt={name || "About image"}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain rounded-xl "
            />
          </div>
          <h2 className="text-xl lg:text-2xl 2xl:text-3xl">{name}</h2>
        </div>
        <p
          id={`about-desc-${index}`}
          className="!text-gray-600 leading-relaxed w-full lg:w-[90%]"
        >
          <HtmlConverter html={description} />
        </p>
      </section>
    </article>
  );
};

export default memo(AboutCard);
