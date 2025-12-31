import React from 'react';
import { useRates } from '../context/RateContext';
import { TrendingUp } from 'lucide-react';

const LiveMetalRates: React.FC = () => {
    const { rates } = useRates();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(price);
    };

    return (
        <div className="bg-white border-b border-gray-200 overflow-x-auto">
            <div className="container mx-auto px-4 py-2 flex items-center gap-6 whitespace-nowrap min-w-max">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Live Rates (per gram)</span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 rounded-full border border-yellow-100">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                        <span className="text-gray-600">Gold 24K:</span>
                        <span className="text-gray-900 font-bold">{formatPrice(rates.gold)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                        <span className="text-gray-600">Gold 22K (Jewelry):</span>
                        <span className="text-gray-900 font-bold">{formatPrice(rates.gold22k)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
                        <span className="text-gray-600">Silver:</span>
                        <span className="text-gray-900 font-bold">{formatPrice(rates.silver)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                        <span className="text-gray-600">Platinum:</span>
                        <span className="text-gray-900 font-bold">{formatPrice(rates.platinum)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-50 rounded-full border border-cyan-100">
                        <span className="text-gray-600">Diamond (ct):</span>
                        <span className="text-gray-900 font-bold">{formatPrice(rates.diamond)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMetalRates;
