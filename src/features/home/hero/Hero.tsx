// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import Banner from "./components/Banner";
import Slider from "./components/Slider";

// const HeroSection = () => {
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slides: {
//       perView: 1,
//       spacing: 0,
//     },
//   });

//   return (
//     <section className="w-full px-4 lg:px-8 py-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
//         {/* العمود الأول - صورة ثابتة */}
//         <div className="flex justify-center">
//           <img
//             src="/images/hero-static.jpg"
//             alt="Hero Static"
//             className="w-[441px] h-[460px] object-cover rounded-2xl shadow-lg max-w-full"
//           />
//         </div>

//         {/* العمود الثاني - Slider */}
//         <div className="relative w-full">
//           <div
//             ref={sliderRef}
//             className="keen-slider rounded-2xl shadow-lg overflow-hidden"
//           >
//             <div className="keen-slider__slide">
//               <img
//                 src="/images/slide1.jpg"
//                 alt="Slide 1"
//                 className="w-full h-[460px] object-cover"
//               />
//             </div>
//             <div className="keen-slider__slide">
//               <img
//                 src="/images/slide2.jpg"
//                 alt="Slide 2"
//                 className="w-full h-[460px] object-cover"
//               />
//             </div>
//             <div className="keen-slider__slide">
//               <img
//                 src="/images/slide3.jpg"
//                 alt="Slide 3"
//                 className="w-full h-[460px] object-cover"
//               />
//             </div>
//           </div>

//           {/* أزرار التحكم */}
//           <div className="absolute bottom-4 right-4 flex gap-2">
//             <button
//               onClick={() => instanceRef.current?.prev()}
//               className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition"
//               aria-label="Previous Slide"
//             >
//               <IoChevronBack className="text-xl text-gray-700" />
//             </button>
//             <button
//               onClick={() => instanceRef.current?.next()}
//               className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition"
//               aria-label="Next Slide"
//             >
//               <IoChevronForward className="text-xl text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

const Hero = () => {
  return (
    <div className="containerr">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Banner />
        <div className="lg:col-span-2">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
