import React from 'react';
import { X, ShoppingBag, Trash2, Gem } from 'lucide-react';
import { JewelryItem } from '../lib/supabase';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: { [key: string]: number };
    items: JewelryItem[];
    updateCart: (itemId: string, quantity: number) => void;
    onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    cart,
    items,
    updateCart,
    onCheckout,
}) => {
    const cartItems = Object.entries(cart).map(([id, qty]) => {
        const item = items.find(i => i.id === id);
        return { ...item, quantity: qty } as (JewelryItem & { quantity: number });
    }).filter(item => item.id);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-bold flex items-center">
                            <ShoppingBag className="mr-2 h-6 w-6 text-purple-600" />
                            Your Cart
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-500">Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Gem className="h-10 w-10 text-gray-400 m-auto mt-5" />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-purple-600">{formatPrice(item.price)}</span>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateCart(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-12 text-center border rounded p-1"
                                                    />
                                                    <button
                                                        onClick={() => updateCart(item.id, 0)}
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="border-t p-6 bg-gray-50">
                            <div className="flex justify-between text-lg font-bold mb-6">
                                <span>Total Amount</span>
                                <span className="text-purple-600">{formatPrice(total)}</span>
                            </div>
                            <button
                                onClick={onCheckout}
                                className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                            >
                                Checkout Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
