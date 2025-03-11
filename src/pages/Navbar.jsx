import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingCart, MapPin, Truck, Gift } from "lucide-react";
import Cart from "./Cart/Cart";
import PropTypes from 'prop-types';
import { useCart } from "./Cart/CartContext";
import axios from "axios";

export default function Navbar({ toggleCart, isCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticate, setIsauthenticate] = useState(false);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const { cartItems } = useCart(); // Access cart items from the context
  // const categories = [
  //   {
  //     name: "Groceries",
  //     subcategories: ["Vegetables", "Fruits", "Dairy"],
  //   },
  //   {
  //     name: "Premium Fruits",
  //     subcategories: ["Apples", "Berries", "Citrus"],
  //   },
  //   {
  //     name: " Kitchen",
  //     subcategories: ["Cookware", "Furniture", "Decor"],
  //   },
  //   {
  //     name: "Fashion",
  //     subcategories: ["Men", "Women", "Accessories"],
  //   },
  //   {
  //     name: "Electronics",
  //     subcategories: ["Mobiles", "Laptops", "Cameras"],
  //   },
  //   {
  //     name: "Beauty",
  //     subcategories: ["Makeup", "Skincare", "Fragrance"],
  //   },
  //   {
  //     name: "Home  ",
  //     subcategories: ["Tools", "Lighting", "Paint"],
  //   },
  //   {
  //     name: "Sports ",
  //     subcategories: ["Sports", "Toys", "Travel Gear"],
  //   },
  // ];


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items/allitem");
        const allItems = response.data; // Assuming response.data is an array of objects

        const filteredItems = allItems.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [search]); // Dependency added for filtering on search



  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsauthenticate(!!token)
  }, [])

  return (
    <div>
      <nav className="   ">
        {/* Top Bar */}
        {/* <div className="bg-gray-100">
          <div className="  max-w-7xl mx-auto text-sm text-gray-600 px-4 py-3 flex text-center md:justify-between items-center">
            <span className="hidden md:block">Welcome to worldwide Megamart!</span>
            <div className="flex items-center justify-center text-center space-x-4">
              <span className="flex cursor-pointer  pe-4  border-r-2 border-gray-500 items-center"><MapPin size={16} className="mr-1 nav-icon" /> Deliver to 423651</span>
              <span className=" hidden md:flex cursor-pointer  md:pe-4  border-r-2 border-gray-500 items-center"><Truck size={16} className="mr-1  nav-icon" /> Track your order</span>
              <span className="flex cursor-pointer   items-center"><Gift size={16} className="mr-1 nav-icon" /> All Offers</span>
            </div>
          </div>
        </div> */}

        {/* Main Navbar */}
        <div className="border-b border-gray-200">
          <div className="flex  max-w-7xl mx-auto mt-1  border-gray-300   items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center space-x-3">
              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu size={28} />
              </button>
              <a href="/" className="text-2xl font-bold icon-img">MegaMart</a>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-grow justify-end mx-10">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search essentials, groceries and more..."
                className="w-2/4 px-4 py-1 text-sm border bg-gray-100 border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="src-btn text-white px-6 py-2 rounded-r-md">
                <Search size={20} />
              </button>
            </div>

            {items.length > 0 ? (
              items.map((item) => <p key={item._id}>{item.title}</p>)
            ) : (
              <p>No items found</p>
            )}

            {/* User & Cart */}
            <div className="flex items-center space-x-4">
              <a href={authenticate ? '/dashboard' : '/signin'} className="hidden cursor-pointer md:flex items-center space-x-1">
                <User className="nav-icon" size={24} />
                <span className="font-semibold text-sm">Sign Up/Sign In</span>
              </a>
              <button onClick={toggleCart} className="flex relative cursor-pointer items-center">
                <ShoppingCart className="nav-icon" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute w-4 bg-gray-600 top-[-5px] right-[-5px] text-center text-xs font-semibold text-white rounded-full px-1">
                    {cartItems.length}
                  </span>

                )}
              </button>
            </div>
          </div>
        </div>



        {/* <div className="border-b-1 border-gray-200">
          <div className="hidden max-w-7xl mx-auto  md:flex px-4 py-3 ">
            {categories.map((category, index) => (
              <div key={index} className="group relative mx-1 cursor-pointer w-full">
              
                <div className="flex text-center justify-center items-center rounded-full text-gray-700 py-1 px-1 bg-gray-100 gap-2 hover:text-primary transition-colors duration-200">
                  <span>{category.name}</span>
                  <span><ChevronDown size={20} className="nav-icon" /> </span>  
                </div>
 
                <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg w-full mt-1 rounded-md overflow-hidden border border-gray-200 z-10 transition-opacity duration-700 delay-300">
                  {category.subcategories.map((sub, subIndex) => (
                    <p
                      key={subIndex}
                      className="text-gray-600 text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sub}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}


        {/* Mobile Search Bar */}
        {menuOpen && (
          <div className="md:hidden p-4">
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        )}

      </nav>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}

Navbar.propTypes = {
  isCartOpen: PropTypes.bool.isRequired,  // Since isCartOpen is expected to be a boolean
  toggleCart: PropTypes.func.isRequired,  // Since toggleCart is expected to be a function
};


