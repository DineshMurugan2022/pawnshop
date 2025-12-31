import React from 'react';
import { X, Gem } from 'lucide-react';
import { PaymentGateway } from './PaymentGateway';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: {
        name: string;
        price: number;
        image_url?: string;
    }[];
    totalAmount: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen,
    onClose,
    items,
    totalAmount,
}) => {
    if (!isOpen) return null;

    const handleSuccess = (_paymentIntent: any) => {
        alert('Payment Successful! Thank you for your purchase.');
        onClose();
    };

    const handleError = (error: string) => {
        alert(`Payment Error: ${error}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Order Summary */}
                <div className="w-full md:w-1/2 p-6 bg-gray-50 border-r border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                    </div>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Gem className="h-8 w-8 text-gray-400 m-auto mt-4" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                                    <p className="text-sm text-purple-600 font-medium">
                                        {new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'INR',
                                            maximumFractionDigits: 0
                                        }).format(item.price)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span className="text-purple-600">
                                {new Intl.NumberFormat('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                    maximumFractionDigits: 0
                                }).format(totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="w-full md:w-1/2 p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-6">Secure Payment</h3>
                        <PaymentGateway
                            amount={totalAmount}
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                        <p className="mt-6 text-xs text-gray-500 text-center">
                            Your payment information is encrypted and secure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
