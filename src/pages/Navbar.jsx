import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import Cart from "./Cart/Cart";
import PropTypes from "prop-types";
import { useCart } from "./Cart/CartContext";

export default function Navbar({ toggleCart, isCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticate, setIsAuthenticate] = useState(false);
  const { cartItems } = useCart();

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticate(!!token);
  }, []);

  // Fetch search results dynamically
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/items/search?q=${query}`);
      const data = await response.json();

      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <nav>
        <div className="border-b border-gray-200">
          <div className="flex max-w-7xl mx-auto mt-1 items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center space-x-3">
              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu size={28} />
              </button>
              <a href="/" className="text-2xl font-bold">MegaMart</a>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-grow justify-end mx-10 relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-2/4 px-4 py-2 text-sm border bg-gray-100 border-gray-300 rounded-l-md focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="src-btn text-white px-6 py-2 rounded-r-md">
                <Search size={20} />
              </button>

              {/* Search Results Dropdown */}
              {searchQuery && (
                <div className="absolute top-12 w-2/4 bg-white border border-gray-300 shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <a key={product._id} href={`/product/${product._id}`} className="block px-4 py-2 boder-b hover:bg-gray-100">
                        <div className="flex items-center space-x-3   ">
                          {
                            Array.isArray(product.img) && product.img.slice(0, 1).map((imageUrl, index) => (

                              <img key={index} src={imageUrl} alt={product.title} className="w-10 h-10 object-cover rounded-md" />))
                          }
                          {/* <img src={product.img} alt={product.title} className="w-10 h-10 object-cover rounded-md" /> */}
                          <span>{product.title}</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No results found</p>
                  )}
                </div>
              )}
            </div>

            {/* User & Cart */}
            <div className="flex items-center space-x-4">
              <a href={authenticate ? "/dashboard" : "/signin"} className="  cursor-pointer flex items-center space-x-1">
                <User size={24} />
                <span className="font-medium hidden md:block text-sm">Sign Up/Sign In</span>
              </a>
              <button onClick={toggleCart} className="flex relative cursor-pointer items-center">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute w-4 bg-gray-600 top-[-5px] right-[-5px] text-center text-xs font-semibold text-white rounded-full px-1">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {menuOpen && (
          <div className="md:hidden p-4 relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />

            {/* Mobile Search Results Dropdown */}
            {searchQuery && (
              <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <a key={product._id} href={`/product/${product._id}`} className="block px-4 py-2 hover:bg-gray-100">
                      <div className="flex items-center space-x-3">
                        <img src={product.img} alt={product.title} className="w-10 h-10 object-cover rounded-md" />
                        <span>{product.title}</span>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>
        )}

      </nav>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}

Navbar.propTypes = {
  isCartOpen: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
};
