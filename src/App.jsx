import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import CartConflictModal from './components/user/CartConflictModal';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Register from './pages/Register';

// User Application Pages
import UserDashboard from './pages/user/UserDashboard';
import BrowseRestaurants from './pages/user/BrowseRestaurants';
import RestaurantDetail from './pages/user/RestaurantDetail';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import MyOrders from './pages/user/MyOrders';
import OrderTracking from './pages/user/OrderTracking';
import FavoritesPage from './pages/user/FavoritesPage';
import AddressesPage from './pages/user/AddressesPage';
import ProfilePage from './pages/user/ProfilePage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Redirect logged-in users visiting /login or /register
function AuthPageGuard({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function MainAppContent() {
  const location = useLocation();

  const isUserRoute = [
    '/dashboard',
    '/restaurants',
    '/cart',
    '/checkout',
    '/orders',
    '/favorites',
    '/addresses',
    '/profile'
  ].some(path => location.pathname.startsWith(path));

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isPublicPage = !isUserRoute && !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-800">
      {isPublicPage && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/* Public Landing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<AuthPageGuard><Login /></AuthPageGuard>} />
          <Route path="/register" element={<AuthPageGuard><Register /></AuthPageGuard>} />

          {/* User Application Routes (Protected) */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/restaurants" element={<ProtectedRoute><BrowseRestaurants /></ProtectedRoute>} />
          <Route path="/restaurants/:restaurantId" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/orders/:orderId" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/addresses" element={<ProtectedRoute><AddressesPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </div>

      <CartConflictModal />
      {isPublicPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppProvider>
          <MainAppContent />
        </AppProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
