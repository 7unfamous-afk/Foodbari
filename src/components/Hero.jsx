import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/restaurants');
    }
  };

  return (
    <section class="relative w-full min-h-[480px] lg:min-h-[520px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Appetizing Food Background Image with Overlay */}
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        {/* Dark / Black Transparent Overlay for readability */}
        <div class="absolute inset-0 bg-black/60 md:bg-black/50 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div class="max-w-2xl">
          {/* Main Heading */}
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Order Food From Your{' '}
            <span class="text-[#FF6500] block sm:inline mt-1 sm:mt-0">
              Favorite Restaurants
            </span>
          </h1>

          {/* Subheading */}
          <p class="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl font-normal">
            Find the best restaurants, choose your favorite food and order with ease. Delicious food is just a click away!
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} class="mt-8">
            <div class="flex items-center bg-white rounded-full p-1.5 shadow-2xl max-w-xl w-full border border-white/20">
              <div class="pl-4 pr-2 text-slate-400 flex items-center">
                <MapPin size={22} class="text-[#FF6500]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants or food..."
                class="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base px-2 focus:outline-none"
              />
              <button
                type="submit"
                class="bg-[#FF6500] hover:bg-[#e05800] text-white font-semibold px-6 sm:px-8 py-3 rounded-full flex items-center space-x-2 transition-all duration-200 shrink-0 shadow-md hover:shadow-lg"
              >
                <Search size={18} />
                <span class="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
