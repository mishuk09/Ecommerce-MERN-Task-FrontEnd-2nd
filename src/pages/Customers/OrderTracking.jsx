const OrderTracking = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6">Order Tracking</h2>
            <div className="bg-gray-50 p-6 border rounded-md">
                <p className="mb-4">To track your order, please enter your tracking number below:</p>
                <form className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter your tracking number" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Track Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderTracking;
