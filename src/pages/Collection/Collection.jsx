import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useWishlist from '../../components/Wishlist';

const Collection = () => {
    const { category } = useParams();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const { wishlist, toggleWishlist } = useWishlist();
    const [filters, setFilters] = useState({
        color: [],
        priceRange: [0, 1000],
        type: [],
        size: []
    });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch posts on mount
    useEffect(() => {
        axios.get('http://localhost:5001/items/allitem')
            .then(response => {
                if (Array.isArray(response.data.items)) {
                    let filteredItems;

                    if (category.toLowerCase() === "allproduct") {
                        // Show all items if category is "allproduct"
                        filteredItems = response.data.items;
                    } else {
                        // Filter by specific category
                        filteredItems = response.data.items.filter(item =>
                            item.category.toLowerCase() === category.toLowerCase()
                        );
                    }

                    setPosts(filteredItems);
                    setFilteredPosts(filteredItems);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setPosts([]);
                    setFilteredPosts([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setPosts([]);
                setFilteredPosts([]);
                setLoading(false);
            });
    }, [category]);



    const toggleFilterPanel = () => {
        setFilterOpen(!filterOpen);
    };


    const handleCheckboxChange = (filterType, value) => {
        const updatedFilters = { ...filters };
        const lowerValue = value.toLowerCase(); // Convert to lowercase

        if (updatedFilters[filterType].includes(lowerValue)) {
            // Remove the value from the array if it's already included
            updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== lowerValue);
        } else {
            // Add the value to the array if it's not included
            updatedFilters[filterType].push(lowerValue);
        }
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };


    const handlePriceChange = (value) => {
        const updatedFilters = { ...filters, priceRange: [0, value] };
        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

    const applyFilters = (updatedFilters) => {
        let newFilteredPosts = Array.isArray(posts) ? [...posts] : [];

        // Filter by color
        if (updatedFilters.color.length > 0) {
            newFilteredPosts = newFilteredPosts.filter(post =>
                Array.isArray(post.color) && post.color.some(color => updatedFilters.color.includes(color.toLowerCase()))
            );
        }

        // Filter by price range
        newFilteredPosts = newFilteredPosts.filter(post =>
            typeof post.newPrice === 'number' && post.newPrice <= updatedFilters.priceRange[1]
        );

        // Filter by type
        if (updatedFilters.type.length > 0) {
            newFilteredPosts = newFilteredPosts.filter(post =>
                typeof post.category === 'string' && updatedFilters.type.includes(post.category.toLowerCase())
            );
        }

        // Filter by size
        if (updatedFilters.size.length > 0) {
            newFilteredPosts = newFilteredPosts.filter(post =>
                Array.isArray(post.size) && post.size.some(size => updatedFilters.size.includes(size.toLowerCase()))
            );
        }

        setFilteredPosts(newFilteredPosts);
    };


    const IndexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = IndexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts.slice(indexOfFirstItem, IndexOfLastItem);
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (


        <div className="max-w-7xl  mx-auto min-h-screen collection pb-10">
            <div className="text-center pt-6 pb-4 lg:pt-10">
                <p className=" text-center lg:text-start text-sm lg:text-base pl-4">Collections / {Collection ? 'Collection' : 'All products'}</p>


                {/* <h1 className="text-xl lg:text-3xl filter-tittle-3  font-bold mt-2 text-center lg:text-start pl-4">Weekend Edit</h1> */}
                <div className="flex justify-start gap-8 mt-2 mb-2 pl-4">
                    <button
                        onClick={toggleFilterPanel}
                        className="text-gray-500 items-center flex hover:text-black"
                    >
                        {filterOpen ? (
                            <div>
                                <X size={20} className='me-2' />
                            </div>
                        ) : (
                            <div>

                                <SlidersHorizontal size={20} className='me-2' />
                            </div>
                        )}
                        Filter
                    </button>

                </div>
            </div>
            <div className="flex">
                {filterOpen && (
                    // <div className="w-64 bg-white p-6 rounded-lg shadow-lg  h-full">
                    <div
                        className={`fixed top-0 left-0 h-full bg-blue-50 p-6 rounded shadow transition-transform transform 
                        ${filterOpen ? 'translate-x-0' : '-translate-x-full'} z-50 sm:relative sm:translate-x-0 sm:block sm:w-64 lg:w-64`}
                    >

                        <button
                            onClick={toggleFilterPanel}
                            className="absolute top-3 text-sm right-3 text-gray-500 hover:text-gray-700  font-semibold"
                        >
                            ✕
                        </button>

                        {/* Color Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Color</label>
                            <div className="space-y-2">
                                {['black', 'blue', 'red'].map(color => (
                                    <label
                                        key={color}
                                        className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500 rounded mr-3"
                                            checked={filters.color.includes(color)}
                                            onChange={() => handleCheckboxChange('color', color)}
                                        />
                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Price Range</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(e.target.value)}
                            />
                            <span className="block text-sm text-gray-600 mt-2">{`Up to $${filters.priceRange[1]}`}</span>
                        </div>

                        {/* category Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
                            <div className="space-y-2">
                                {['Phone', 'Computer', 'SmartWatch', 'Camera', 'Headphone', 'Home', 'cloth'].map(type => (
                                    <label
                                        key={type}
                                        className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500 rounded mr-3"
                                            checked={filters.type.includes(type.toLowerCase())}  // Ensure this is the right condition
                                            onChange={() => handleCheckboxChange('type', type)}
                                        />
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                ))}

                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">Size</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['xxs', 'xs', 's', 'm', 'l', 'xl'].map(size => (
                                    <label
                                        key={size}
                                        className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-500 rounded mr-3"
                                            checked={filters.size.includes(size)}
                                            onChange={() => handleCheckboxChange('size', size)}
                                        />
                                        {size.toUpperCase()}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                )}
                <div className={`container grid grid-cols-2  md:rid-cols-4 lg:grid-cols-5  h-full   gap-4 md:gap-6 mx-auto px-4`}>
                    {loading ? (
                        // Display skeleton loading when data is being fetched
                        Array(15).fill(0).map((_, index) => (
                            <div key={index} className="relative h-full bg-white rounded-sm shadow-md">
                                <Skeleton height={200} width="100%" />
                                <div className="ps-2 pb-1">
                                    <Skeleton height={20} width="70%" />
                                    <Skeleton height={15} width="50%" />
                                </div>
                            </div>
                        ))
                    ) : currentItems.length > 0 ? (
                        currentItems.map(product => (
                            <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                                <Link to={`/product/${product._id}`}>
                                    <div className="overflow-hidden rounded-sm">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className={`w-full    ${filterOpen ? " h-[150px]" : " h-[200px]"}   object-cover transform hover:scale-110 transition-transform duration-300`}
                                        />
                                        <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">
                                            Sale
                                        </span>
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishlist(product._id);
                                    }}
                                    className="absolute top-2 right-2 p-2"
                                >
                                    <FontAwesomeIcon
                                        className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`}
                                        icon={faHeart}
                                    />
                                </button>

                                <div className="ps-2  ">
                                    <div className="flex space-x-1 pt-2">
                                        {product.color.map(color => (
                                            <button
                                                key={color}
                                                aria-label={`Select ${color}`}
                                                className="relative w-4 h-4 md:w-6 md:h-6 rounded-full border-1 border-gray hover:border-gray-500 duration-75"
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            />
                                        ))}
                                    </div>
                                    <h2 className="   product-card__title text-start pt-1 lg:pt-3 font-medium text-gray-900">
                                        {product.title}
                                    </h2>
                                    <div>
                                        <div>
                                            <span className="new-price font-medium">${product.newPrice}</span>
                                            <span className="  line-through text-gray-500 ml-2">${product.oldPrice}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full">No products found with the selected filters.</p>
                    )}
                </div>
            </div>

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

export default Collection;