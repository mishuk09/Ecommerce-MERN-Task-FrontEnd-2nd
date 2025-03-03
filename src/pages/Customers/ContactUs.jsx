const ContactUs = () => {
    return (
        <div className="bg-gray-50 py-16 px-6">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">📞 Contact Us</h2>
                <p className="text-gray-600 mb-12 text-lg">
                    For any inquiries or assistance, feel free to reach out to us using the information below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Address */}
                    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">📍 Address</h3>
                        <p className="text-gray-600">123 Main Street</p>
                        <p className="text-gray-600">City, State, 12345</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">📱 Phone</h3>
                        <p className="text-gray-600">(123) 456-7890</p>
                    </div>

                    {/* Email */}
                    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">📧 Email</h3>
                        <p className="text-gray-600">info@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
