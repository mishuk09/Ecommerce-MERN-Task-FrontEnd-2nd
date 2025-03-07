import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../Cart/CartContext';

const ProductPage = ({ toggleCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Optionally for loading state
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        const productData = response.data;
        setProduct(productData.singleItem);
        setSelectedColor(productData.color?.[0] || ''); // Default to empty string if undefined
        setSelectedSize(productData.size?.[0] || '');   // Default to empty string if undefined
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



  const handleQuantityChange = (increment) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
  };


  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      addToCart({
        productId: product.id,
        title: product.title,
        img: product.img,
        color: selectedColor,
        size: selectedSize,
        price: product.newPrice,
        quantity
      });
      toggleCart(); // Open cart when item is added
    } else {
      navigate('/signin'); // Redirect to sign-in page if token is missing
    }
  };


  // const handleAddToCart = () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     addToCart({
  //       id: product.id,
  //       title: product.title,
  //       img: product.img,
  //       color: selectedColor,
  //       size: selectedSize,
  //       price: product.newPrice,
  //       quantity
  //     });
  //     toggleCart(); // Open cart when item is added
  //   } else {
  //     navigate('/signin'); // Redirect to sign-in page if token is missing
  //   }
  // };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };



  return (
    <div className="container mt-10 mb-20 mx-auto p-4">
      {
        loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (

          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <img
                className="w-full h-64 md:h-full object-cover rounded-lg shadow-md"
                src={product.img}
                alt={product.title}
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 lg:sticky self-start top-0">
              <span className="uppercase text-xs text-gray-500">{product.category}</span>
              <h1 className="text-3xl font-bold mt-2 mb-4">{product.title}</h1>

              {/* Price Section */}
              <div>
                <span className="text-xl font-semibold">${product.newPrice}</span>
                <sup className="text-sm text-gray-800"> 99</sup>
                <span className="line-through ms-2 text-gray-500">${product.oldPrice}</span>
              </div>

              <p className="text-green-500 font-bold mt-2 mb-2">
                {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}% OFF
              </p>

              <StarRating rating={5} reviews={5} />

              {/* Description */}
              <div className="mt-6">
                <p className="text-gray-700 mb-3">{stripHtmlTags(product.description)}</p>
                <p className="text-gray-700">Made in Australia</p>
              </div>

              {/* Color Selection */}
              <div className="mb-4 mt-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Color</label>
                <div className="flex flex-wrap gap-2">
                  {(product.color || []).map(color => (
                    <button
                      key={color}
                      aria-label={`Select ${color}`}
                      className={`relative w-10 h-10 rounded-sm border-2 hover:border-[3px] hover:border-white duration-75 ${selectedColor === color ? 'ring-1 ring-black' : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4 mt-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Size</label>
                <div className="flex flex-wrap gap-2">
                  {(product.size || []).map(size => (
                    <button
                      key={size}
                      aria-label={`Select size ${size}`}
                      className={`w-10 h-10 flex items-center justify-center text-base border ${selectedSize === size ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>


              {/* Quantity Selector */}
              <div className="mb-4 items-center">
                <label className="text-sm font-semibold text-gray-700 mr-4">Quantity</label>
                <div className="flex mt-3 items-center">
                  <button
                    aria-label="Decrease quantity"
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    &ndash;
                  </button>
                  <span className="w-12 text-center text-gray-800">{quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="add-to-cart mt-10 text-white w-full px-6 py-2 rounded-lg shadow-md  "
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>


        )
      }
    </div>
  );
};

ProductPage.propTypes = {
  toggleCart: PropTypes.func.isRequired,
};

export default ProductPage;




// StarRating component
const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {/* Displaying stars based on rating value */}
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < rating ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-5 h-5 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        ))}
      </div>
      {/* Displaying review count */}
      <span className="text-sm text-gray-600">{reviews} Reviews</span>
    </div>
  );
};


StarRating.propTypes = {
  rating: PropTypes.number.isRequired, // rating should be a number since it's used for star count
  reviews: PropTypes.number.isRequired, // reviews should also be a number
};
