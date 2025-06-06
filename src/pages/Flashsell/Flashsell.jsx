import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import Headline from "../../components/Headline";
// import CountdownTimer from "../../components/CountdownTimer";
import Skeleton from "react-loading-skeleton";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWishlist from "../../components/Wishlist";



const Flashsell = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [wishlist, setWishlist] = useState({});
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ecommerce-mern-task-backend.onrender.com/items/allitem');
                setPosts(response.data.items);
                setLoading(false);
            } catch (error) {
                setLoading(false);

                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
        // fetchWishlist();
    }, []);


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };



    return (
        <div>
            <Headline
                headline="Flash Sales"
                child="Today's"
                href="flashsell"
                // extra={<CountdownTimer />}
                seemore="/collection/allproduct"
            />


            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-2  "
                containerClass=" max-w-7xl  mt-6 mx-auto px-0"
            >
                {loading
                    ? Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} className="relative bg-white rounded-sm shadow-md">
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
                        <div key={product._id} className="relative bg-white rounded shadow-md">
                            <a href={`/product/${product._id}`}>
                                <div className="overflow-hidden bg-gray-100 rounded-sm">
                                    {
                                        Array.isArray(product.img) && product.img.length > 0 ? (
                                            product.img.slice(0, 1).map((imageUrl, index) => (
                                                <img key={index} src={imageUrl} alt={product.title} className="w-full h-full object-cover rounded " />
                                            ))
                                        ) : (
                                            <span>No image available</span>
                                        )
                                    }
                                    <span className="absolute sell-color text-white top-3 left-3    text-xs px-2 py-1 rounded"> - {(((product.oldPrice - product.newPrice) / product.newPrice * 100).toFixed(0))} % </span>
                                </div>
                            </a>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(product._id);
                                }}
                                className="absolute ring-0 bg-white rounded-full top-2 right-2 w-8 h-8 flex items-center justify-center"
                            >
                                <FontAwesomeIcon
                                    className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`}
                                    icon={faHeart}
                                />
                            </button>

                            <div className='ps-2'>

                                <div className="flex space-x-1 pt-3 ">
                                    {Array.isArray(product.img) &&
                                        product.img.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Color Option ${index}`}
                                                className={`w-6 h-8 object-cover rounded cursor-pointer transition duration-300 ease-in-out border-1 hover:border-2  border-blue-500 scale-105' : 'hover:scale-105'
                                                        }`}
                                            />
                                        ))}
                                </div>
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
            </Carousel>
        </div>
    );
};

export default Flashsell;
