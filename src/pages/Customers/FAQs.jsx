import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: 'What is your return policy?',
            answer: 'You can return any item within 30 days of purchase. Make sure the item is in its original condition with all packaging intact.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email. Use this number on our tracking page to check your order status.',
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on your location.',
        },
        {
            question: 'Can I cancel or change my order?',
            answer: 'You can cancel or modify your order within 24 hours of placing it. Please contact our customer service team for assistance.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept major credit cards, PayPal, and other secure payment methods. All transactions are encrypted for your safety.',
        },
        {
            question: 'How do I apply a discount code?',
            answer: 'You can apply your discount code during checkout. Enter the code in the designated field and click "Apply" to see the updated total.',
        },
        {
            question: 'Is my personal information secure?',
            answer: 'Yes, we take data privacy seriously. Your information is securely encrypted and never shared with third parties without your consent.',
        },
        {
            question: 'What should I do if I receive a damaged item?',
            answer: 'If you receive a damaged item, please contact our support team within 7 days of delivery. We’ll arrange for a replacement or refund.',
        },
        {
            question: 'How long will it take to receive my order?',
            answer: 'Delivery times depend on your location. Standard shipping typically takes 3-7 business days, while international shipping may take longer.',
        },
        {
            question: 'Do you offer bulk discounts for large orders?',
            answer: 'Yes, we offer special discounts for bulk orders. Please reach out to our sales team for more information and pricing.',
        },
    ];

    return (
        <div className="bg-gray-100 py-16 px-6">
            <div className="max-w-screen-lg mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 bg-white rounded   transition-all duration-300"
                        >
                            <div
                                className="flex items-center justify-between p-5 cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                                {activeIndex === index ? (
                                    <ChevronUp size={24} className="text-gray-500" />
                                ) : (
                                    <ChevronDown size={24} className="text-gray-500" />
                                )}
                            </div>
                            {activeIndex === index && (
                                <div className="p-5 pt-0 text-start text-gray-600 border-t border-gray-200">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
