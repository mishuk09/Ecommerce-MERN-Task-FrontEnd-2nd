import { useEffect, useState } from 'react';
import airphone from '../../assets/airphone.png';
import Buynowbtn from '../../components/Buynowbtn';
import Buynowcount from '../../components/Buynowcount';
import axios from 'axios';

export default function Subcategory() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/cate/");
                setCategory(response.data);

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="relative mt-20 w-full max-w-7xl mx-auto p-4">

            <div className="relative md:flex items-center bg-black text-white rounded overflow-hidden p-6 md:p-4">
                {category.length > 0 ? (
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


        </div >
    );
}
