import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    wishlist: string[]; // Store product IDs
    toggleWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    const toggleWishlist = (productId: string) => {
        setWishlist(prev => {
            const newWishlist = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];

            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.includes(productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
