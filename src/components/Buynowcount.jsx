import { useEffect, useState } from "react";


const Buynowcount = () => {

    const initialTime = 3 * 24 * 60 * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="    w-72  ">
            <div className="flex   space-x-2 gap-2 items-end">
                <div className="flex flex-col leading-3 text-black bg-white rounded-full w-10 h-10 items-center justify-center">
                    <span className="font-semibold text-[14px]  ">{days}</span>
                    <span className="text-[10px]">Day</span>
                </div>
                <div className="flex flex-col leading-3 text-black bg-white rounded-full w-10 h-10 items-center justify-center">
                    <span className="font-semibold text-[14px] ">{String(hours).padStart(2, "0")}</span>
                    <span className="text-[10px]">Hr</span>
                </div>

                <div className="flex flex-col leading-3 text-black bg-white rounded-full w-10 h-10 items-center justify-center">
                    <span className="font-semibold text-[14px] ">{String(minutes).padStart(2, "0")}</span>
                    <span className="text-[10px]">Min</span>
                </div>

                <div className="flex flex-col leading-3 text-black bg-white rounded-full w-10 h-10 items-center justify-center">
                    <span className="font-semibold text-[14px] ">{String(seconds).padStart(2, "0")}</span>
                    <span className="text-[10px]">Sec</span>
                </div>
            </div>
        </div>


    );
};

export default Buynowcount;
