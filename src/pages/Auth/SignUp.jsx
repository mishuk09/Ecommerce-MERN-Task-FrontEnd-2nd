import axios from "axios";
import { useState } from "react";
import RedAlert from "../../components/RedAlert";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router";
import LoadingSpin from "../../components/LoadingSpin";


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error before request

        const userData = { firstName, lastName, email, password };

        try {
            await axios.post('https://ecommerce-mern-task-backend.onrender.com/auth/signup', userData);
            setSuccess('Register Successfull...');
            setTimeout(() => {
                setSuccess('');
                navigate('/signin');
            }, 3000)
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => {
                setError(null);
            }, 2000)
            console.error("Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up 🔒</h2>

                {error && <RedAlert name={error} />}
                {success && <Alert name={success} />}

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex gap-4">
                        <div className="mb-4 flex-grow">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                aria-label="First Name"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 flex-grow">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                aria-label="Last Name"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            aria-label="Email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            aria-label="Password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 p-3 signup-btn text-white  rounded-lg  transition duration-200 focus:outline-none  "
                    >
                        {
                            loading ? <LoadingSpin /> : 'Sign Up'
                        }
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/signin" className="text-blue-600 hover:underline">Sign In 🔑</a>
                </p>
            </div>
        </div >
    );
};

export default SignUp;
