import { useEffect, useState } from 'react';
import mencloth from '../../assets/grid-view/mencloth.png';
import mobile from '../../assets/grid-view/mobile.png';
import Headline from '../../components/Headline';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function ProductGrid() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get('https://ecommerce-mern-task-backend.onrender.com/new/')
            setItems(response.data)
        }
        fetchData();
    }, [])


    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };


    return (
        <div className=" mt-20   ">
            <Headline
                headline="New Arrival"
                child="Feature"
                href="newarrival"
                seemore="/collection/allproduct"
            />

            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-2">

                <div className=" grid gap-4 mt-6 lg:grid-cols-2">
                    {/* First div: 50% width, 1 col, 2 rows */}

                    {
                        items && items.length > 0 ? (
                            items.slice(0, 1).map((item) => (
                                <div key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="relative group col-span-1 bg-black row-span-2 rounded overflow-hidden  shadow-lg hover:shadow-2xl transition-shadow duration-300h-full">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img src={mobile} alt="Mobile friendly" className="w-full h-full object-cover object-top scale-100   transition-transform duration-300" />
                                    <div className="absolute bottom-0  p-2 md:p-6 text-white     w-full">
                                        <h3 className="md:text-xl font-bold mb-1">iPhone 12 Pro Max</h3>
                                        <p className="text-sm hidden md:block mb-4 leading-relaxed text-gray-300">{stripHtmlTags(item.description)}</p>
                                        <a href="" className='mt- border-b-2 border-red-600'>Shop Now</a>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p>no item</p>
                        )
                    }


                    {
                        items && items.length > 0 ? (
                            items.slice(1, 2).map((item) => (
                                <div key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="relative group col-span-1 rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300  ">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img src={mencloth} alt="Performance" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0  p-2 md:p-6 text-white     w-full">
                                        <h3 className="md:text-xl font-bold mb-1">iPhone 12 Pro Max</h3>
                                        <p className="text-sm hidden md:block mb-4 leading-relaxed text-gray-300">{stripHtmlTags(item.description)}</p>
                                        <a href="" className='mt- border-b-2 border-red-600'>Shop Now</a>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p>no item</p>
                        )
                    }

                    {/* Third and fourth divs: Each takes 50% width, 1 row */}
                    <div className="grid grid-cols-2 gap-6 col-span-1">
                        {
                            items && items.length > 0 ? (
                                items.slice(2, 4).map((item) => (
                                    <div key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="relative group rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                        <div className="absolute bottom-0 p-2 md:p-6 text-white">
                                            <h3 className="md:text-xl font-semibold mb-1">{item.title}</h3>
                                            <p className="text-sm hidden md:block leading-relaxed">{stripHtmlTags(item.description)}</p>
                                            <a href="" className='mt- border-b-2 border-red-600'>Shop Now</a>

                                        </div>
                                    </div>
                                ))

                            ) : (
                                <p>no item</p>
                            )
                        }

                    </div>

                </div>

            </div>
        </div >
    )
}

