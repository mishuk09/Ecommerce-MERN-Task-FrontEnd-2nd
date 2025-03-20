import { useEffect, useState } from 'react';
import { useCart } from './CartContext';

import am from '../../assets/footer/am.svg';
import master from '../../assets/footer/master.svg';
import visa from '../../assets/footer/visa.svg';
import axios from 'axios';
import Alert from '../../components/Alert';

const Checkout = () => {
    const { cartItems, setCartItems } = useCart();
    const [success, setSuccess] = useState(false);
    const { clearCart } = useCart();

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
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">1. General Information</h2>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full p-2 mb-2 border rounded border-gray-300 ${errors.fullName ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
                            <label className="block mb-2 text-base">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 mb-2 border rounded border-gray-300"
                            />
                            <label className="block mb-2 text-base">Phone Number *</label>
                            <div className="flex mb-4">
                                {/* <span className="inline-flex text-base items-center px-3 border border-r-0 rounded-l bg-gray-200">AUG</span> */}
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded border-gray-300 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                    required
                                />
                            </div>
                            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                            <label className="block mb-2 text-base">Order Note (any message for us)</label>
                            <textarea
                                name="orderNote"
                                defaultValue={formData.orderNote}
                                onChange={handleChange}
                                className="w-full min-h-10 max-h-[100px] border-gray-300 p-2 mb-2 border rounded"
                            ></textarea>

                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">2. Delivery Address</h2>
                            <label className="block mb-2 text-base">City / District *</label>
                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`w-full p-2 mb-2 border rounded border-gray-300 ${errors.city ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.city && <p className="text-red-500">{errors.city}</p>}
                            <label className="block mb-2 text-base">Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full p-2 mb-2 border rounded border-gray-300 ${errors.address ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.address && <p className="text-red-500">{errors.address}</p>}
                            <label className="block mb-2 text-base">PIN code</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                className="w-full p-2 mb-2 border rounded border-gray-300"
                            />
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
                                        type="submit"
                                        className="w-full p-3 mt-4 pay-btn text-white font-bold rounded"
                                    >
                                        Pay Now
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
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className='flex items-center gap-4 px-6 py-4 border-b border-gray-200'>
                                    <img className='w-20 h-20 object-cover rounded-lg' src={item.img} alt={item.title} />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-base text-gray-600">Variant: {item.color} / {item.size}</p>
                                        <p className="text-gray-800">$ {item.price} x {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-6 py-4">
                            <span className="font-semibold">Sub-total</span>
                            <span>$ {calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between px-6 py-4">
                            <span className="font-semibold">Delivery Charge</span>
                            <span>$ 100</span>
                        </div>
                        <div className="flex justify-between px-6 py-4">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="text-lg font-semibold">$ {calculateTotal() + 100}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;






