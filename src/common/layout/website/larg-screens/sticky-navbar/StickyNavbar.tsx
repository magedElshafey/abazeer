import { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import type { NavbarType } from "@/types/navbar.types";
// import CategoriesHeader from "../navbar/category-header/CategoriesHeader";
const StickyNavbar: React.FC<NavbarType> = ({ logo }) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={navRef}>
        <Navbar logo={logo} />
      </div>

      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
          ${
            isSticky
              ? "translate-y-0 opacity-100 shadow-md"
              : "-translate-y-full opacity-0"
          }
        `}
      >
        <Navbar logo={logo} />
      </div>
    </>
  );
};

export default StickyNavbar;
