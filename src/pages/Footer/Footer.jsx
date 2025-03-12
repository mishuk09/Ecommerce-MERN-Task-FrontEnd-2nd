import applepay from '../../assets/footer/applepay.svg';
import am from '../../assets/footer/am.svg';
import gpay from '../../assets/footer/gpay.svg';
import master from '../../assets/footer/master.svg';
import paypal from '../../assets/footer/paypal.svg';
import shopify from '../../assets/footer/shopify.svg';
import union from '../../assets/footer/union.svg';
import visa from '../../assets/footer/visa.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [popup, setPopup] = useState(false);

    const subscribeBtnClick = () => {
        setPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
            setPopup(false);
        }, 3000);
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    return (


        <div className='   bg-black'>
            <div className=' text-white  max-w-7xl px-2 md:px-0 mx-auto  bottom-0 w-full'>


                {popup && (
                    <div className="fixed top-4 right-4   bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300">
                        Successfully Submitted!
                    </div>
                )}

                <div className='  h-auto   w-full  '>
                    <div className=' footer-grid  pb-4 gap-3 w-[100%]'>
                        <div className='w-full h-full flex flex-col overflow-hidden'>
                            <div className="text-black flex justify-center items-center pt-12 pb-3 text-[15px] font-bold">
                                <h1 className="text-2xl font-bold icon-img">...</h1>
                            </div>


                            <p className="text-justify pe-6 text-[14px] text-gray-300">Shop quality products, enjoy fast shipping, secure payment, and excellent service. </p>
                            <p className="text-xl sm:text-2xl font-semibold mt-3 mb-2 number">+977 65764763</p>
                            <p className="text-justify pe-6 text-[14px] text-gray-300">Follow us in social media as well for more update. </p>
                            <div className="flex gap-2 mt-3">
                                <p className="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faFacebook} /></p>
                                <p className="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faInstagram} /></p>
                                {/* <p className="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faPinterest} /></p> */}
                                {/* <p className="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><FontAwesomeIcon size='xl' icon={faEnvelope} /></p>
                            <p className="rounded-full hover:text-gray-400 text-gray-700 duration-75 border-3 flex items-center text-center justify-center w-10 h-10"><i  size='xl' className="fa-brands fa-square-whatsapp"></i></p> */}
                            </div>
                        </div>

                        <div className='w-full footer-service h-full leading-6 flex flex-col overflow-hidden'>
                            <p className="text-white cursor-pointer pt-4 md:pt-12 pb-3 text-[15px] font-bold">About us
                            </p>
                            <a href="/privacy" className="text-[14px] text-gray-300   cursor-pointer pb-1">Privacy &
                                policy</a>
                            <a href="/about" className="text-[14px] text-gray-300 cursor-pointer pb-1">About us</a>
                            <a href="/contact" className="text-[14px] text-gray-300 cursor-pointer pb-1">Contact
                                us</a>
                            <a href="/faqs" className="text-[14px] text-gray-300 cursor-pointer pb-1">FAQ's</a>
                            <a href="signin" className="text-[14px] text-gray-300 cursor-pointer pb-1">My Account</a>
                        </div>

                        <div className='w-full footer-service h-full leading-6 flex flex-col overflow-hidden'>
                            <p className="text-white cursor-pointer pt-4 md:pt-12 pb-3 text-[15px] font-bold">Shop By Outletshop
                            </p>
                            <a href="/contact" className="text-[14px] text-gray-300  cursor-pointer pb-1">Help</a>
                            <a href="/signin" className="text-[14px] text-gray-300 cursor-pointer pb-1">Order Tracking</a>
                            <a href="/signin" className="text-[14px] text-gray-300 cursor-pointer pb-1">Shipping & Delivery</a>
                            <a href="#" className="text-[14px] text-gray-300 cursor-pointer pb-1">Advanced Search</a>
                            <a href="/signin" className="text-[14px] text-gray-300 cursor-pointer pb-1">My Account</a>
                        </div>

                        <div className='grid   w-[100%]'>
                            <div className='w-full h-full flex flex-col overflow-hidden'>
                                <p
                                    className="text-white   duration-200 cursor-pointer pt-4 md:pt-12 pb-3 text-[17px] font-bold">
                                    Sign
                                    Up to Newsletter</p>
                                <div className="grid text-sm">
                                    <p className="text-[14px] text-gray-300 cursor-pointer pb-6 text-justify">Get all the latest information
                                        on events, sales and offers. Sign up for the newsletter:</p>

                                    <div className=" lg:flex gap-1">

                                        {/* <input value={email} type="text"
                                            className="border w-full rounded-full h-10 outline-none px-4 text-gray-6    00"
                                            placeholder="Email Address" /> */}
                                        <input
                                            value={email}
                                            type="text"
                                         
                                            className="border w-full rounded-full h-10 outline-none px-4 text-gray-300"
                                            placeholder="Email Address"
                                        />

                                        <button
                                            onClick={subscribeBtnClick}
                                            className="w-full subscribe-btn   h-10 px-4 mt-4 lg:mt-0 text-white font-bold rounded-full">
                                            SUBSCRIBE
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='text-gray-500' />
                <div className="  pb-6 md:pb-0">

                    <div
                        className="custom-container   mb-6 md:mb-0 md:flex text-center pt-3 flex-row  justify-between items-center w-full h-20">
                        <div className="text-[14px] text-gray-300 py-2">© Sally Looze. 2024. All Rights Reserved</div>
                        <div className="text-[14px] text-gray-300 py-2">Plexus.org.in Digital Marketing Services</div>

                        <div className="flex gap-2 lg:gap-3 mt-2 lg:mt-0 items-center text-center justify-center">
                            <img className=" w-10" src={applepay} alt="" />
                            <img className=" w-10" src={am} alt="" />
                            <img className=" w-10" src={gpay} alt="" />
                            <img className=" w-10" src={master} alt="" />
                            <img className=" w-10" src={paypal} alt="" />
                            <img className=" w-10" src={shopify} alt="" />
                            <img className=" w-10" src={union} alt="" />
                            <img className=" w-10" src={visa} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Footer;