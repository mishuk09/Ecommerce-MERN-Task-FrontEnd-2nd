import { PackageCheck, CircleDollarSign, Undo2, CircleHelp } from 'lucide-react';

const Info = () => {
    return (
        <div className="bg-gray-50 mt-10 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 text-center">
                    {/* Fast Delivery */}
                    <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center text-gray-700">
                        <div className="mb-4 p-2 bg-blue-100 rounded-full">
                            <PackageCheck size={24} className="text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Fast Delivery</h3>
                        <p className="text-sm text-gray-500">Delivery within 24 hours max!</p>
                    </div>

                    {/* Safe Payment */}
                    <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center text-gray-700">
                        <div className="mb-4 p-2 bg-green-100 rounded-full">
                            <CircleDollarSign size={24} className="text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Safe Payment</h3>
                        <p className="text-sm text-gray-500">Visa, MasterCard, PayPal</p>
                    </div>

                    {/* Free Returns */}
                    <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center text-gray-700">
                        <div className="mb-4 p-2 bg-yellow-100 rounded-full">
                            <Undo2 size={24} className="text-yellow-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Free Returns</h3>
                        <p className="text-sm text-gray-500">Free returns within 15 days</p>
                    </div>

                    {/* Help Center */}
                    <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center text-gray-700">
                        <div className="mb-4 p-2 bg-purple-100 rounded-full">
                            <CircleHelp size={24} className="text-purple-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Help Center</h3>
                        <p className="text-sm text-gray-500">Dedicated 24/7 support</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
