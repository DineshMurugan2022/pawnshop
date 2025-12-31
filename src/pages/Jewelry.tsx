import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { JewelryItem } from '../lib/supabase';
import Footer from '../components/Footer';
import SeedButton from '../components/SeedButton';
import { Gem, Plus, Minus, ShoppingCart, ShoppingBag } from 'lucide-react';
import { CheckoutModal } from '../components/CheckoutModal';
import { CartDrawer } from '../components/CartDrawer';

// Fallback local data when Supabase is not available
const localJewelryItems: JewelryItem[] = [
  {
    id: '1',
    name: "Diamond Engagement Ring",
    description: "Stunning 1.5 carat diamond ring set in 18k white gold",
    price: 8500.00,
    category: "rings",
    image_url: "data:image/jpeg;base64,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",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: "Gold Tennis Bracelet",
    description: "Elegant 14k gold bracelet with perfect round diamonds",
    price: 4200.00,
    category: "bracelets",
    image_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxARBhURExATFhMVGBcWExcYExgaFRIWGBYXGBgRFhcZICogGRolHBcdLTEhJSktMDowIx8zRDMtOCovOisBCgoKDg0OGxAQGy8lHyYrNTIuMTI1Ly4tKy83LS83NS0vLi8tKysyLS0tLS8wLSstLS0vLSstLS0tKzUtLS0rL//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABAUGAQIDB//EADgQAAICAQMDAwIFAwIEBwAAAAECABEDBBIhBTFBEyJhBlEUMkJxgSNSkbHwocHR4QcVM2JygrL/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQIDBP/EACURAQEAAQQCAgICAwAAAAAAAAABAgMRITEEEhNBIlHB0TKRof/aAAwDAQACEQMRAD8A+4xEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARPLJqEUWzqO/cgdhZ/wJW6j6k0qZghyWxFgAHv4UnspPgGrlblJ3UyWreJR5PqEsrehgbKw5A3BQy3yQx47dvmu08k+oXfUbFxAFaZ1yHYyIwJV2HJHAN8d5S6+E+1pp5NDEyg63qfVGMtiYs2Snx2VVa3IXFGjztv4J80Odb1XOGOzJucIV9MYWAbISNrKx+AfMpfJwT8WTVTgsAasX/v8A6ygzHMuj3PnYbmUC/bsBPz3PHn/nK7qf06+p1/rprnXIF2HYykBOKUcWoJFkeT+wkZeRtPxm9Jh+62ANiczGfhdTo+l7MC5NVkyZC+QvnbCACDbBgh57cAc8mRdX9V6vCgbNpFxqCPd+OFE/Y78Qu/tJnkTjfs+O/TexMth6vk9FmdnRg5CoygtkBG4DEQfdYurF8duxnfR9ZysquzKikP7HVg5Ibnf7fZtG2+PJ71cn58UfHWmiZrH9SZMmV1xJjyFCqkjKAik8kl/7QOOBya7eJmf6gTEwGVGS/wBjQ8tY4Ir7X/rVprYX7RcMouYl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",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: "Pearl Necklace",
    description: "Classic strand of genuine South Sea pearls",
    price: 3200.00,
    category: "necklaces",
    image_url: "data:image/jpeg;base64,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",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: "Sapphire Earrings",
    description: "Royal blue sapphires surrounded by diamonds in 18k gold",
    price: 2800.00,
    category: "earrings",
    image_url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: "Rose Gold Watch",
    description: "Luxury timepiece with leather strap and mother-of-pearl dial",
    price: 5500.00,
    category: "watches",
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: "Platinum Wedding Band",
    description: "Simple and elegant platinum band for timeless commitment",
    price: 1800.00,
    category: "rings",
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: "Emerald Pendant",
    description: "Vibrant Colombian emerald in diamond halo setting",
    price: 3900.00,
    category: "pendants",
    image_url: "data:image/jpeg;base64,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",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: "Silver Chain",
    description: "Sterling silver chain with contemporary design",
    price: 450.00,
    category: "chains",
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Jewelry: React.FC = () => {
  const [jewelryItems, setJewelryItems] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<{ name: string, price: number, image_url?: string }[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  useEffect(() => {
    fetchJewelryItems();
  }, []);

  const fetchJewelryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('jewelry_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJewelryItems(data || []);
    } catch (error) {
      console.error('Error fetching jewelry items from Supabase, using local data:', error);
      // Use local data as fallback
      setJewelryItems(localJewelryItems);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(jewelryItems.map(item => item.category)))];

  const filteredItems = (selectedCategory === 'all'
    ? jewelryItems
    : jewelryItems.filter(item => item.category === selectedCategory))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const updateCart = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[itemId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [itemId]: quantity });
    }
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, qty]) => {
      const item = jewelryItems.find(i => i.id === itemId);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  const handleBuyNow = (item: JewelryItem) => {
    setCheckoutItems([{
      name: item.name,
      price: item.price,
      image_url: item.image_url || undefined
    }]);
    setCheckoutTotal(item.price);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutCart = () => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const item = jewelryItems.find(i => i.id === id);
      return item ? {
        name: item.name,
        price: item.price * qty,
        image_url: item.image_url
      } : null;
    }).filter(Boolean) as { name: string, price: number, image_url?: string }[];

    setCheckoutItems(items);
    setCheckoutTotal(getTotalPrice());
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Gem className="h-12 w-12 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading jewelry collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Jewelry Collection</h1>
            <p className="text-gray-600">Discover our exquisite selection of fine jewelry</p>
          </div>
          {getTotalItems() > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-all shadow-lg shadow-purple-200"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>{getTotalItems()} items - {formatPrice(getTotalPrice())}</span>
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-500 font-medium ml-1">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer pr-2"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Gem className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No jewelry items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Gem className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 capitalize">{item.category}</p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-600">{formatPrice(item.price)}</span>
                      <div className="flex items-center gap-2">
                        {cart[item.id] ? (
                          <>
                            <button
                              onClick={() => updateCart(item.id, cart[item.id] - 1)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center">{cart[item.id]}</span>
                            <button
                              onClick={() => updateCart(item.id, cart[item.id] + 1)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            className="bg-white border-2 border-purple-600 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-50 flex items-center text-sm font-semibold transition-colors"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-md shadow-purple-100 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        items={jewelryItems}
        updateCart={updateCart}
        onCheckout={handleCheckoutCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        totalAmount={checkoutTotal}
      />

      <Footer />
      <SeedButton />
    </div>
  );
};

export default Jewelry;
