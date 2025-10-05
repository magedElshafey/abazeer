import React, { useEffect, useState, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const HomeSlider: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Banner images array - you can add more images here
  const bannerImages = [
    '/images/banner-image.jpg',
    '/images/banner-image.jpg',
    '/images/banner-image.jpg',
    '/images/banner-image.jpg',
  ];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  // Autoplay functionality
  useEffect(() => {
    if (loaded && instanceRef.current) {
      const startAutoplay = () => {
        autoplayRef.current = setInterval(() => {
          if (instanceRef.current) {
            instanceRef.current.next();
          }
        }, 4000);
      };

      startAutoplay();

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [loaded, instanceRef]);

  // Handle mouse events for autoplay pause/resume
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (loaded && instanceRef.current) {
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
    if (loaded && instanceRef.current) {
      autoplayRef.current = setInterval(() => {
        if (instanceRef.current) {
          instanceRef.current.next();
        }
      }, 4000);
    }
  };

  return (
    <div 
      className="relative w-full h-full rounded-md overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={sliderRef} className="keen-slider h-full">
        {bannerImages.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="absolute bottom-4 end-4 flex gap-2">
          <button
            className="bg-white hover:bg-orangeColor rounded flex-center p-1 text-text-gray hover:text-black transition-colors duration-300"
            onClick={() => {
              instanceRef.current?.prev();
              handleManualNavigation();
            }}
            aria-label="Previous slide"
          >
            <IoChevronBack />
          </button>
          <button
            className="bg-white hover:bg-orangeColor rounded flex-center p-1 text-text-gray hover:text-black transition-colors duration-300"
            onClick={() => {
              instanceRef.current?.next();
              handleManualNavigation();
            }}
            aria-label="Next slide"
          >
            <IoChevronForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeSlider;
