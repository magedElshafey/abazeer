import { useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface Props {
    media: string[];
}

const ProductPhotos: FC<Props> = ({ media }) => {
    const { t } = useTranslation();
    // State to track the currently active image
    const [activeImage, setActiveImage] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);

    // Effect to disable body scroll when full screen is open
    useEffect(() => {
        if (fullScreen) {
            // Disable scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [fullScreen]);

    // Handle empty media array
    if (!media || media.length === 0) {
        return (
            <div className="flex flex-col md:flex-row gap-6 lg:border-e lg:pe-2">
                <div className="flex-1 h-96 border border-gray-200 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                        <HiOutlinePhoto className="w-24 h-24 mx-auto mb-4" />
                        <p className="text-lg font-medium">{t("No images available")}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 lg:border-e lg:pe-2">
                {/* Thumbnail images */}
                <div className="flex md:flex-col flex-wrap gap-3 order-2 md:order-none">
                    {media.map((image, index) => (
                        <div
                            key={index}
                            className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-md cursor-pointer transition-all duration-200 overflow-hidden ${
                                activeImage === index 
                                    ? 'border-orangeColor ring-2 ring-orangeColor/30' 
                                    : 'border-gray-200 hover:border-orangeColor/50'
                            }`}
                            onClick={() => setActiveImage(index)}
                        >
                            <img
                                src={image}
                                alt={`Product image ${index}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                    ))}
                </div>

                {/* Main display image */}
                <div className="flex-1 h-full border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                    <img
                        src={media[activeImage]}
                        alt={`Main product image ${activeImage}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                        onClick={() => setFullScreen(true)}
                    />
                </div>
            </div>

            {/* Full Screen Modal */}
            {fullScreen && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                    onClick={() => setFullScreen(false)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setFullScreen(false)}
                        className="absolute top-4 right-4 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                    >
                        <IoClose className="w-8 h-8" />
                    </button>

                    {/* Navigation arrows */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(activeImage + 1 % media.length);
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                    >
                        <IoChevronBack className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(activeImage === 0 ? media.length - 1 : activeImage - 1);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                    >
                        <IoChevronForward className="w-8 h-8" />
                    </button>

                    {/* Full screen image */}
                    <div 
                        className="w-[90vw] h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={media[activeImage]}
                            alt={`Full screen product image ${activeImage}`}
                            className="w-full h-full object-contain rounded-md"
                        />
                    </div>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                        {activeImage + 1} / {media.length}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductPhotos;