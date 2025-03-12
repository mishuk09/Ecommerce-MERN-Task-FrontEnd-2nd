import { useEffect, useState } from 'react';
import airphone from '../../assets/airphone.png';
import Buynowbtn from '../../components/Buynowbtn';
import Buynowcount from '../../components/Buynowcount';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton

export default function Subcategory() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/cate/");
                setCategory(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Stop loading once the data is fetched
            }
        }
        fetchData();
    }, []);

    return (
        <div className="relative mt-20 w-full max-w-7xl mx-auto p-4">
            {/* Skeleton Loader or Actual Content */}
            <div className="relative md:flex items-center bg-black text-white rounded overflow-hidden p-6 md:p-4">
                {loading ? (
                    // Skeleton Loader while data is loading
                    <div className="w-full md:flex items-center">
                        <div className="flex-1 md:ps-10">
                            <Skeleton width="50%" height={20} />
                            <Skeleton width="70%" height={40} />
                            <div className="mt-4">
                                <Skeleton width={100} height={40} />
                            </div>
                            <div className="mt-10">
                                <Skeleton width={120} height={40} />
                            </div>
                        </div>

                        <div className="flex-1 mt-8 md:mt-0 md:pe-20 flex justify-center md:justify-end">
                            <Skeleton height={350} width={250} />
                        </div>
                    </div>
                ) : category.length > 0 ? (
                    // Actual Content after data is loaded
                    category.map((item) => (
                        <div key={item._id} className="w-full md:flex items-center">
                            <div className="flex-1 md:ps-10">
                                <p className="text-xs sub-cate md:text-lg capitalize">{item.category}</p>
                                <h1 className="text-2xl md:text-5xl font-bold mt-4">{item.title}</h1>

                                <div className='mt-4'>
                                    <Buynowcount />
                                </div>

                                <div className='mt-10'>
                                    <Buynowbtn buynow={`/product/${item._id}`} />
                                </div>
                            </div>

                            <div className="flex-1 mt-8 md:mt-0 md:pe-20 flex justify-center md:justify-end">
                                <img src={item.image || airphone} alt={item.title} className="h-30 md:h-[350px]" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items available.</p>
                )}
            </div>
        </div>
    );
}
