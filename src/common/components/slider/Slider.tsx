import React, { useEffect, useRef, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export type Breakpoints = {
  [mediaQuery: string]: {
    slides: { perView?: number; spacing?: number; origin?: "auto" | number };
  };
};

interface SliderProps {
  children: React.ReactNode;
  /** default per-view (mobile) */
  slidesPerView?: number;
  spacing?: number;
  loop?: boolean;
  dir?: "ltr" | "rtl" | string;
  className?: string;
  /** breakpoints - follow keen-slider shape */
  breakpoints?: Breakpoints;
  /** autoplay interval in ms. 0 or undefined to disable */
  autoplay?: number;
  /** pause autoplay on hover/focus */
  pauseOnHover?: boolean;
  /** enable keyboard nav (left/right) */
  keyboard?: boolean;
  /** optionally hide controls */
  showControls?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  children,
  slidesPerView = 1,
  spacing = 10,
  loop = false,
  dir = "ltr",
  className = "",
  breakpoints,
  autoplay,
  pauseOnHover = true,
  keyboard = true,
  showControls = true,
}) => {
  // slider hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop,
    rtl: dir === "rtl",
    slides: {
      origin: "auto",
      perView: slidesPerView,
      spacing,
    },
    breakpoints,
  });

  // autoplay timer
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoplay = useCallback(() => {
    if (!autoplay || autoplay <= 0) return;
    clearTimer();
    timerRef.current = window.setInterval(() => {
      instanceRef.current?.next();
    }, autoplay);
  }, [autoplay, instanceRef]);

  useEffect(() => {
    // start autoplay when mounted
    startAutoplay();
    return () => clearTimer();
  }, [startAutoplay]);

  // pause on hover / focus
  const onMouseEnter = () => {
    if (pauseOnHover) clearTimer();
  };
  const onMouseLeave = () => {
    if (pauseOnHover) startAutoplay();
  };

  // update rtl dynamically if dir prop changes
  useEffect(() => {
    instanceRef.current?.update({ rtl: dir === "rtl" });
  }, [dir, instanceRef]);

  // keyboard navigation
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!keyboard || !containerRef.current) return;

    const handler = (e: KeyboardEvent) => {
      // ignore when focus is on input/textarea/select
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          (active as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        // if RTL, right arrow should be prev
        if (dir === "rtl") instanceRef.current?.prev();
        else instanceRef.current?.next();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (dir === "rtl") instanceRef.current?.next();
        else instanceRef.current?.prev();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyboard, dir, instanceRef]);

  // controls handlers
  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  const isRTL = dir === "rtl";
  const PrevIcon = isRTL ? IoChevronForward : IoChevronBack;
  const NextIcon = isRTL ? IoChevronBack : IoChevronForward;

  return (
    <div
      ref={(node) => {
        sliderRef(node);
        containerRef.current = node;
      }}
      // root container: provide ARIA and keyboard focus ability
      className={`relative w-full ${className}`}
      dir={dir}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter} // pause when focused
      onBlur={onMouseLeave}
      aria-roledescription="carousel"
      aria-label="carousel"
    >
      {/* Controls (visible) */}
      {showControls && (
        <div
          className={`absolute top-3 z-20 flex gap-2 ${
            isRTL ? "left-3" : "right-3"
          }`}
          role="toolbar"
          aria-label="carousel controls"
        >
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-2 bg-white/90 dark:bg-gray-800/80 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            <PrevIcon size={18} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-2 bg-white/90 dark:bg-gray-800/80 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            <NextIcon size={18} />
          </button>
        </div>
      )}

      {/* Slider viewport */}
      <div className="keen-slider" /* keen-slider root */>
        {/*
          Note for accessibility:
          Each slide should have role="group" and aria-roledescription or aria-label describing position.
          We can't force children shape so we provide guidance below; but we'll wrap children if they are raw nodes.
        */}
        {/* If user passed plain nodes, ensure they have the class `keen-slider__slide`. 
            We'll map children to enforce the class and ARIA attributes for better accessibility. */}
        {React.Children.map(children, (child, index) => {
          // If child is a valid React element, clone and add class + attributes
          if (React.isValidElement(child)) {
            const existingClass = (child.props as any)?.className || "";
            return React.cloneElement(child as React.ReactElement, {
              className: `${existingClass} keen-slider__slide`,
              role: "group",
              "aria-roledescription": "slide",
              "aria-label": `Slide ${index + 1} of ${React.Children.count(
                children
              )}`,
              tabIndex: 0,
            });
          }
          // if not an element (string/number), wrap it
          return (
            <div
              className="keen-slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${React.Children.count(
                children
              )}`}
              tabIndex={0}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
