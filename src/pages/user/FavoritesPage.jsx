import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  Clock, 
  Bike, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Utensils 
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';
import { recentlyFavorited } from '../../data/userMockData';

export default function FavoritesPage() {
  const { restaurants, favorites, toggleFavorite } = useUserApp();
  const [activeTab, setActiveTab] = useState('restaurants');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <UserLayout searchPlaceholder="Search for restaurants, cuisines, or dishes...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0">
              <Heart size={22} className="fill-[#FF6500]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Your Favorites
              </h1>
              <p className="text-slate-500 text-sm mt-0.5 font-medium">
                All the restaurants and dishes you've saved for later.
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'restaurants', label: `Restaurants (${favoriteRestaurants.length})` },
              { id: 'dishes', label: 'Dishes (0)' },
              { id: 'collections', label: 'Collections (0)' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer
                    ${isActive 
                      ? 'bg-[#FF6500] text-white shadow-md shadow-orange-500/20' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'}
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Favorites Restaurants Grid or Empty State */}
          {favoriteRestaurants.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4 my-4">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6500] flex items-center justify-center mx-auto">
                <Heart size={28} className="fill-[#FF6500]" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">
                  No favorite restaurants yet.
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Save restaurants you love and find them here later.
                </p>
              </div>
              <Link
                to="/restaurants"
                className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all"
              >
                <span>Browse Restaurants</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {favoriteRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Image Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Rating Pill */}
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} fill="#F59E0B" className="text-amber-400" />
                      <span>{restaurant.rating}</span>
                    </div>

                    {/* Filled Heart Icon - Unfavorite */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(restaurant.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                      aria-label="Remove favorite"
                    >
                      <Heart size={16} className="fill-red-500 text-red-500" />
                    </button>

                    {/* Logo Circle */}
                    <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-full border-2 border-white bg-white shadow-md flex items-center justify-center text-center p-1 overflow-hidden z-10">
                      <div className={`w-full h-full rounded-full ${restaurant.logoBg} flex items-center justify-center font-bold text-[9px] uppercase leading-none p-1 text-center`}>
                        {restaurant.logoText.slice(0, 10)}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 pt-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#FF6500] transition-colors truncate">
                        {restaurant.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        {restaurant.cuisine}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>

                      <div className="flex items-center gap-1 text-emerald-600">
                        <Bike size={13} />
                        <span>Free delivery</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-400">
                      Rs. {restaurant.minOrder} min
                    </div>

                    <Link
                      to={`/restaurants/${restaurant.id}`}
                      className="w-full text-center bg-[#FFF4ED] hover:bg-[#FFE8DA] text-[#FF6500] text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <span>View Restaurant</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Bar */}
          {favoriteRestaurants.length > 0 && (
            <div className="flex items-center justify-center space-x-2 pt-4">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              <button className="w-9 h-9 rounded-xl font-bold text-xs bg-[#FF6500] text-white shadow-sm">
                1
              </button>

              <button 
                disabled
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

        </div>

        {/* Right Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recently Favorited List */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <Heart size={18} className="text-[#FF6500] fill-[#FF6500]" />
              <h3 className="font-bold text-slate-900 text-sm">Recently Favorited</h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              These are the latest restaurants you added to your favorites.
            </p>

            <div className="space-y-3 pt-1">
              {recentlyFavorited.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/restaurants/${item.id}`)}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{item.cuisine}</p>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{item.date}</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Heart size={16} className="fill-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Promotional Banner Card */}
          <div className="bg-gradient-to-br from-[#0D382C] to-[#154E3E] p-6 rounded-3xl text-white relative overflow-hidden shadow-lg border border-emerald-900">
            <div className="relative z-10 space-y-3 max-w-[210px]">
              <h3 className="text-xl font-extrabold tracking-tight leading-tight">
                More Good Food <br />
                Ahead!
              </h3>
              <p className="text-xs text-emerald-100/80 font-medium leading-relaxed">
                Keep exploring and save more favorites.
              </p>
              <Link
                to="/restaurants"
                className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <span>Browse Restaurants</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="absolute -right-6 -bottom-6 w-36 h-36">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                alt="Promo Dish"
                className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </UserLayout>
  );
}
