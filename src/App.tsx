import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Jewelry from './pages/Jewelry';
import Pawn from './pages/Pawn';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { WhatsAppButton } from './components/WhatsAppButton';

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/login', '/auth/callback', '/admin/login'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/pawn" element={<Pawn />} />
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <WhatsAppButton />
    </div>
  );
}

import { CartProvider } from './context/CartContext';
import { RateProvider } from './context/RateContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RateProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <AppContent />
            </Router>
          </CartProvider>
        </WishlistProvider>
      </RateProvider>
    </AuthProvider>
  );
}

export default App;
