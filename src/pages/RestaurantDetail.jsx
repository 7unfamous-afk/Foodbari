import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurantsData } from '../data/restaurants';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = restaurantsData.find(r => r.id === id) || restaurantsData[0];

  return (
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/restaurants" class="inline-flex items-center space-x-2 text-slate-600 hover:text-[#FF6500] font-semibold text-sm mb-6">
          <ArrowLeft size={16} />
          <span>Back to Restaurants</span>
        </Link>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="h-64 sm:h-80 w-full relative">
            <img src={restaurant.coverImage} alt={restaurant.name} class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white">
              <span class="bg-[#FF6500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                {restaurant.cuisine}
              </span>
              <h1 class="text-3xl sm:text-4xl font-extrabold">{restaurant.name}</h1>
              <div class="flex items-center space-x-4 mt-2 text-sm text-slate-200">
                <span class="flex items-center"><MapPin size={16} class="mr-1 text-[#FF6500]" /> {restaurant.location}</span>
                <span class="flex items-center"><Star size={16} class="mr-1 fill-amber-400 text-amber-400" /> {restaurant.rating} Rating</span>
              </div>
            </div>
          </div>

          <div class="p-8">
            <h2 class="text-xl font-bold text-slate-900 mb-4">About {restaurant.name}</h2>
            <p class="text-slate-600 mb-8">{restaurant.description}</p>

            <h2 class="text-xl font-bold text-slate-900 mb-4">Menu Items</h2>
            <div class="bg-slate-50 rounded-2xl p-6 text-center text-slate-500 border border-slate-200">
              <p class="font-medium">Restaurant Menu will be available here soon.</p>
              <p class="text-xs text-slate-400 mt-1">First release preview for FoodBari.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
