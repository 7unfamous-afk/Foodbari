import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Clock, 
  Bike, 
  SlidersHorizontal, 
  MapPin, 
  Navigation,
  ArrowRight,
  Grid,
  Utensils,
  Pizza,
  Flame,
  Coffee,
  CupSoda,
  Cake,
  Soup,
  Beef,
  X,
  RotateCcw
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';
import { cuisineCategories } from '../../data/userMockData';
import { calculateDistance } from '../../utils/locationUtils';
import RestaurantMap from '../../components/user/RestaurantMap';

export default function BrowseRestaurants() {
  const { 
    restaurants, 
    favorites, 
    toggleFavorite, 
    searchQuery, 
    setSearchQuery,
    userLocation 
  } = useUserApp();

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [selectedMapRestaurantId, setSelectedMapRestaurantId] = useState(null);

  // Advanced Filter Modal State
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [minRatingFilter, setMinRatingFilter] = useState(0);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'grid': return <Grid size={16} />;
      case 'utensils': return <Utensils size={16} />;
      case 'pizza': return <Pizza size={16} />;
      case 'bowl': return <Soup size={16} />;
      case 'flame': return <Flame size={16} />;
      case 'burger': return <Beef size={16} />;
      case 'coffee': return <Coffee size={16} />;
      case 'cake': return <Cake size={16} />;
      case 'cup': return <CupSoda size={16} />;
      default: return <Utensils size={16} />;
    }
  };

  // Filter & Search Logic
  let filtered = restaurants.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = r.name.toLowerCase().includes(q);
      const cuisineMatch = r.cuisine.toLowerCase().includes(q);
      const menuMatch = r.menu ? r.menu.some(m => m.items.some(i => i.name.toLowerCase().includes(q))) : false;
      if (!nameMatch && !cuisineMatch && !menuMatch) return false;
    }

    if (selectedCategory !== 'all') {
      const catName = cuisineCategories.find(c => c.id === selectedCategory)?.name.toLowerCase();
      if (catName && !r.cuisine.toLowerCase().includes(catName) && !r.cuisines?.some(c => c.toLowerCase().includes(catName))) {
        return false;
      }
    }

    if (freeDeliveryOnly && !r.freeDelivery && r.deliveryFee > 0) return false;
    if (minRatingFilter > 0 && r.rating < minRatingFilter) return false;

    return true;
  });

  // Sorting Logic
  if (selectedSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === 'price-low') {
    filtered.sort((a, b) => a.minOrder - b.minOrder);
  } else if (selectedSort === 'price-high') {
    filtered.sort((a, b) => b.minOrder - a.minOrder);
  } else if (selectedSort === 'distance') {
    filtered.sort((a, b) => {
      const distA = parseFloat(calculateDistance(userLocation.lat, userLocation.lng, a.coordinates?.lat, a.coordinates?.lng) || 99);
      const distB = parseFloat(calculateDistance(userLocation.lat, userLocation.lng, b.coordinates?.lat, b.coordinates?.lng) || 99);
      return distA - distB;
    });
  }

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSort('popularity');
    setFreeDeliveryOnly(false);
    setMinRatingFilter(0);
  };

  return (
    <UserLayout searchPlaceholder="Search for restaurants, cuisines, or dishes...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Browse Restaurants
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Discover the best restaurants near you and get your favorite food delivered.
              </p>
            </div>

            {searchQuery && (
              <div className="flex items-center space-x-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full text-xs text-[#FF6500] font-bold">
                <span>Searching: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-slate-900">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Cuisine Category Buttons */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {cuisineCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer
                    ${isActive 
                      ? 'bg-[#FF6500] text-white shadow-md shadow-orange-500/20' 
                      : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Filters & Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-100">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              
              {/* Filter Button */}
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
                {(freeDeliveryOnly || minRatingFilter > 0) && (
                  <span className="w-2 h-2 rounded-full bg-[#FF6500]" />
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#FF6500] cursor-pointer"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="distance">Sort by: Nearest First</option>
                  <option value="rating">Sort by: Rating</option>
                  <option value="price-low">Sort by: Lowest Price</option>
                  <option value="price-high">Sort by: Highest Price</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▾
                </div>
              </div>

            </div>

            <div className="text-xs font-semibold text-slate-400">
              {filtered.length} Restaurants found
            </div>
          </div>

          {/* Empty State if No Match */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Utensils size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">No restaurants found</h3>
              <p className="text-xs text-slate-500 font-medium">Try changing your search terms or filters.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center space-x-2 bg-[#FF6500] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            /* Restaurant Cards Grid (3 Columns) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filtered.map((restaurant) => {
                const isFav = favorites.includes(restaurant.id);
                const isSelectedOnMap = selectedMapRestaurantId === restaurant.id;
                const dist = calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  restaurant.coordinates?.lat,
                  restaurant.coordinates?.lng
                );

                return (
                  <div 
                    key={restaurant.id}
                    onClick={() => {
                      setSelectedMapRestaurantId(restaurant.id);
                      navigate(`/restaurants/${restaurant.id}`);
                    }}
                    onMouseEnter={() => setSelectedMapRestaurantId(restaurant.id)}
                    className={`
                      bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col group cursor-pointer
                      ${isSelectedOnMap ? 'border-[#FF6500] ring-2 ring-orange-100 shadow-md' : 'border-slate-100 shadow-sm hover:shadow-md'}
                    `}
                  >
                    {/* Banner Image & Badges */}
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

                      {/* Heart Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(restaurant.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 flex items-center justify-center transition-colors shadow-sm"
                        aria-label="Save to favorites"
                      >
                        <Heart 
                          size={16} 
                          className={isFav ? "text-red-500 fill-red-500" : "text-slate-600"} 
                        />
                      </button>

                      {/* Circular Logo Badge */}
                      <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-full border-2 border-white bg-white shadow-md flex items-center justify-center text-center p-1 overflow-hidden z-10">
                        <div className={`w-full h-full rounded-full ${restaurant.logoBg} flex items-center justify-center font-bold text-[9px] uppercase leading-none p-1 text-center`}>
                          {restaurant.logoText.slice(0, 10)}
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 pt-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#FF6500] transition-colors line-clamp-1">
                            {restaurant.name}
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Open
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium">
                          {restaurant.cuisine}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" />
                          <span>{dist ? `${dist} km • ` : ''}{restaurant.deliveryTime}</span>
                        </div>

                        <div className="flex items-center gap-1 text-emerald-600">
                          <Bike size={13} />
                          <span>{restaurant.freeDelivery ? 'Free' : `Rs. ${restaurant.deliveryFee}`}</span>
                        </div>

                        <span className="text-slate-400 font-semibold">Rs. {restaurant.minOrder} min</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Sidebar: Interactive Map Widget (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Interactive Map Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">Your Location Map</h3>
                  <p className="text-xs text-slate-500 font-medium truncate max-w-[180px]">
                    {userLocation?.address || 'Kathmandu, Nepal'}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Live GPS
              </span>
            </div>

            {/* Interactive Leaflet Map Component */}
            <div className="h-64 rounded-2xl overflow-hidden border border-slate-200/80">
              <RestaurantMap
                userLocation={userLocation}
                restaurants={filtered}
                selectedRestaurantId={selectedMapRestaurantId}
                onRestaurantSelect={(id) => setSelectedMapRestaurantId(id)}
              />
            </div>
          </div>

          {/* Sort By Radio Panel */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#FF6500]" />
              <span>Sort By</span>
            </h3>

            <div className="space-y-2 pt-1 text-xs font-semibold">
              {[
                { id: 'popularity', label: 'Popularity' },
                { id: 'distance', label: 'Nearest First' },
                { id: 'rating', label: 'Rating' },
                { id: 'price-low', label: 'Lowest Price' },
                { id: 'price-high', label: 'Highest Price' },
              ].map((option) => (
                <label 
                  key={option.id}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="sidebar-sort"
                    checked={selectedSort === option.id}
                    onChange={() => setSelectedSort(option.id)}
                    className="w-4 h-4 text-[#FF6500] border-gray-300 focus:ring-[#FF6500] accent-[#FF6500]"
                  />
                  <span className={selectedSort === option.id ? "text-slate-900 font-bold" : "text-slate-600"}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-br from-[#0D382C] to-[#154E3E] p-6 rounded-3xl text-white relative overflow-hidden shadow-lg border border-emerald-900">
            <div className="relative z-10 space-y-3 max-w-[210px]">
              <h3 className="text-xl font-extrabold tracking-tight leading-tight">
                Craving <br />
                Something Special?
              </h3>
              <p className="text-xs text-emerald-100/80 font-medium leading-relaxed">
                Check out our top-rated restaurants and exclusive deals!
              </p>
              <button 
                onClick={() => setSelectedSort('rating')}
                className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>View Top Rated</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="absolute -right-6 -bottom-6 w-36 h-36">
              <img
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80"
                alt="Special Dish"
                className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-xl"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Filter Restaurants</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeDeliveryOnly}
                  onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                  className="w-4 h-4 text-[#FF6500] rounded accent-[#FF6500]"
                />
                <span className="text-xs font-bold text-slate-800">Free Delivery Only</span>
              </label>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800">Minimum Rating</label>
                <div className="flex gap-2">
                  {[0, 4.0, 4.5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setMinRatingFilter(rate)}
                      className={`
                        px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer
                        ${minRatingFilter === rate
                          ? 'bg-[#FF6500] text-white border-[#FF6500]'
                          : 'bg-white text-slate-700 border-slate-200'}
                      `}
                    >
                      {rate === 0 ? 'Any' : `${rate}+ Stars`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="bg-[#FF6500] hover:bg-[#e05800] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
