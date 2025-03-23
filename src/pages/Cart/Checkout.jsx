import { useEffect, useState } from 'react';
import { useCart } from './CartContext';

import am from '../../assets/footer/am.svg';
import master from '../../assets/footer/master.svg';
import visa from '../../assets/footer/visa.svg';
import axios from 'axios';
import Alert from '../../components/Alert';
import LoadingSpin from '../../components/LoadingSpin';

const Checkout = () => {
    const { cartItems, setCartItems, clearCart } = useCart();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        orderNote: '',
        city: '',
        address: '',
        landmark: '',
    });
    const [errors, setErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [paymentMethod, setPaymentMethod] = useState('Card Payment');
    const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

    // Fetch logged-in user data
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        if (storedName && storedEmail) {
            setFormData((prevData) => ({
                ...prevData,
                fullName: storedName,
                email: storedEmail,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.address) newErrors.address = 'Address is required';
        return newErrors;
    };

    const validateCardDetails = () => {
        const newErrors = {};
        if (!cardDetails.cardNumber) newErrors.cardNumber = 'Card Number is required';
        if (!cardDetails.expiryDate) newErrors.expiryDate = 'Expiry Date is required';
        if (!cardDetails.cvv) newErrors.cvv = 'CVV is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newErrors = { ...validateForm(), ...validateCardDetails() };
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const orderData = {
            ...formData,
            cartItems,
            payment: true,
            totalAmount: calculateTotal() + 100,
            paymentMethod,
            cardDetails,
        };

        try {
            const response = await axios.post('http://localhost:5001/order/create', orderData);
            console.log(response.data);
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                orderNote: '',
                city: '',
                address: '',
                landmark: '',
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
            clearCart();
            setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' });
            setCartItems([]);

        } catch (error) {
            console.error('Error placing order:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    return (
        <div className="max-w-7xl mx-auto p-4 lg:px-0">
            {
                success && (
                    <Alert name="Order place successfull...." />
                )
            }
            <div className="text-center pb-6 border-b-1 border-gray-300">
                <h1 className="text-2xl mt-10 font-bold">Checkout</h1>
            </div>
            <div className="flex container flex-col lg:flex-row gap-10">
                <div className="w-full border-r-1 border-gray-300 pe-10 pt-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 space-y-4">
                            <h2 className="text-xl font-semibold mb-4">1. General Information</h2>

                            {/* Full Name */}
                            <div>
                                <label className="block mb-1 text-base font-medium">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 text-base font-medium">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block mb-1 text-base font-medium">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                            </div>

                            {/* Order Note */}
                            <div>
                                <label className="block mb-1 text-base font-medium">Order Note (any message for us)</label>
                                <textarea
                                    name="orderNote"
                                    defaultValue={formData.orderNote}
                                    onChange={handleChange}
                                    className="w-full min-h-10 max-h-[100px] p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        <div className="mb-6 space-y-4">
                            <h2 className="text-xl font-semibold mb-4">2. Delivery Address</h2>

                            {/* City / District */}
                            <div>
                                <label className="block mb-1 text-base font-medium">City / District *</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block mb-1 text-base font-medium">Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            {/* PIN Code */}
                            <div>
                                <label className="block mb-1 text-base font-medium">PIN Code</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">3. Payment Methods</h2>
                            {paymentMethod === 'Card Payment' && (
                                <div className="mb-4">
                                    <div className='mb-4'>
                                        <label className="block mb-1 text-sm">Card Number</label>
                                        <div className='flex items-center gap-4'>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={cardDetails.cardNumber}
                                                onChange={handleCardChange}
                                                className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : ''}`}
                                            />
                                            <div className='flex gap-1 items-center'>
                                                <img className="w-20" src={visa} alt="Visa" />
                                                <img className="w-20" src={master} alt="MasterCard" />
                                                <img className="w-20" src={am} alt="American Express" />
                                            </div>
                                        </div>
                                        {errors.cardNumber && <p className="text-red-500 mt-1">{errors.cardNumber}</p>}
                                    </div>

                                    <div className='flex w-full gap-4'>
                                        <div className='w-full'>

                                            <label className="block mb-1 text-sm">Expiry Date</label>

                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={cardDetails.expiryDate}
                                                onChange={handleCardChange}
                                                className={`w-full p-2 mb-2 border rounded border-gray-300 ${errors.expiryDate ? 'border-red-500' : ''}`}
                                            />
                                            {errors.expiryDate && <p className="text-red-500">{errors.expiryDate}</p>}
                                        </div>
                                        <div className='w-full'>

                                            <label className="block mb-1 text-sm">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={cardDetails.cvv}
                                                onChange={handleCardChange}
                                                className={`w-full p-2 mb-2 border rounded border-gray-300 ${errors.cvv ? 'border-red-500' : ''}`}
                                            />
                                            {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
                                        </div>
                                    </div>
                                    <button
                                        disabled={cartItems.length === 0}
                                        type="submit"
                                        className={`w-full p-3 mt-4 pay-btn ${clearCart.length == 0 ? "" : ""} text-white font-bold rounded`}
                                    >
                                        {
                                            loading ? <LoadingSpin /> : cartItems.length === 0 ? "Your Cart Empty" : "Pay Now"
                                        }
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>


                <div className="w-full pt-6  order-summerry lg:sticky lg:top-4 self-start">

                    <div className="mb-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 px-6 py-4 bg-gray-100 rounded-t-lg">Order Summary</h2>
                        <div className="max-h-60 overflow-y-auto">
                            {
                                cartItems && cartItems.length > 0 ? (

                                    cartItems.map((item, index) => (
                                        <div key={`${item.id}-${index}`} className="px-6 py-2 border-b border-gray-300 flex justify-between items-center">
                                            <div className="flex gap-2 items-center">
                                                <img
                                                    className="w-16 h-16 object-cover rounded"
                                                    src={item.img}
                                                    alt={item.title}
                                                />
                                                <div>
                                                    <p className="font-semibold">{item.title.split(' ').slice(0, 3).join(' ')}</p>
                                                    <p className="text-sm flex space-x-2">Variant: <img src={item.color} className='w-5 h-6' alt="" /> / {item.size}</p>
                                                    <p className="text-sm">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold">$ {item.price * item.quantity}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center p-4">Your cart is empty</p>
                                )
                            }
                        </div>
                        <div className="flex justify-between px-6 py-2 mt-4">
                            <span className="font-medium">Sub-total</span>
                            <span>$ {calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 px-6 py-2">
                            <span className="font-medium">Delivery Charge</span>
                            <span>$ 100</span>
                        </div>
                        <div className="flex justify-between px-6 py-2">
                            <span className="font-semibold text-xl">Total</span>
                            <span className="text-xl font-semibold">$ {calculateTotal() + 100}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;






