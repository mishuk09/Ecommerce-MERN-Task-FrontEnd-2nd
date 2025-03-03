import airphone from '../../assets/airphone.png';
import Buynowbtn from '../../components/Buynowbtn';
import Buynowcount from '../../components/Buynowcount';
import CountdownTimer from '../../components/CountdownTimer';
// import drone from '../../assets/drone.png';
// import joystick from '../../assets/joystick.png';

export default function Subcategory() {



    return (
        <div className="relative mt-20 w-full max-w-7xl mx-auto p-4">

            <div className="relative  md:flex  items-center bg-black  text-white rounded overflow-hidden p-6 md:p-4">

                <div className="flex-1 md:ps-10">
                    <p className="text-xs sub-cate  md:text-lg">Category</p>
                    <h1 className="text-2xl md:text-5xl font-bold mt-4">SMART WEARABLES</h1>

                    <div className='mt-4'>
                        <Buynowcount />
                    </div>

                    <div className='mt-10'>
                        <Buynowbtn buynow="/buynow" />
                    </div>
                </div>


                <div className="flex-1 mt-8 md:mt-0 md:pe-20 flex justify-center md:justify-end">
                    <img src={airphone} alt="Smart Watch" className="h-30 md:h-[350px]" />
                </div>
            </div>



        </div>
    );
}
