import React, { useEffect, useState, useRef, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { SliderHome } from "../../types/slider.types";

interface HomeSliderProps {
  sliders: SliderHome[];
}

const AUTOPLAY_INTERVAL = 4000;

const HomeSlider: React.FC<HomeSliderProps> = React.memo(({ sliders }) => {
  const [loaded, setLoaded] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const {
    i18n: { language },
  } = useTranslation();

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1 },
    created: () => setLoaded(true),
  });

  // Autoplay logic
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      instanceRef.current?.next();
    }, AUTOPLAY_INTERVAL);
  }, [instanceRef]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    if (loaded) startAutoplay();
    return stopAutoplay;
  }, [loaded, startAutoplay, stopAutoplay]);

  const handleNavigate = useCallback(
    (item: SliderHome) => {
      if (item?.id) navigate(`/products/${item.id}`);
    },
    [navigate]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") instanceRef.current?.prev();
      if (e.key === "ArrowRight") instanceRef.current?.next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [instanceRef]);

  return (
    <div
      className="relative w-full h-full rounded-md overflow-hidden group"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div dir="ltr" ref={sliderRef} className="keen-slider h-full">
        {sliders.map((item, index) => (
          <button
            onClick={() => handleNavigate(item)}
            key={item?.id ?? index}
            className="keen-slider__slide cursor-pointer focus:outline-none"
            aria-label={`View product: ${
              item?.description || "Slide " + (index + 1)
            }`}
          >
            <img
              src={item?.image || "/images/placeholder.jpg"}
              alt={item?.description || `Slide ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
              }}
            />
          </button>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="absolute bottom-4 end-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              instanceRef.current?.[language === "ar" ? "next" : "prev"]();
              startAutoplay();
            }}
            aria-label="Previous slide"
            className="bg-white hover:bg-orangeColor rounded-full p-2 shadow-md text-gray-700 hover:text-black transition"
          >
            <IoChevronBack
              className={`text-lg ${language === "ar" ? "rotate-180" : ""}`}
            />
          </button>
          <button
            onClick={() => {
              instanceRef.current?.[language === "ar" ? "prev" : "next"]();
              startAutoplay();
            }}
            aria-label="Next slide"
            className="bg-white hover:bg-orangeColor rounded-full p-2 shadow-md text-gray-700 hover:text-black transition"
          >
            <IoChevronForward
              className={`text-lg ${language === "ar" ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
});

export default HomeSlider;
