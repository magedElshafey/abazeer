import React from "react";
import Slider from "../../../../common/components/slider/Slider";
import { useTranslation } from "react-i18next";
const Hero: React.FC = () => {
  const { i18n } = useTranslation();

  // أمثلة بسيطة لSlides (يمكن تستبدل بأي محتوى)
  const slides = Array.from({ length: 10 }).map((_, i) => (
    <div
      key={i}
      // important: do NOT set width:100% here; keen-slider handles layout.
      className="bg-gray-200 flex items-center justify-center text-xl font-semibold rounded-lg h-48"
    >
      Slide {i + 1}
    </div>
  ));

  return (
    <div className="containerr">
      <Slider
        key={i18n.language}
        spacing={16}
        loop
        autoplay
        breakPoints={{
          "(min-width: 640px)": {
            slides: { perView: 2, spacing: 16 },
          },
          "(min-width: 768px)": {
            slides: { perView: 3, spacing: 16 },
          },
          "(min-width: 1024px)": {
            slides: { perView: 4, spacing: 16 },
          },
          "(min-width: 1280px)": {
            slides: { perView: 5, spacing: 16 },
          },
        }}
      >
        {slides}
      </Slider>
    </div>
  );
};

export default Hero;
