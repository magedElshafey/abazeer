import { useState, useEffect } from 'react';

const ProductPhotos = () => {
    // Array of images with placeholder URLs
    const images = [
        { id: 1, url: "/images/600x600.jpg" },
        { id: 2, url: "/images/600x600.jpg" },
        { id: 3, url: "/images/600x600.jpg" },
        { id: 4, url: "/images/600x600.jpg" },
        { id: 5, url: "/images/600x600.jpg" },
        { id: 6, url: "/images/600x600.jpg" }
    ];

    // State to track the currently active image
    const [activeImage, setActiveImage] = useState(images[0]);
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

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 lg:border-e lg:pe-2">
                {/* Thumbnail images */}
                <div className="flex md:flex-col flex-wrap gap-3 order-2 md:order-none">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-md cursor-pointer transition-all duration-200 overflow-hidden ${
                                activeImage.id === image.id 
                                    ? 'border-orangeColor ring-2 ring-orangeColor/30' 
                                    : 'border-gray-200 hover:border-orangeColor/50'
                            }`}
                            onClick={() => setActiveImage(image)}
                        >
                            <img
                                src={image.url}
                                alt={`Product image ${image.id}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                    ))}
                </div>

                {/* Main display image */}
                <div className="flex-1 h-full border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                    <img
                        src={activeImage.url}
                        alt={`Main product image ${activeImage.id}`}
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
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation arrows */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = images.findIndex(img => img.id === activeImage.id);
                            const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                            setActiveImage(images[prevIndex]);
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = images.findIndex(img => img.id === activeImage.id);
                            const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                            setActiveImage(images[nextIndex]);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-orangeColor transition-colors duration-200"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Full screen image */}
                    <div 
                        className="w-[90vw] h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={activeImage.url}
                            alt={`Full screen product image ${activeImage.id}`}
                            className="w-full h-full object-contain rounded-md"
                        />
                    </div>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                        {images.findIndex(img => img.id === activeImage.id) + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductPhotos;