const ShippingReturns = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6">Shipping & Returns</h2>
            <div className="space-y-6">
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Shipping Information</h3>
                    <p>We offer free standard shipping on orders over $50. Expedited shipping options are available at checkout.</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Return Policy</h3>
                    <p>Returns are accepted within 30 days of delivery. Items must be in their original condition with tags attached.</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Return Process</h3>
                    <p>To initiate a return, please visit our returns page and follow the instructions. You will need your order number and email address.</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Refunds</h3>
                    <p>Refunds will be processed within 5-7 business days after we receive your return. The refund will be issued to the original payment method.</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturns;
