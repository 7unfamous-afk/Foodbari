import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { restaurantsData } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import { Search } from 'lucide-react';

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  const filtered = restaurantsData.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
    r.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-slate-100">
          <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Explore Restaurants</h1>
          <p class="text-slate-500 text-sm">Discover top rated restaurants in Biratnagar and order your favorite meals.</p>
          {query && (
            <div class="mt-4 flex items-center space-x-2 text-sm text-[#FF6500] font-semibold">
              <Search size={16} />
              <span>Showing search results for "{query}"</span>
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div class="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <h3 class="text-xl font-bold text-slate-800 mb-2">No restaurants found</h3>
            <p class="text-slate-500 mb-6">We couldn't find any restaurant matching your search query.</p>
            <Link to="/restaurants" class="bg-[#FF6500] text-white px-6 py-2.5 rounded-full font-semibold text-sm">
              View All Restaurants
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
