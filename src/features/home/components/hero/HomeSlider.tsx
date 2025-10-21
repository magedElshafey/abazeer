import React, { useEffect, useState, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { SliderHome } from "../../types/slider.types";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  sliders: SliderHome[];
}

const HomeSlider: React.FC<Props> = ({ sliders }) => {
  const [loaded, setLoaded] = useState(false);
  const {
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  // Autoplay functionality
  useEffect(() => {
    if (loaded && instanceRef.current && sliders.length > 1) {
      const startAutoplay = () => {
        autoplayRef.current = setInterval(() => {
          if (instanceRef.current) {
            instanceRef.current.next();
          }
        }, 2000);
      };

      startAutoplay();

      return () => {
        clearInterval(autoplayRef.current || "");
      };
    }
  }, [loaded, instanceRef, sliders]);

  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (loaded && instanceRef.current && sliders.length > 1) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        if (instanceRef.current) {
          instanceRef.current.next();
        }
      }, 4000);
    }
  };

  const handleManualNavigation = () => {
    // Clear existing interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    // Restart autoplay after manual navigation
    if (loaded && instanceRef.current && sliders.length > 1) {
      autoplayRef.current = setInterval(() => {
        if (instanceRef.current) {
          instanceRef.current.next();
        }
      }, 4000);
    }
  };

  if (!sliders.length)
    return (
      <div className="h-full w-full flex-center overflow-hidden py-10 rounded-md bg-background-gray">
        <FaImage className="text-text-gray" size={80} />
      </div>
    );

  return (
    <div
      className="relative w-full h-full rounded-md overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div dir="ltr" ref={sliderRef} className="keen-slider h-full">
        {sliders.map((slider, index) => (
          <div key={index} className="keen-slider__slide">
            <div
              onClick={() =>
                navigate(
                  `/products${
                    slider.product_id ? `/${slider?.product_id}` : ""
                  }`
                )
              }
              className="relative w-full h-full cursor-pointer"
            >
              <img
                src={slider.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                // loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && sliders.length > 1 && (
        <div className="absolute bottom-4 end-4 flex gap-2">
          <button
            className="bg-white hover:bg-orangeColor rounded flex-center p-1 text-text-gray hover:text-black transition-colors duration-300"
            onClick={() => {
              instanceRef.current?.[language === "ar" ? "next" : "prev"]();
              handleManualNavigation();
            }}
            aria-label="Previous slide"
          >
            <IoChevronBack
              className={language === "ar" ? "rotate-180" : undefined}
            />
          </button>
          <button
            className="bg-white hover:bg-orangeColor rounded flex-center p-1 text-text-gray hover:text-black transition-colors duration-300"
            onClick={() => {
              instanceRef.current?.[language === "ar" ? "prev" : "next"]();
              handleManualNavigation();
            }}
            aria-label="Next slide"
          >
            <IoChevronForward
              className={language === "ar" ? "rotate-180" : undefined}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
