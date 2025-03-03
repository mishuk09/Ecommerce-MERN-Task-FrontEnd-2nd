import { useEffect, useState } from "react";



const Counter = ({ targetNumber }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = targetNumber;
        const duration = 1000; // Animation duration in ms
        const incrementTime = duration / end;

        const interval = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
                clearInterval(interval);
            }
        }, incrementTime);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [targetNumber]);

    return <p className="text-[25px] md:text-[36px] count-down font-semibold text-gray-800">{count}</p>;
};

const AboutUs = () => {


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="cart-head border-b h-[120px] sm:h-[220px] flex items-center text-center justify-center relative">
                <div className="flex relative cart-h-text custom-container flex-col h-auto w-full text-center justify-center">
                    <p className="text-[20px]  sm:text-[26px] lg:text-[30px] font-bold">About Us</p>
                    <a href="/" className="text-center   text-[12px] cart-access lg:text-[14px]">
                        <span className=" ">Home /</span> About us
                    </a>
                </div>
                <div className="overlay2"></div>
            </div>



            <section className="custom-container mt-14  mb-20">
                <div className="flex flex-col items-center text-center justify-center">

                    <p className="text-[12px]">
                        WELCOME TO ALIYL
                    </p>
                    <p className="text-[20px] md:text-[36px]  font-semibold text-gray-800">
                        Perfect Store
                        Available to Everyone!
                    </p>
                    <p className="text-[16px] text-gray-600 w-full text-justify md:text-center mt-4 md:w-[70%]">
                        Over 20 years of experience, we have meticulously curated collections that transcend fleeting trends,
                        embodying a timeless elegance that resonates with our discerning clientele.
                    </p>
                </div>





                <div className=" grid grid-cols-1 md:grid-cols-3 mt-10 md:mt-20 border-b pb-10 md:pb-20">
                    <div className="flex flex-col items-center text-center justify-center">
                        <Counter targetNumber={500} />
                        <p className="text-[18px] font-semibold">Products for Sale</p>
                        <p className="w-[80%] text-gray-600">
                            That's why we strive to offer a diverse range of products that cater to all styles.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        <Counter targetNumber={96} />
                        <p className="text-[18px] font-semibold">Happy Customer</p>
                        <p className="w-[80%] text-gray-600">
                            That's why we strive to offer a diverse range of products that cater to all styles.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        <Counter targetNumber={13} />
                        <p className="text-[18px] font-semibold">Partner Brand</p>
                        <p className="w-[80%] text-gray-600">
                            That's why we strive to offer a diverse range of products that cater to all styles.
                        </p>
                    </div>
                </div>


            </section>



            <div className="  grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 md:mt-14">
                <div className="overflow-hidden rounded-md">
                    <img className="rounded-md w-full h-[500px] hover:scale-110 duration-300" src="https://images.pexels.com/photos/3738087/pexels-photo-3738087.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </div>
                <div className="flex items-center text-center justify-center">
                    <div className="flex flex-col   items-center text-center justify-center">

                        <p className="text-[12px]">
                            OUR FACTORIES
                        </p>
                        <p className="text-[20px] md:text-[36px]  font-semibold text-gray-800">
                            The Best Product
                        </p>
                        <p className="text-[16px] mt-4  text-gray-600 w-full md:w-[90%]">
                            We spend months finding the best factories around the world—the same ones that produce your favorite
                            designer labels. We visit them often and build strong personal relationships with the owners. Each
                            factory is given a compliance audit to evaluate factors like fair wages.
                        </p>
                        <button className="factory-btn rounded-full mt-6">
                            LEARN MORE
                        </button>
                    </div>

                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 md:mt-20">

                <div className="flex items-center text-center justify-center">
                    <div className="flex flex-col   items-center text-center justify-center">

                        <p className="text-[12px]">
                            OUR QUALITY
                        </p>
                        <p className="text-[20px] md:text-[36px]  font-semibold text-gray-800">
                            Timeless Products
                        </p>
                        <p className="text-[16px] mt-4  text-gray-600 w-full md:w-[90%]">
                            At Eligant, we’re not big on trends. We want you to wear our pieces for years, even decades, to
                            come.
                            That’s why we source the finest materials and factories for our timeless products— like our Grade-A
                            cashmere sweaters, Italian shoes, and Peruvian Pima tees.
                        </p>
                        <button className="factory-btn rounded-full mt-6">
                            LEARN MORE
                        </button>
                    </div>

                </div>
                <div className="overflow-hidden mt-6 md:mt-0 rounded-md">
                    <img className="rounded-md w-full h-[500px] hover:scale-110 duration-300" src="https://images.pexels.com/photos/9899496/pexels-photo-9899496.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </div>

            </div>





            <div className=" mt-14 md:mt-28 mb-20">
                <div className="flex flex-col   items-center text-center justify-center">

                    <p className="text-[12px]">
                        WHY CHOOSE US
                    </p>
                    <p className="text-[20px] md:text-[36px]  font-semibold text-gray-800">
                        Our Unique Things
                    </p>
                    <p className="text-[16px] text-gray-600 w-full md:w-[70%]">
                        ClassNameclassName aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium lectus
                        qua. Nunc id cursus metus ididunt ut labore metus episcing.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

                    <div className="w-full rounded overflow-hidden  ">
                        <div className="overflow-hidden">
                            <img className="w-full h-[300px] hover:scale-110 duration-300" src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Sunset in the mountains" />
                        </div>
                        <div className="px-6 pt-4 items-center text-center">
                            <div className="font-bold text-xl mb-2">Who We Are</div>
                            <p className="text-gray-700 text-base">
                                Adipisicing elit sed do eiusmod tempor labore et dolore dignissimos cumque. Excepteur sint
                                occaecat cupidatat proident.
                            </p>
                        </div>

                    </div>


                    <div className="w-full rounded overflow-hidden  ">
                        <div className="overflow-hidden">
                            <img className="w-full h-[300px] hover:scale-110 duration-300" src="https://images.pexels.com/photos/13443801/pexels-photo-13443801.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Sunset in the mountains" />
                        </div>
                        <div className="px-6 py-4 items-center text-center">
                            <div className="font-bold text-xl mb-2">Our Products</div>
                            <p className="text-gray-700 text-base">
                                Adipisicing elit sed do eiusmod tempor labore et dolore dignissimos cumque. Excepteur sint
                                occaecat cupidatat proident.
                            </p>
                        </div>

                    </div>

                    <div className="w-full rounded overflow-hidden  ">
                        <div className="overflow-hidden">
                            <img className="w-full h-[300px] hover:scale-110 duration-300" src="https://images.pexels.com/photos/4064840/pexels-photo-4064840.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Sunset in the mountains" />
                        </div>
                        <div className="px-6 py-4 items-center text-center">
                            <div className="font-bold text-xl mb-2">Our Careers</div>
                            <p className="text-gray-700 text-base">
                                Adipisicing elit sed do eiusmod tempor labore et dolore dignissimos cumque. Excepteur sint
                                occaecat cupidatat proident.
                            </p>
                        </div>

                    </div>

                </div>
            </div>







        </div>
    );
};

export default AboutUs;
