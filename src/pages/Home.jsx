import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get("http://localhost:5000/home/offer");
                setSlides(response.data); // Ensure the backend returns an array of slide objects
            } catch (err) {
                console.err(err)
                setError("Failed to load slides. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    if (loading) return <p>Loading slides...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!slides.length) return <p>No slides available.</p>;

    return (
        <div className="relative w-full max-w-7xl mx-auto p-4">
            {/* Slide Container */}
            <div className="relative flex items-center bg-gradient-to-r from-[#051d40] via-[#244c74] to-[#2e5fa3] text-white rounded-2xl overflow-hidden p-6 md:p-4">
                {/* Text Content */}
                <div className="flex-1 md:ps-10 md:space-y-3">
                    <p className="text-xs md:text-lg">{slides[currentIndex].subTitle}</p>
                    <h1 className="text-2xl md:text-5xl font-bold mt-2">{slides[currentIndex].title}</h1>
                    <p className="md:text-2xl mt-2">{slides[currentIndex].offer}</p>
                </div>

                {/* Product Image */}
                <div className="flex-1 md:pe-20 flex justify-end">
                    <img src={slides[currentIndex].img} alt={slides[currentIndex].title} className="h-30 md:h-[350px]" />
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 md:p-3 rounded-full shadow-md"
            >
                <ChevronLeft size={24} className="nav-icon" />
            </button>

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
