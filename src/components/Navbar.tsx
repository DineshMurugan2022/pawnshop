import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gem, Scale, LogOut, User, Settings, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CartDrawer } from './CartDrawer';
import { JewelryItem } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [jewelryItems, setJewelryItems] = useState<JewelryItem[]>([]);

  useEffect(() => {
    // Get initial user state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Basic cart sync (in a real app, use a Context or Redux)
    const storedCart = localStorage.getItem('jewelry-cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const fetchItems = async () => {
      const { data } = await supabase.from('jewelry_items').select('*');
      if (data) setJewelryItems(data);
    };
    fetchItems();
  }, [isCartOpen]); // Refresh when drawer opens

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-purple-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Gem className="h-6 w-6" />
            <span>RCB jewelry's & Pawn shop</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/jewelry" className="hover:text-purple-200 flex items-center">
              <Gem className="h-5 w-5 mr-1" />
              Jewelry
            </Link>
            <Link to="/pawn" className="hover:text-purple-200 flex items-center">
              <Scale className="h-5 w-5 mr-1" />
              Pawn
            </Link>
            {user && user.email === 'admin@example.com' && (
              <Link to="/admin" className="hover:text-purple-200 flex items-center">
                <Settings className="h-5 w-5 mr-1" />
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:bg-purple-700 rounded-lg relative transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
            {Object.keys(cart).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {Object.values(cart).reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>
          {!loading && (
            user ? (
              <div className="flex items-center space-x-4">
                <span className="text-purple-200">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )
          )}
        </div>
      </div>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        items={jewelryItems}
        updateCart={(id, qty) => {
          const newCart = { ...cart };
          if (qty <= 0) delete newCart[id];
          else newCart[id] = qty;
          setCart(newCart);
          localStorage.setItem('jewelry-cart', JSON.stringify(newCart));
        }}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/jewelry'); // Redirect to jewelry page where checkout logic is
        }}
      />
    </nav>
  );
}