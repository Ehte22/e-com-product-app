import React, { useState, useEffect } from "react";

const Carousel = () => {
    const images = [
        "https://mobirise.com/extensions/commercem4/assets/images/gallery07.jpg",
        "https://images.unsplash.com/photo-1554940563-090286540831?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1676717962720-d9a812c8f8c9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically slide to the next image every 1 second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [images.length]);

    return (
        <div className="relative w-full  mx-auto overflow-hidden">
            {/* Carousel Images */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-80 md:h-96 lg:h-[600px]"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>

            {/* Dots for Navigation */}
            {/* <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-teal-600" : "bg-gray-300"
                            }`}
                    ></button>
                ))}
            </div> */}
        </div>
    );
};

export default Carousel;
