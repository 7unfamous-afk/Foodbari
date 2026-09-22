import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Heart, 
  MapPin, 
  User,
  X
} from 'lucide-react';

export default function UserSidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Restaurants', path: '/restaurants', icon: UtensilsCrossed },
    { name: 'My Orders', path: '/orders', icon: ClipboardList },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Addresses', path: '/addresses', icon: MapPin },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 w-[260px] bg-white border-r border-slate-100 z-50 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Header & Logo */}
          <div className="flex items-center justify-between mb-8 pl-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="Foodbari Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button 
              onClick={onClose} 
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) => `
                    flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-[#FFF4ED] text-[#FF6500]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={20} className={isActive ? 'text-[#FF6500]' : 'text-slate-400'} />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Decorative Bottom Illustration */}
        <div className="pt-6 border-t border-slate-100/60 text-center flex flex-col items-center">
          <div className="relative mb-2">
            {/* Cloche graphic with food sparkle */}
            <div className="w-16 h-12 relative flex items-center justify-center">
              <svg className="w-14 h-14 text-slate-800" viewBox="0 0 64 64" fill="none">
                {/* Cloche plate base */}
                <path d="M12 44H52" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                {/* Cloche dome */}
                <path d="M16 44C16 28 22 22 32 22C42 22 48 28 48 44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                {/* Knob */}
                <circle cx="32" cy="19" r="3" fill="#FF6500" stroke="#1e293b" strokeWidth="2" />
                {/* Steam/Sparkles */}
                <path d="M25 13C25 11 27 10 27 8" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                <path d="M39 13C39 11 37 10 37 8" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p className="text-xl font-bold font-serif italic text-slate-900 leading-tight">
            Good Food <br />
            <span className="text-[#FF6500] not-italic font-sans">Good Mood</span>
            <span className="inline-block ml-1 text-amber-500">😊</span>
          </p>
        </div>
      </aside>
    </>
  );
}
