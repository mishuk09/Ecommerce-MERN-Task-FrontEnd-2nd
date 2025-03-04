
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, Package, User, Pin } from 'lucide-react';
import axios from 'axios';
import Alert from '../../components/Alert';


const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("tab1");
    const [editFormVisible, setEditFormVisible] = useState(null);
    const [wishlist, setWishlist] = useState([]); // To store filtered wishlist products
    const [loading, setLoading] = useState(true); // Loading state
    const [order, setOrder] = useState([]);
    const [success, setSuccess] = useState('');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        mobile: '',
        address: '',
        newPassword: '',
        confirmPassword: '',
    });



    useEffect(() => {
        // Fetch wishlist items by ID from localStorage
        const storedItems = JSON.parse(localStorage.getItem('wishlist')) || {}; // Retrieve wishlist object from localStorage

        // Get all the keys (product IDs) from the object
        const productIds = Object.keys(storedItems);

        // Fetch items from the API
        axios.get('http://localhost:5000/items/allitem/')
            .then(response => {
                console.log(response.data);  // Log the response data to check its structure

                // Check if response.data is an array or an object containing an array
                const items = Array.isArray(response.data) ? response.data : response.data.items; // Adjust based on actual response structure

                // Filter the products based on the stored product IDs
                const filteredPosts = items.filter(product =>
                    productIds.includes(product._id)  // Check if product ID is in the stored productIds array
                );

                // Update the wishlist state with the filtered posts
                setWishlist(filteredPosts);

                // Set loading to false once data is fetched
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);  // Set loading to false in case of error
            });
    }, []);

    //Fetch order
    useEffect(() => {
        const storedEmail = localStorage.getItem('email'); // Retrieve email from local storage
        axios.post('http://localhost:5000/order/allorder')
            .then(response => {
                const filteredPosts = response.data.filter(orders => orders.email === storedEmail); // Compare with stored email
                setOrder(filteredPosts);
                // setLoading(false);
            })
            .catch(error => {
                console.log(error);
                // setLoading(false);
            });
    }, []);


    // Function to toggle the edit form visibility
    const toggleEditForm = (formType) => {
        // If the formType is already visible, close it; otherwise, open the corresponding form
        if (editFormVisible === formType) {
            setEditFormVisible(null); // Close the form
        } else {
            setEditFormVisible(formType); // Open the selected form
        }
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/auth/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data.profile);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/signin');
                }
            }
        };

        fetchData();
    }, [navigate]);


    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.id]: e.target.value,
        });
    };


    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                'http://localhost:5000/auth/update-profile',
                {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    gender: profile.gender,
                    email: profile.email,
                    mobile: profile.mobile,
                    address: profile.address,
                    newPassword: profile.newPassword === profile.confirmPassword ? profile.newPassword : null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccess('Profile updated successfully');
            setTimeout(() => {
                setSuccess('')
            }, 2000)
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }
    };



    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('address');
        localStorage.removeItem('cartItems');

        navigate('/signin');
    };

    if (loading) {
        return <div>Loading...</div>; // You can use a loading skeleton or any other placeholder
    }
    return (
        <div className="min-h-screen flex flex-col   px-4">

            {success && <Alert name={success} />}

            <main className="flex-grow container mx-auto px-4  ">
                <div className="shop-head border-b border-gray-300 h-[120px] sm:h-[120px] flex items-center text-center justify-center relative">
                    <div className="flex relative shop-h-text custom-container flex-col h-auto w-full text-center justify-center">
                        <p className="text-[20px] sm:text-[26px] lg:text-[30px] font-bold">My Account</p>
                        <span className="text-center text-[12px] cart-access lg:text-[14px]">
                            <span>Home /</span> Account
                            {/* {wishlist.length} */}

                        </span>
                    </div>
                    <div className="overlay1"></div>
                </div>

                <div className="tabs custom-container  profile-head">

                    <div className="dashbord-parent md:px-1 lg:px-3 bg-white">
                        <div className="tab-links h-[200px] grid rounded">
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab1" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab1")}
                            >
                                <div className='flex items-center'><User size={18} className='me-1' /> Profile</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab2" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab2")}
                            >
                                <div className='flex items-center'><Package size={18} className='me-1' />  Orders</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab3" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab3")}
                            >
                                <div className='flex items-center'><Pin size={18} className='me-1' /> Your Address</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab4" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab4")}
                            >
                                <div className='flex items-center'><Heart size={18} className='me-1' /> Your Wishlist</div>
                            </div>
                            <div
                                className="flex items-center text-center cursor-pointer p-2 rounded   text-black"
                                onClick={handleLogout}
                            >
                                <div className='flex items-center'><LogOut size={18} className='me-1' /> Log Out</div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-content-2 bg-white mb-[100px] md:border-l border-gray-300">
                        {activeTab === "tab1" && (
                            <div className="tab">
                                <h2 className="text-gray-600">Welcome <span className="font-semibold">{profile.lastName}</span></h2>

                                <p className="text-[18px] font-medium mt-7">Personal Information</p>
                                <div className="mb-8">
                                    <div className="sm:flex gap-6 personal-inout text-[14px] mt-3">
                                        <input
                                            className="border outline-none px-2"
                                            placeholder="First Name"
                                            type="text"
                                            id="firstName"
                                            value={profile.firstName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="border outline-none mt-4 sm:mt-0 px-2"
                                            placeholder="Last Name"
                                            type="text"
                                            id="lastName"
                                            value={profile.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <p className="text-[18px] font-medium">Your Gender</p>
                                <div className="flex gap-4 mt-3">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={profile.gender === 'Male'}
                                            onChange={() => setProfile({ ...profile, gender: 'Male' })}
                                        /> Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={profile.gender === 'Female'}
                                            onChange={() => setProfile({ ...profile, gender: 'Female' })}
                                        /> Female
                                    </label>
                                </div>
                                <div className="w-1/2  gap-6 personal-inout text-[14px] mt-3">
                                    <p className="text-[18px] font-medium mt-8">Email Address</p>
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Email"
                                        type="email"
                                        id="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2  gap-6 personal-inout text-[14px] mt-3">

                                    <p className="text-[18px] font-medium mt-8">Mobile Number</p>
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Mobile Number"
                                        type="text"
                                        id="mobile"
                                        value={profile.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2  gap-6 personal-inout text-[14px] mt-3">

                                    <p className="text-[18px] font-medium mt-8">Your Address</p>
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Address"
                                        type="text"
                                        id="address"
                                        value={profile.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <p className="text-[18px] font-medium mt-8">Reset Password</p>
                                <div className="sm:flex gap-6 personal-inout text-[14px] mt-3">
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="New Password"
                                        type="password"
                                        id="newPassword"
                                        value={profile.newPassword}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Confirm New Password"
                                        type="password"
                                        id="confirmPassword"
                                        value={profile.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button onClick={handleSave} className="mt-6 rounded-md text-white edit-btn-2 w-1/2 py-2 ">Save</button>
                            </div>
                        )}
                        {activeTab === "tab2" && (
                            <div className="tab">
                                <p className="sm:text-[24px] text-[20px] font-medium mt-0">Order history</p>
                                {order.map((order) => (
                                    <div key={order._id} className="rounded bg-white mb-4">
                                        <div className="flex flex-col sm:items-center sm:flex-row order-cart-d border-t border-r border-l rounded-t border-gray-300 justify-between p-4">
                                            <div className="flex gap-14">
                                                <div>
                                                    <div className="flex lg:flex-col">
                                                        <p className="text-[12px] order-t text-gray-600">Order Placed</p>
                                                        <p className="text-[12px] ms-2 order-child lg:ms-0 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="flex lg:hidden">
                                                        <p className="text-[12px] order-t text-gray-600">Ship to</p>
                                                        <p className="text-[12px] order-child ms-2 lg:ms-0 font-semibold">{order.fullName}</p>
                                                    </div>
                                                    <div className="flex lg:hidden">
                                                        <p className="text-[14px] order-t text-gray-600">Total</p>
                                                        <p className="text-[14px] order-child ms-2 lg:ms-0 font-semibold">Rs {order.totalAmount}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden lg:block">
                                                    <p className="text-[12px] order-t text-gray-600">Total</p>
                                                    <p className="text-[12px] order-child ms-2 lg:ms-0 font-semibold">Rs {order.totalAmount}</p>
                                                </div>
                                                <div className="hidden lg:block">
                                                    <p className="text-[12px] order-t text-gray-600">Ship to</p>
                                                    <p className="text-[12px] order-child ms-2 lg:ms-0 font-semibold">{order.fullName}</p>
                                                </div>
                                            </div>
                                            <div className="items-center mt-2 sm:mt-0 text-center justify-center">
                                                <p className="text-[14px] order-tt items-center flex text-center sm:justify-end font-semibold">
                                                    Order # {order._id}
                                                </p>
                                                <div className="flex items-center justify-start sm:justify-end text-gray-600 text-[12px]">
                                                    <a href="/track/track.html" className="underline">
                                                        View order details
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {order.cartItems.map((item) => (
                                            <div key={item.productId} className="cart-body-child border-gray-300 relative order-cart-d rounded-b border text-[14px] p-4 flex">
                                                <div className="w-[100px] md:w-[120px] h-[100px] md:h-full overflow-hidden flex md:items-center">
                                                    <img className="w-[100px] h-[100px] hover:scale-105 duration-300" src={item.img} alt={item.title} />
                                                </div>
                                                <div className="cart-body-child5 flex flex-col justify-between">
                                                    <div className="w-full">
                                                        <a href="/products/products.html" className="text-[16px] font-medium cart-p-title">
                                                            {item.title}
                                                        </a>
                                                        <div className="lg:flex hidden items-center price-color lg:mt-0">
                                                            <p className="text-[14px] font-semibold me-2 cursor-auto">Color: {item.color}</p>
                                                            <p className="text-[14px] font-semibold me-2 cursor-auto">Size: {item.size}</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-auto lg:h-full px-1 text-[14px] flex lg:items-center lg:text-center lg:justify-center">
                                                        Qty: {item.quantity}
                                                    </div>
                                                    <div className="h-auto lg:h-full px-1 text-[14px] order-price-c flex lg:items-center lg:text-center lg:justify-center">
                                                        Rs {item.price}
                                                    </div>
                                                    <div className=" pb-2 sm:pb-0 h-auto lg:h-full flex lg:items-center lg:text-center lg:justify-center">
                                                        <div className="flex items-center price-color sm:mt-0">
                                                            <p className="text-[14px] ps-1 phone-total font-semibold cursor-auto">
                                                                Shipping
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="h-auto lg:h-full mb-2 lg:mb-0 px-1 lg:px-2 text-[14px] flex lg:items-center lg:text-center lg:justify-end">
                                                        Deliver on {new Date(item.deliveryDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === "tab3" && (
                            <div className="tab">
                                <p className="sm:text-[24px] text-[20px] font-medium">Your Address (1)</p>

                                <div className="address-div mt-6 md:flex md:gap-3">
                                    {/* Default Address Card */}
                                    <div className="w-full h-[full] border rounded-md">
                                        <div className="w-[100%] md:w-[100%] relative h-[270px] md:h-[320px] lg:h-[270px] border rounded">
                                            <div className="w-full h-12 bg-slate-100 flex items-center px-6">
                                                Default addresses
                                            </div>
                                            <div className="address-details px-6 pt-4 pb-4">
                                                <p className="pt-1 font-semibold">Hasan Mahmud</p>
                                                <p className="pt-1">batlil54@gmail.com</p>
                                                <p className="pt-1">Atlas, Vomra, UNITED KINGDOM.</p>
                                                <p className="pt-1">Address 2: 123 Main St</p>
                                                <p className="pt-1">Phone: +766 657637643</p>
                                            </div>
                                            <div className="flex editbtn w-full gap-3 px-6">
                                                <div
                                                    className="editbtn1 w-full flex items-center text-center justify-center bg-slate-100 border rounded-full h-10 cursor-pointer"
                                                    onClick={() => toggleEditForm("default")}
                                                >
                                                    EDIT
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Address Card */}
                                    <div className="w-full mt-4 md:mt-0 h-[full] border rounded-md">
                                        <div className="w-[100%] md:w-[100%] h-[270px] md:h-[320px] relative lg:h-[270px] border rounded">
                                            <div className="w-full h-12 bg-slate-100 flex items-center px-6">
                                                Shipping addresses
                                            </div>
                                            <div className="shipping-address-details px-6 pt-4 pb-4">
                                                <p className="pt-1 font-semibold">Hasan Mahmud</p>
                                                <p className="pt-1">ankur54@gmail.com</p>
                                                <p className="pt-1">Atlas, Vomra, UNITED KINGDOM.</p>
                                                <p className="pt-1">Address 2: 456 Elm St</p>
                                                <p className="pt-1">Phone: +766 657637643</p>
                                            </div>
                                            <div className="flex editbtn-one w-full gap-3 px-6">
                                                <div
                                                    className="editbtn-two w-full flex items-center text-center justify-center bg-slate-100 border rounded-full h-10 cursor-pointer"
                                                    onClick={() => toggleEditForm("shipping")}
                                                >
                                                    EDIT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Form for Default Address */}
                                {editFormVisible === "default" && (
                                    <div className="edit-form w-full mt-6">
                                        <p>Default Address</p>
                                        <form id="editAddressForm">
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none  border rounded mt-2"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address2"
                                                placeholder="Address 2"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                            />
                                            <button className="rounded-full mt-4" type="submit">
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Edit Form for Shipping Address */}
                                {editFormVisible === "shipping" && (
                                    <div className="edit-shipping-form w-full mt-6">
                                        <p>Shiping Address</p>
                                        <form id="editShippingAddressForm">
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none  border rounded mt-2"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address2"
                                                placeholder="Address 2"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                            />
                                            <button className="rounded-full mt-4" type="submit">
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>

                        )}
                        {activeTab === "tab4" && (
                            <div className="tab">
                                <h2 className='mb-4 font-medium'>Your Wishlist</h2>
                                {wishlist.length === 0 ? (
                                    <p>Your wishlist is empty.</p>
                                ) : (
                                    <div className="  grid grid-cols-2     md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 ">
                                        {wishlist.map(product => (
                                            <div key={product._id} className="relative bg-white rounded-sm shadow-md">
                                                <Link to={`/product/${product._id}`}>
                                                    <div className="overflow-hidden rounded-sm">
                                                        <img
                                                            src={product.img}
                                                            alt={product.title}
                                                            className="w-full  h-[150px] object-cover transform hover:scale-110 transition-transform duration-300"
                                                        />
                                                        <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">
                                                            Sale
                                                        </span>
                                                    </div>
                                                </Link>

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
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
