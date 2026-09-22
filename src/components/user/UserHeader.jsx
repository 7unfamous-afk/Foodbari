import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsDropdown from './NotificationsDropdown';
import CartDrawer from './CartDrawer';

export default function UserHeader({ onMenuClick, placeholder = "Search for food, restaurants, or cuisines..." }) {
  const { currentUser, logout } = useAuth();
  const { searchQuery, setSearchQuery, unreadNotifCount, totalFoodItemsCount } = useUserApp();
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/restaurants');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      
      {/* Left: Mobile Hamburger & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Open Sidebar"
        >
          <Menu size={20} />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (window.location.pathname !== '/restaurants') {
                navigate('/restaurants');
              }
            }}
            placeholder={placeholder}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </form>
      </div>

      {/* Right Controls: Multi-Restaurant Cart Button, Notification Bell & User Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
        
        {/* Multi-Restaurant Cart Quick Drawer Button */}
        <button
          onClick={() => setShowCartDrawer(true)}
          className="relative p-2.5 rounded-full text-slate-700 hover:bg-orange-50 hover:text-[#FF6500] transition-colors focus:outline-none cursor-pointer"
          aria-label="View Multi-Restaurant Cart"
        >
          <ShoppingBag size={20} />
          {totalFoodItemsCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF6500] text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
              {totalFoodItemsCount}
            </span>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifDropdown && (
            <NotificationsDropdown onClose={() => setShowNotifDropdown(false)} />
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-1 rounded-full hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
            />
            <div className="hidden sm:block text-left">
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </h4>
              <span className="text-xs text-slate-400 font-medium block">
                {currentUser.role || 'User'}
              </span>
            </div>
            <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
          </button>

          {/* User Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#FF6500]"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#FF6500]"
              >
                My Orders
              </Link>
              <Link
                to="/addresses"
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#FF6500]"
              >
                Saved Addresses
              </Link>
              <hr className="my-1 border-slate-100" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </header>
  );
}
