import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Jewelry from './pages/Jewelry';
import Pawn from './pages/Pawn';
import Admin from './pages/Admin';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';

import { WhatsAppButton } from './components/WhatsAppButton';

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/login', '/auth/callback'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/pawn" element={<Pawn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <WhatsAppButton />
    </div>
  );
}

import { CartProvider } from './context/CartContext';
import { RateProvider } from './context/RateContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <RateProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </RateProvider>
  );
}

export default App;
