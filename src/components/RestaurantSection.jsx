import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { restaurantsData } from '../data/restaurants';
import RestaurantCard from './RestaurantCard';

export default function RestaurantSection() {
  return (
    <section class="bg-slate-50/70 py-16 sm:py-20 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-[#FF6500] mb-1 block">
              FEATURED RESTAURANTS
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Restaurants
            </h2>
          </div>

          <Link
            to="/restaurants"
            class="mt-4 sm:mt-0 text-sm font-semibold text-[#FF6500] hover:text-[#e05800] flex items-center space-x-1 transition-colors group self-start sm:self-auto"
          >
            <span>View All Restaurants</span>
            <ArrowRight size={16} class="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Restaurant Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurantsData.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

      </div>
    </section>
  );
}
