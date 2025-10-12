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
    slides: { perView?: number; spacing?: number; origin?: "auto" | number };
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
  // global states
  const {
    i18n: { language },
  } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // slider hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    created() {
      setLoaded(true);
    },
    loop,
    mode: "free-snap",
    slides: {
      perView: sliderPerView,
      spacing: spacing,
    },
    breakpoints: breakPoints,
  });

  // Reusable autoplay function
  const startAutoplay = useCallback(() => {
    if (autoplay && loaded && instanceRef.current) {
      autoplayRef.current = setInterval(() => {
        if (instanceRef.current) {
          instanceRef.current.next();
        }
      }, 4000);
    }
  }, [autoplay, loaded, instanceRef]);

  // Clear autoplay function
  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && loaded && instanceRef.current) {
      startAutoplay();

      return () => {
        clearAutoplay();
      };
    }
  }, [autoplay, loaded, instanceRef, startAutoplay, clearAutoplay]);

  // Handle mouse events for autoplay pause/resume
  const handleMouseEnter = () => {
    if (autoplay) {
      clearAutoplay();
    }
  };

  const handleMouseLeave = () => {
    startAutoplay();
  };

  const handleManualNavigation = () => {
    if (!autoplay) return;

    // Clear existing interval and restart autoplay
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
      className={`w-full relative`}
      aria-roledescription="carousel"
      aria-label="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="containerr relative flex flex-col gap-4">
        <div className="w-full flex-between">
          {title && <SectionTitle title={title || ""} />}

          {showControls && (
            <div className="flex gap-2">
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

        <div dir="ltr" className="keen-slider" ref={sliderRef}>
          {React.Children.map(children, (child, index) => {
            return (
              <div
                className="keen-slider__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${React.Children.count(
                  children
                )}`}
                tabIndex={0}
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
