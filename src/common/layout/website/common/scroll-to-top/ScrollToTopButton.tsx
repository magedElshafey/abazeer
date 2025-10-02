import { useState, useEffect, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // handle scroll listener
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // scroll to top action
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-24 md:bottom-6 right-4 z-50 p-3 rounded-full shadow-lg bg-orangeColor text-white transition-opacity duration-300  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <FaArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTopButton;
