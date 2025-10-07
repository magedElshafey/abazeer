import React from "react";

const AboutSklelton: React.FC = () => {
  // نولد عدد من العناصر باستخدام Array.from
  const skeletonItems = Array.from({ length: 6 });

  return (
    <>
      {skeletonItems.map((_, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-6 animate-pulse ${
              isReversed ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-1/2">
              <div className="w-full h-60 bg-gray-300 rounded-xl"></div>
            </div>

            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AboutSklelton;
