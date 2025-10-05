import React from "react";
import Slider from "../../../../common/components/slider/Slider";
import { useTranslation } from "react-i18next";
const Hero: React.FC = () => {
  const { i18n } = useTranslation();
  // i18n.language => 'ar' | 'en' ...  نحرص على تحويلها ل rtl/ltr
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

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
        key={dir}
        dir={dir}
        spacing={16}
        loop
        autoplay={4000}
        pauseOnHover
        keyboard
        breakpoints={{
          "(min-width: 640px)": {
            slides: { origin: "auto", perView: 2, spacing: 16 },
          },
          "(min-width: 768px)": {
            slides: { origin: "auto", perView: 3, spacing: 16 },
          },
          "(min-width: 1024px)": {
            slides: { origin: "auto", perView: 4, spacing: 16 },
          },
          "(min-width: 1280px)": {
            slides: { origin: "auto", perView: 5, spacing: 16 },
          },
        }}
      >
        {slides}
      </Slider>
    </div>
  );
};

export default Hero;
