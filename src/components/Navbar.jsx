import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'About', path: '/about' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <header class="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          {/* Left: FoodBari Logo */}
          <div class="flex-shrink-0 flex items-center">
            <Link to="/" class="flex items-center">
              <img 
                src="/logo.png" 
                alt="FoodBari Logo" 
                class="h-12 md:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav class="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  class={`relative py-2 text-base font-semibold transition-colors duration-200 ${
                    active ? 'text-slate-900' : 'text-slate-600 hover:text-[#FF6500]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span class="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF6500] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div class="hidden md:flex items-center space-x-6">
            <Link
              to="/login"
              class="text-base font-semibold text-slate-700 hover:text-[#FF6500] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              class="bg-[#FF6500] hover:bg-[#e05800] text-white px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95"
            >
              Register
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div class="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class="p-2 rounded-md text-slate-700 hover:text-[#FF6500] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div class="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              class={`block py-2 text-base font-semibold ${
                isActive(link.path)
                  ? 'text-[#FF6500] font-bold border-l-4 border-[#FF6500] pl-2'
                  : 'text-slate-700 hover:text-[#FF6500] pl-2'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div class="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              class="text-center py-2 font-semibold text-slate-700 border border-gray-300 rounded-full hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              class="text-center py-2.5 font-semibold text-white bg-[#FF6500] rounded-full shadow hover:bg-[#e05800]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
