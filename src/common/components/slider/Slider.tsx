import React, {
  useEffect,
  useRef,
  PropsWithChildren,
  useState,
  useCallback,
} from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import SectionTitle from "../titles/SectionTitle";

type Breakpoints = {
  [mediaQuery: string]: {
    slides: {
      perView?: number | "auto";
      spacing?: number;
      origin?: "auto" | number;
    };
  };
};

interface Props {
  sliderPerView?: number;
  title?: string;
  showControls?: boolean;
  loop?: boolean;
  spacing?: number;
  autoplay?: boolean;
  breakPoints?: Breakpoints;
}

function hasPerView(value: unknown): value is { perView: number } {
  if (
    value &&
    typeof value === "object" &&
    "perView" in value &&
    typeof value.perView === "number"
  )
    return true;
  return false;
}

const Slider: React.FC<PropsWithChildren<Props>> = ({
  children,
  sliderPerView = 5,
  title,
  showControls = true,
  loop = true,
  spacing = 0,
  autoplay = false,
  breakPoints = {},
}) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(sliderPerView);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rtl: language === "ar",
    created(slider) {
      setLoaded(true);
      setSlidesPerView(
        hasPerView(slider.options.slides)
          ? slider?.options?.slides?.perView
          : sliderPerView
      );
    },
    updated(slider) {
      setSlidesPerView(
        hasPerView(slider.options.slides)
          ? slider.options.slides.perView
          : sliderPerView
      );
    },
    loop,
    mode: "free-snap",
    renderMode: "performance",
    slides: {
      perView: sliderPerView as number | "auto",
      spacing: spacing,
    },
    breakpoints: breakPoints,
  });

  const slidesCount = React.Children.count(children);
  const showArrows = showControls && slidesCount > slidesPerView;

  const startAutoplay = useCallback(() => {
    if (autoplay && loaded && instanceRef.current) {
      autoplayRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    }
  }, [autoplay, loaded, instanceRef]);

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    if (autoplay && loaded && instanceRef.current) {
      startAutoplay();
      return () => clearAutoplay();
    }
  }, [autoplay, loaded, instanceRef, startAutoplay, clearAutoplay]);

  const handleMouseEnter = () => {
    if (autoplay) clearAutoplay();
  };

  const handleMouseLeave = () => {
    startAutoplay();
  };

  const handleManualNavigation = () => {
    if (!autoplay) return;
    clearAutoplay();
    startAutoplay();
  };

  const handlePrev = () => {
    instanceRef.current?.[language === "ar" ? "next" : "prev"]();
    handleManualNavigation();
  };

  const handleNext = () => {
    instanceRef.current?.[language === "ar" ? "prev" : "next"]();
    handleManualNavigation();
  };

  return (
    <div
      className="w-full relative"
      aria-roledescription="carousel"
      aria-label="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="containerr relative flex flex-col gap-4">
        <div className="w-full flex-between">
          {title && <SectionTitle title={title || ""} />}

          {showArrows && (
            <div className="flex gap-2 mt-10 sm:mt-7 md:mt-0">
              <button
                className="bg-white hover:bg-orangeColor rounded border flex-center p-1 text-text-gray hover:text-black transition-colors duration-300"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <IoChevronBack
                  className={language === "ar" ? "rotate-180" : undefined}
                />
              </button>
              <button
                className="bg-white hover:bg-orangeColor rounded border flex-center p-1 text-text-gray hover:text-black transition-colors duration-300"
                onClick={handleNext}
                aria-label="Next slide"
              >
                <IoChevronForward
                  className={language === "ar" ? "rotate-180" : undefined}
                />
              </button>
            </div>
          )}
        </div>

        <div
          dir={language === "ar" ? "rtl" : "ltr"}
          className="keen-slider"
          ref={sliderRef}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className="keen-slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slidesCount}`}
              tabIndex={0}
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
