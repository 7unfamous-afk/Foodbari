import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Clock, 
  Bike, 
  MapPin, 
  ArrowLeft, 
  Plus, 
  Minus,
  ShoppingBag, 
  Utensils, 
  ChevronRight,
  Store,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';
import ItemCustomizationModal from '../../components/user/ItemCustomizationModal';

export default function RestaurantDetail() {
  const { restaurantId } = useParams();
  const { 
    restaurants, 
    favorites, 
    toggleFavorite, 
    cart, 
    addToCart,
    updateCartQuantity,
    cartSubtotal,
    deliveryFeesBreakdown,
    totalDeliveryFees,
    cartTotal,
    minOrderStatuses,
    totalFoodItemsCount
  } = useUserApp();

  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
  const isFav = favorites.includes(restaurant.id);

  const categories = restaurant.menu 
    ? ['All', ...restaurant.menu.map(m => m.category)]
    : ['All'];

  const handleAddItem = (item) => {
    if (item.customizations) {
      setSelectedItem(item);
    } else {
      addToCart(item, restaurant, {}, 1);
    }
  };

  return (
    <UserLayout searchPlaceholder={`Search menu in ${restaurant.name}...`}>
      <div className="space-y-6">
        
        {/* Back Link */}
        <Link 
          to="/restaurants" 
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-[#FF6500] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Restaurants</span>
        </Link>

        {/* Restaurant Header Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img 
              src={restaurant.coverImage || restaurant.image} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(restaurant.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : "text-slate-600"} />
            </button>
          </div>

          {/* Restaurant Details Row */}
          <div className="p-6 sm:p-8 relative">
            
            {/* Logo Badge */}
            <div className="absolute -top-12 left-6 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center overflow-hidden">
              <div className={`w-full h-full rounded-full ${restaurant.logoBg} flex items-center justify-center font-bold text-xs uppercase p-2 text-center`}>
                {restaurant.logoText}
              </div>
            </div>

            <div className="pt-8 sm:pt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {restaurant.name}
                  </h1>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Open Now
                  </span>
                </div>

                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  {restaurant.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                  <div className="flex items-center space-x-1 text-amber-500 font-extrabold">
                    <Star size={14} fill="currentColor" />
                    <span>{restaurant.rating}</span>
                    <span className="text-slate-400 font-normal">({restaurant.reviewCount} reviews)</span>
                  </div>

                  <span className="text-slate-300">•</span>
                  <span>{restaurant.cuisine}</span>

                  <span className="text-slate-300">•</span>
                  <div className="flex items-center space-x-1 text-slate-500">
                    <MapPin size={14} />
                    <span>{restaurant.location}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Meta Box */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                <div className="text-center px-3 border-r border-slate-200">
                  <div className="flex items-center justify-center text-slate-400 mb-0.5">
                    <Clock size={16} />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 block">{restaurant.deliveryTime}</span>
                  <span className="text-[10px] text-slate-400">Delivery Time</span>
                </div>

                <div className="text-center px-3 border-r border-slate-200">
                  <div className="flex items-center justify-center text-emerald-600 mb-0.5">
                    <Bike size={16} />
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 block">
                    {restaurant.deliveryFee === 0 ? 'Free' : `Rs. ${restaurant.deliveryFee}`}
                  </span>
                  <span className="text-[10px] text-slate-400">Delivery Fee</span>
                </div>

                <div className="text-center px-3">
                  <span className="text-xs font-extrabold text-slate-900 block mt-4">Rs. {restaurant.minOrder}</span>
                  <span className="text-[10px] text-slate-400">Min Order</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Menu Navigation Tabs & Menu List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Menu List (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-2.5 text-xs font-bold transition-all shrink-0 cursor-pointer border-b-2 -mb-px
                    ${activeCategory === cat 
                      ? 'border-[#FF6500] text-[#FF6500]' 
                      : 'border-transparent text-slate-500 hover:text-slate-900'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            {restaurant.menu ? (
              restaurant.menu
                .filter(m => activeCategory === 'All' || m.category === activeCategory)
                .map((group) => (
                  <div key={group.category} className="space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                      {group.category}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 group"
                        >
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-[#FF6500] transition-colors">
                                {item.name}
                              </h4>
                              {item.isVegetarian ? (
                                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  Veg
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                  Non-Veg
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                              {item.description}
                            </p>

                            <p className="text-sm font-extrabold text-slate-900 pt-1">
                              Rs. {item.price}
                            </p>
                          </div>

                          {/* Image & Add Button */}
                          <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            <button
                              onClick={() => handleAddItem(item)}
                              className="absolute bottom-2 right-2 bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center space-x-1 cursor-pointer"
                            >
                              <Plus size={14} />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
            ) : (
              <div className="bg-white p-8 rounded-3xl border text-center text-slate-400">
                No menu items available.
              </div>
            )}

          </div>

          {/* Right Sidebar: Multi-Restaurant Persistent Cart Panel (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <ShoppingBag size={20} className="text-[#FF6500]" />
                  <h3 className="font-extrabold text-slate-900 text-base">Your Order</h3>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {cart.length} {cart.length === 1 ? 'Restaurant' : 'Restaurants'} • {totalFoodItemsCount} Items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF6500] flex items-center justify-center mx-auto">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Your cart is empty. Add delicious items from the menu!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Displays items from EVERY restaurant in the cart */}
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {cart.map((group) => {
                      const minStatus = minOrderStatuses.find(s => s.restaurantId === group.restaurantId);
                      const isMinMet = minStatus ? minStatus.meetsMinOrder : true;

                      return (
                        <div key={group.restaurantId} className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/70 space-y-2.5">
                          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                            <div className="flex items-center space-x-1.5">
                              <Store size={14} className="text-[#FF6500]" />
                              <h4 className="font-extrabold text-slate-900 text-xs truncate max-w-[170px]">{group.restaurantName}</h4>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">Rs. {group.items.reduce((s, i) => s + i.totalPrice, 0)}</span>
                          </div>

                          {!isMinMet && minStatus && (
                            <div className="flex items-center space-x-1 text-[10px] font-semibold text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                              <AlertCircle size={12} className="shrink-0 text-amber-500" />
                              <span>Add Rs. {minStatus.amountNeeded} more to meet min order.</span>
                            </div>
                          )}

                          <div className="space-y-2">
                            {group.items.map((cartItem, idx) => (
                              <div key={cartItem.id || idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                  <span className="font-bold text-slate-900 shrink-0">{cartItem.quantity}x</span>
                                  <span className="text-slate-700 truncate">{cartItem.name}</span>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    onClick={() => updateCartQuantity(group.restaurantId, idx, -1)}
                                    className="w-5 h-5 rounded-md bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <button
                                    onClick={() => updateCartQuantity(group.restaurantId, idx, 1)}
                                    className="w-5 h-5 rounded-md bg-[#FF6500] text-white flex items-center justify-center"
                                  >
                                    <Plus size={10} />
                                  </button>
                                  <span className="font-extrabold text-slate-900 text-xs min-w-[45px] text-right">Rs. {cartItem.totalPrice}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs font-semibold">
                    <div className="flex justify-between text-slate-600">
                      <span>Food Subtotal</span>
                      <span className="font-bold text-slate-900">Rs. {cartSubtotal}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Total Delivery Fees</span>
                      <span className="font-bold text-emerald-600">
                        {totalDeliveryFees === 0 ? 'FREE' : `Rs. ${totalDeliveryFees}`}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm font-extrabold text-slate-900">
                      <span>Total Amount</span>
                      <span className="text-[#FF6500] text-lg">Rs. {cartTotal}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/cart"
                      className="w-full text-center border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center"
                    >
                      View Cart
                    </Link>

                    <Link
                      to="/checkout"
                      className="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1 text-xs"
                    >
                      <span>Checkout</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Item Customization Modal */}
      {selectedItem && (
        <ItemCustomizationModal
          item={selectedItem}
          restaurant={restaurant}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </UserLayout>
  );
}
