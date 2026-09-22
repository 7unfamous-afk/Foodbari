import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Utensils, 
  Heart, 
  MapPin, 
  Star, 
  ArrowRight, 
  Clock, 
  Bike, 
  ChevronRight,
  Sparkles,
  ShoppingBag,
  User as UserIcon,
  Tag
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useAuth } from '../../context/AuthContext';
import { useUserApp } from '../../context/AppContext';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const { restaurants, favorites, toggleFavorite, orders, addresses } = useUserApp();
  const navigate = useNavigate();

  const recommended = restaurants.slice(0, 4);
  const recentOrder = orders[0];

  return (
    <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Center Content (8 Columns on desktop) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Dynamic Greeting Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Good Afternoon, {currentUser.name}! <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-1 font-medium">
              Craving something delicious? Let's find your next favorite meal.
            </p>
          </div>

          {/* Hero Promotional Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0D382C] via-[#154E3E] to-[#0A2E23] text-white p-6 sm:p-10 shadow-xl border border-emerald-900/30">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-md space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles size={14} />
                  <span>Fresh • Hot • Delicious</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Good Food <br />
                  Brings People <span className="text-[#FF6500] italic font-serif">Together</span>
                </h2>

                <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
                  Explore the best restaurants and get your favorite food delivered right to your door.
                </p>

                <div className="pt-2">
                  <Link
                    to="/restaurants"
                    className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-200 transform active:scale-95"
                  >
                    <span>Browse Restaurants</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Right Dish Image */}
              <div className="relative shrink-0 w-64 h-64 sm:w-72 sm:h-72">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                  alt="Delicious Healthy Food Bowl"
                  className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
                />
                
                <div className="absolute -bottom-2 -left-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-center">
                  <p className="text-amber-300 text-xs font-serif italic">Better Food</p>
                  <p className="text-white text-xs font-bold">Better Days ✨</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Statistics Cards (4 Columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Total Orders */}
            <Link 
              to="/orders"
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6500] flex items-center justify-center mb-3">
                <Utensils size={20} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{orders.length}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Total Orders</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-[#FF6500] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Favorite Restaurants */}
            <Link 
              to="/favorites"
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center mb-3">
                <Heart size={20} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{favorites.length}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Favorite Restaurants</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Saved Addresses */}
            <Link 
              to="/addresses"
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <MapPin size={20} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{addresses.length}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Saved Addresses</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Average Rating */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center mb-3">
                <Star size={20} fill="currentColor" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{currentUser.stats?.avgRating || 4.5}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Avg. Rating</p>
                </div>
                <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">★ Top</span>
              </div>
            </div>

          </div>

          {/* Recommended for You Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Recommended for You
              </h3>
              <Link 
                to="/restaurants" 
                className="text-xs font-bold text-[#FF6500] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {recommended.map((restaurant) => {
                const isFav = favorites.includes(restaurant.id);
                return (
                  <div 
                    key={restaurant.id}
                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} fill="#F59E0B" className="text-amber-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(restaurant.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 flex items-center justify-center transition-colors shadow-sm"
                        aria-label="Save to favorites"
                      >
                        <Heart size={16} className={isFav ? "text-red-500 fill-red-500" : "text-slate-600"} />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base group-hover:text-[#FF6500] transition-colors">
                          {restaurant.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium">
                          {restaurant.cuisine}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-slate-400" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>

                        <div className="flex items-center gap-1 text-emerald-600">
                          <Bike size={14} />
                          <span>Free delivery</span>
                        </div>

                        <span className="text-slate-400">{restaurant.minOrderText || `Rs. ${restaurant.minOrder} min`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Sidebar (4 Columns on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Dynamic Recent Order Card or Empty State */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Your Recent Order</h3>
              {orders.length > 0 && (
                <Link to="/orders" className="text-xs font-bold text-[#FF6500] hover:underline">
                  View All
                </Link>
              )}
            </div>

            {recentOrder ? (
              <div 
                onClick={() => navigate(`/orders/${recentOrder.id}`)}
                className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100/80 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={recentOrder.restaurantImage} 
                    alt={recentOrder.restaurantName}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{recentOrder.itemsSummary.split(',')[0]}</h4>
                    <p className="text-xs text-slate-500">{recentOrder.restaurantName}</p>
                    <p className="text-xs font-bold text-slate-900 mt-1">Rs. {recentOrder.totalAmount}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 shrink-0">
                  <span className={`
                    text-[10px] font-bold px-2 py-0.5 rounded-full
                    ${recentOrder.status === 'Preparing' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}
                  `}>
                    {recentOrder.status}
                  </span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>
            ) : (
              /* Empty Recent Order State */
              <div className="p-4 text-center space-y-3 bg-slate-50 rounded-2xl">
                <p className="text-xs font-bold text-slate-800">No orders yet</p>
                <p className="text-[11px] text-slate-400">Explore restaurants and place your first order.</p>
                <Link
                  to="/restaurants"
                  className="inline-block bg-[#FF6500] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  Browse Restaurants
                </Link>
              </div>
            )}
          </div>

          {/* Promotional Card: 10% OFF */}
          <div className="bg-[#FFF3EC] p-6 rounded-3xl border border-orange-100/80 relative overflow-hidden">
            <div className="relative z-10 space-y-3 max-w-[200px]">
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#FF6500] text-white">
                <Tag size={16} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                Get 10% OFF
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                on your next order!
              </p>
              <Link
                to="/restaurants"
                className="inline-block bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                Explore Offers
              </Link>
            </div>
            
            <div className="absolute -right-4 -bottom-4 w-32 h-32">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80" 
                alt="Promo Food"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Quick Actions</h3>

            <Link
              to="/restaurants"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Utensils size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                    Browse Restaurants
                  </h4>
                  <p className="text-[11px] text-slate-400">Find your favorite food</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/orders"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                    View Orders
                  </h4>
                  <p className="text-[11px] text-slate-400">Track your current & past orders</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/addresses"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                    Manage Addresses
                  </h4>
                  <p className="text-[11px] text-slate-400">Delivery locations</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/profile"
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <UserIcon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                    Profile Settings
                  </h4>
                  <p className="text-[11px] text-slate-400">View and edit profile</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Bottom Dark Banner Card */}
          <div className="bg-[#0B392B] p-5 rounded-3xl text-white flex items-center justify-between relative overflow-hidden shadow-md">
            <div>
              <h4 className="font-serif italic text-xl font-bold text-emerald-200">Hungry?</h4>
              <p className="font-sans text-sm font-extrabold text-white">We're here!</p>
            </div>
            
            <div className="w-12 h-10 relative text-amber-400 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-300" viewBox="0 0 64 64" fill="none">
                <path d="M12 44H52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M16 44C16 28 22 22 32 22C42 22 48 28 48 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="32" cy="18" r="3" fill="#FF6500" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </UserLayout>
  );
}
