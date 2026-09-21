import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Mountain, Coffee, Flame, Utensils } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  // Render corresponding logo badge based on iconType
  const renderLogoBadge = () => {
    switch (restaurant.iconType) {
      case 'mountain':
        return (
          <div class="w-16 h-16 rounded-full bg-slate-900 border-2 border-white flex flex-col items-center justify-center text-white text-center p-1 shadow-md">
            <Mountain size={18} class="text-amber-400" />
            <span class="text-[8px] font-extrabold uppercase tracking-tighter leading-tight mt-0.5">
              HIMALAYAN KITCHEN
            </span>
          </div>
        );
      case 'coffee':
        return (
          <div class="w-16 h-16 rounded-full bg-black border-2 border-white flex flex-col items-center justify-center text-white text-center p-1 shadow-md">
            <Coffee size={20} class="text-white" />
            <span class="text-[9px] font-bold mt-0.5">The Cafe</span>
          </div>
        );
      case 'flame':
        return (
          <div class="w-16 h-16 rounded-full bg-white border-2 border-[#FF6500] flex flex-col items-center justify-center text-[#FF6500] text-center p-1 shadow-md">
            <Flame size={20} class="text-[#FF6500]" />
            <span class="text-[8px] font-extrabold text-slate-800 uppercase tracking-tighter mt-0.5">
              Spice House
            </span>
          </div>
        );
      case 'burger':
        return (
          <div class="w-16 h-16 rounded-full bg-white border-2 border-slate-800 flex flex-col items-center justify-center text-slate-800 text-center p-1 shadow-md">
            <Utensils size={20} class="text-[#FF6500]" />
            <span class="text-[9px] font-extrabold uppercase tracking-tighter mt-0.5">
              Burger Hub
            </span>
          </div>
        );
      default:
        return (
          <div class="w-16 h-16 rounded-full bg-white border-2 border-[#FF6500] flex items-center justify-center shadow-md">
            <Utensils size={22} class="text-[#FF6500]" />
          </div>
        );
    }
  };

  return (
    <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col h-full overflow-hidden">
      {/* Cover Image Container */}
      <div class="relative h-44 w-full bg-slate-200 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlapping Logo Badge */}
        <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 z-10">
          {renderLogoBadge()}
        </div>
      </div>

      {/* Card Content */}
      <div class="pt-9 pb-6 px-5 flex flex-col flex-grow text-center">
        <h3 class="text-xl font-bold text-slate-900 mb-1">
          {restaurant.name}
        </h3>

        <div class="flex items-center justify-center text-xs text-slate-400 font-medium mb-3 space-x-1">
          <MapPin size={14} class="text-[#FF6500]" />
          <span>{restaurant.location}</span>
        </div>

        <p class="text-xs sm:text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
          {restaurant.description}
        </p>

        <Link
          to={`/restaurants/${restaurant.id}`}
          class="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-semibold py-2.5 rounded-full flex items-center justify-center space-x-2 text-sm transition-all duration-200 shadow hover:shadow-md active:scale-95"
        >
          <span>View Menu</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
