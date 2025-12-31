import React, { createContext, useContext, useState } from 'react';

export type MetalRates = {
    gold: number;     // per gram (24K)
    gold22k: number;  // per gram
    silver: number;   // per gram
    platinum: number; // per gram
    diamond: number;  // per carat (simplified)
};

type RateContextType = {
    rates: MetalRates;
    calculateProductPrice: (weight: number, metalType: string, wastagePercent: number, basePrice?: number, productName?: string) => {
        basePrice: number;
        wastageAmount: number;
        cgst: number;
        sgst: number;
        totalPrice: number;
    };
};

const RateContext = createContext<RateContextType | undefined>(undefined);

export const RateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Mock daily rates (could be fetched from an API later)
    const [rates] = useState<MetalRates>({
        gold: 6250.00,    // ₹6,250 per gram for 24K
        gold22k: 5730.00, // ₹5,730 per gram for 22K
        silver: 75.50,    // ₹75.50 per gram
        platinum: 3200.00,
        diamond: 65000.00 // per carat
    });

    const calculateProductPrice = (weight: number, metalType: string, wastagePercent: number, basePrice: number = 0, productName: string = '') => {
        let metalRate = 0;

        switch (metalType.toLowerCase()) {
            case 'gold':
                // Check if it's 24K (Coins) or 22K (Jewelry)
                metalRate = productName.toLowerCase().includes('24k') ? rates.gold : rates.gold22k;
                break;
            case 'silver':
                metalRate = rates.silver;
                break;
            case 'platinum':
                metalRate = rates.platinum;
                break;
            case 'diamond':
                metalRate = rates.diamond;
                break;
            default:
                return {
                    basePrice: basePrice,
                    wastageAmount: 0,
                    cgst: basePrice * 0.015,
                    sgst: basePrice * 0.015,
                    totalPrice: basePrice * 1.03
                };
        }

        const metalValue = weight * metalRate;
        const wastageAmount = metalValue * (wastagePercent / 100);
        const subtotal = metalValue + wastageAmount;
        const cgst = subtotal * 0.015;
        const sgst = subtotal * 0.015;
        const total = subtotal + cgst + sgst;

        return {
            basePrice: metalValue,
            wastageAmount,
            cgst,
            sgst,
            totalPrice: total
        };
    };

    return (
        <RateContext.Provider value={{ rates, calculateProductPrice }}>
            {children}
        </RateContext.Provider>
    );
};

export const useRates = () => {
    const context = useContext(RateContext);
    if (!context) {
        throw new Error('useRates must be used within a RateProvider');
    }
    return context;
};
