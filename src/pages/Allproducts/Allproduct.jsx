import { useEffect, useState } from "react";
import Headline from "../../components/Headline";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import useWishlist from "../../components/Wishlist";

const Allproduct = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { wishlist, toggleWishlist } = useWishlist();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


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
    }, []);


    const IndexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = IndexOfLastItem - itemsPerPage;
    const currentItems = posts.slice(indexOfFirstItem, IndexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div className="mt-20">
            <Headline
                headline="Explore Our Products"
                child="Our Product's"
                href="collection"
                seemore="/collection/allproduct"
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
                    : currentItems.length > 0 ? (
                        currentItems.map((product) => (
                            <div key={product._id} className="relative bg-white rounded">
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


                                        <span className="absolute sell-color text-white top-3 left-3 text-xs px-2 py-1 rounded">
                                            - {(((product.oldPrice - product.newPrice) / product.newPrice * 100).toFixed(0))} %
                                        </span>
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
                                            <span className="line-through text-gray-500 ml-2">${product.oldPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))


                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center py-4">No items</td>
                        </tr>
                    )}
            </div >

            <div className="pagination max-w-7xl mx-auto  flex justify-end  mt-10   space-x-2 p-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border text-gray-600 border-gray-300  shadow rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed ' : 'hover:bg-blue-100'}`}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 border text-gray-600 border-gray-300 rounded-lg transition-colors   ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'hover:bg-blue-100'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border text-gray-600 border-gray-300 shadow rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
                >
                    Next
                </button>
            </div>

        </div >
    );
};

export default Allproduct;