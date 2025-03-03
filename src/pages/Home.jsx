import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import airphone from '../assets/airphone.png';
import drone from '../assets/drone.png';
import joystick from '../assets/joystick.png';

const slides = [
    {
        title: "SMART WEARABLES",
        subtitle: "Best Deal Online on Smart Watches and Airphones",
        discount: "Up to 80% OFF",
        image: airphone, // Replace with your image URL
    },
    {
        title: "DRONE TECHNOLOGY",
        subtitle: "Best Deals on Drones for Photography and Adventure",
        discount: "Up to 80% OFF",
        image: drone, // Replace with your image URL
    },
    {
        title: "GAMING ACCESSORIES",
        subtitle: "Best Joysticks and Controllers for Gaming",
        discount: "Up to 80% OFF",
        image: joystick, // Replace with your image URL
    },
    // Add more slides here if needed
];


export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto p-4">
            {/* Slide */}
            <div className="relative flex items-center bg-gradient-to-r from-[#051d40] via-[#244c74] to-[#2e5fa3]  text-white rounded-2xl overflow-hidden p-6 md:p-4">
                {/* Text Content */}
                <div className="flex-1 md:ps-10">
                    <p className="text-xs md:text-lg">{slides[currentIndex].subtitle}</p>
                    <h1 className="text-2xl md:text-5xl font-bold mt-2">{slides[currentIndex].title}</h1>
                    <p className=" md:text-2xl mt-2">{slides[currentIndex].discount}</p>
                </div>

                {/* Product Image */}
                <div className="flex-1 md:pe-20 flex justify-end">
                    <img src={slides[currentIndex].image} alt="Smart Watch" className="h-30 md:h-[350px]" />
                </div>
            </div>

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 md:p-3 rounded-full shadow-md"
            >
                <ChevronLeft size={24} className="nav-icon" />
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white md:p-3 p-1 rounded-full shadow-md"
            >
                <ChevronRight size={24} className="nav-icon" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
