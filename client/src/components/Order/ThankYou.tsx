import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-lg mb-8">Your order has been successfully placed. We appreciate your business!</p>
            <div className="flex flex-col items-center">
                <button
                    className="btn btn-primary mb-2"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/Orders')}
                >
                    View Orders
                </button>
            </div>
        </div>
    );
};
