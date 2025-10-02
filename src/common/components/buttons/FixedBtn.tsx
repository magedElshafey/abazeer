import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
const FixedBtn = () => {
  const [showArrow, setShowArrow] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleShowArrow = () => {
    if (window.scrollY > 100) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShowArrow);
    return () => {
      document.removeEventListener("scroll", handleShowArrow);
    };
  }, []);
  return (
    <>
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-4  w-9 h-9 rounded-[50%] flex justify-center items-center bg-mainColor duration-300 text-white z-50 cursor-pointer ${
          showArrow ? "right-4" : "right-[-300%]"
        }`}
      >
        <FaArrowUpLong size={20} />
      </button>
      <div className="fixed bottom-8 right-4">
        <a
          href={`https://wa.me/+201022153359`}
          className="fixed bottom-20 right-4 w-9 h-9 rounded-[50%] flex justify-center items-center bg-[#25d366] text-white z-50 cursor-pointer"
        >
          <FaWhatsapp size={20} />
        </a>
      </div>
    </>
  );
};

export default FixedBtn;
