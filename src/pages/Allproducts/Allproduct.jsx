import { useEffect, useState } from "react";
import Headline from "../../components/Headline";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

const Allproduct = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/items');
                setPosts(response.data.items);
                setLoading(false);
            } catch (error) {
                setLoading(false);

                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist')) || {}
    );
    const handleWishlist = (productId) => {
        const updateWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updateWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updateWishlist));
    };

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);
    return (
        <div className="mt-20">
            <Headline
                headline="Explore Our Products"
                child="Our Product's"
                href="allproducts"
                seemore="allproducts"
            />

            <div className="max-w-7xl mt-6 mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
                {loading
                    ? Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} className="relative bg-white rounded ">
                            <div className="overflow-hidden rounded-sm">
                                <Skeleton height={200} className="w-full" />
                            </div>
                            <div className="p-2">
                                <Skeleton width="80%" />
                                <div className="flex space-x-1 md:pt-2 pt-1">
                                    {Array.from({ length: 3 }).map((_, colorIndex) => (
                                        <Skeleton
                                            key={colorIndex}
                                            width={30}
                                            height={30}
                                            circle
                                        />
                                    ))}
                                </div>
                                <Skeleton width="50%" />
                            </div>
                        </div>
                    ))
                    : posts.map(product => (
                        <div key={product._id} className="relative bg-white rounded  ">
                            <a href={`/product/${product._id}`}>
                                <div className="overflow-hidden bg-gray-100 rounded-sm">
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                                    />
                                    <span className="absolute sell-color text-white top-3 left-3    text-xs px-2 py-1 rounded"> - {(((product.oldPrice - product.newPrice) / product.newPrice * 100).toFixed(0))} % </span>
                                </div>
                            </a>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleWishlist(product._id);
                                }}
                                className="absolute ring-0 bg-white rounded-full top-2 right-2 w-8 h-8 flex items-center justify-center"
                            >
                                <FontAwesomeIcon
                                    className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`}
                                    icon={faHeart}
                                />
                            </button>

                            <div className='ps-2'>
                                <h2 className="text-base product-card__title text-start pt-1 md:pt-3 font-semibold text-gray-900">
                                    {product.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).substring(0, 20)}{product.title.length > 20 ? '...' : ''}
                                </h2>
                                <div>
                                    <div>
                                        <span className="new-price font-medium">${product.newPrice}</span>
                                        <span className="  line-through text-gray-500 ml-2">${product.oldPrice}</span>
                                    </div>

                                </div>
                                <div className="flex justify-between items-center">
                                    {/* <MadeBy /> */}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    );
};

export default Allproduct;