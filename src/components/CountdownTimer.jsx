import { useEffect, useState } from "react";

const CountdownTimer = () => {
    // Set countdown time (3 days in seconds: 3 * 24 * 60 * 60)
    const initialTime = 3 * 24 * 60 * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);

    // Countdown logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    // Convert seconds into days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="text-xl hidden md:block text-center  w-72 mx-auto">
            <div className="flex justify-center space-x-2 items-end">
                <div className="flex flex-col items-center">
                    <span className="text-xs">Days</span>
                    <span className="font-semibold">{days}</span>
                </div>
                <span className="text-lg">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-xs">Hours</span>
                    <span className="font-semibold">{String(hours).padStart(2, "0")}</span>
                </div>
                <span className="text-lg">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-xs">Min</span>
                    <span className="font-semibold">{String(minutes).padStart(2, "0")}</span>
                </div>
                <span className="text-lg">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-xs">Sec</span>
                    <span className="font-semibold">{String(seconds).padStart(2, "0")}</span>
                </div>
            </div>
        </div>


    );
};

export default CountdownTimer;
