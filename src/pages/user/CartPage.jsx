import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Store,
  Tag,
  AlertCircle
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';

export default function CartPage() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    deliveryFeesBreakdown,
    totalDeliveryFees,
    cartDiscount, 
    cartTotal,
    totalFoodItemsCount,
    minOrderStatuses,
    allMinOrdersMet
  } = useUserApp();

  const navigate = useNavigate();

  return (
    <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Your Food Cart
              </h1>
              <p className="text-slate-500 text-sm mt-0.5 font-medium">
                {cart.length} {cart.length === 1 ? 'Restaurant' : 'Restaurants'} • {totalFoodItemsCount} Items
              </p>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-5 my-8">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-[#FF6500] flex items-center justify-center mx-auto">
              <ShoppingBag size={36} />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Looks like you haven't added any food items yet. Browse your favorite restaurants and add items from multiple restaurants into one cart!
              </p>
            </div>
            <Link
              to="/restaurants"
              className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all"
            >
              <span>Browse Restaurants</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* Cart Items & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cart Items List (8 Columns) — Grouped by Restaurant */}
            <div className="lg:col-span-8 space-y-5">
              
              {cart.map((group) => {
                const minStatus = minOrderStatuses.find(s => s.restaurantId === group.restaurantId);
                const isMinMet = minStatus ? minStatus.meetsMinOrder : true;
                const groupSubtotal = group.items.reduce((s, i) => s + i.totalPrice, 0);

                return (
                  <div key={group.restaurantId} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    
                    {/* Restaurant Group Header */}
                    <div className="p-4 sm:p-5 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF6500] flex items-center justify-center">
                          <Store size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ordering From</span>
                          <h4 className="font-extrabold text-slate-900 text-sm">{group.restaurantName}</h4>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold text-slate-500">Rs. {groupSubtotal}</span>
                        <Link
                          to={`/restaurants/${group.restaurantId}`}
                          className="text-xs font-bold text-[#FF6500] hover:underline"
                        >
                          + Add Items
                        </Link>
                      </div>
                    </div>

                    {/* Minimum Order Warning */}
                    {!isMinMet && minStatus && (
                      <div className="mx-4 sm:mx-5 mt-3 flex items-center space-x-1.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold">
                        <AlertCircle size={14} className="shrink-0 text-amber-500" />
                        <span>Add Rs. {minStatus.amountNeeded} more to meet minimum order (Rs. {group.minOrder}).</span>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="p-4 sm:p-5 space-y-3">
                      {group.items.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-2xl object-cover shrink-0"
                            />
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-slate-900 text-sm">
                                {item.name}
                              </h4>
                              
                              {/* Customization Details */}
                              {item.customization?.size && (
                                <p className="text-[11px] text-slate-500">Size: {item.customization.size.name}</p>
                              )}
                              {item.customization?.spiceLevel && (
                                <p className="text-[11px] text-slate-500">Spice: {item.customization.spiceLevel}</p>
                              )}
                              {item.customization?.extras && item.customization.extras.length > 0 && (
                                <p className="text-[11px] text-slate-500">
                                  Extras: {item.customization.extras.map(e => e.name).join(', ')}
                                </p>
                              )}

                              <span className="text-xs font-bold text-[#FF6500] block">
                                Rs. {item.unitPrice} each
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end space-x-6">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2.5 bg-white p-1.5 rounded-2xl border border-slate-200/80">
                              <button
                                onClick={() => updateCartQuantity(group.restaurantId, idx, -1)}
                                className="w-7 h-7 rounded-xl bg-slate-50 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-extrabold text-xs text-slate-900 w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(group.restaurantId, idx, 1)}
                                className="w-7 h-7 rounded-xl bg-[#FF6500] text-white flex items-center justify-center hover:bg-[#e05800] transition-colors shadow-xs"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Total Item Price & Remove */}
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-slate-900 block">
                                Rs. {item.totalPrice}
                              </span>
                              <button
                                onClick={() => removeFromCart(group.restaurantId, idx)}
                                className="text-[10px] font-bold text-slate-400 hover:text-rose-600 mt-1"
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Order Summary & Checkout (4 Columns) */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 sticky top-24">
                <h3 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs font-semibold">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">Rs. {cartSubtotal}</span>
                  </div>

                  {/* Delivery Fees Breakdown */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delivery Fees</span>
                    {deliveryFeesBreakdown.map((df) => (
                      <div key={df.restaurantId} className="flex justify-between text-slate-500">
                        <span className="truncate max-w-[140px]">{df.restaurantName}</span>
                        <span className="font-bold text-emerald-600">
                          {df.deliveryFee === 0 ? 'FREE' : `Rs. ${df.deliveryFee}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
                    <span>Total Delivery Fees</span>
                    <span className="font-bold text-emerald-600">
                      {totalDeliveryFees === 0 ? 'FREE' : `Rs. ${totalDeliveryFees}`}
                    </span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-Rs. {cartDiscount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm">
                    <span className="font-extrabold text-slate-900">Total Amount</span>
                    <span className="text-lg font-extrabold text-[#FF6500]">Rs. {cartTotal}</span>
                  </div>
                </div>

                {/* Minimum Order Warnings */}
                {!allMinOrdersMet && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-700 font-semibold space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <AlertCircle size={14} className="shrink-0 text-amber-500" />
                      <span className="font-bold">Minimum order not met for:</span>
                    </div>
                    {minOrderStatuses.filter(s => !s.meetsMinOrder).map(s => (
                      <p key={s.restaurantId} className="pl-5 text-[11px]">
                        {s.restaurantName}: add Rs. {s.amountNeeded} more
                      </p>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => navigate('/checkout')}
                  disabled={!allMinOrdersMet}
                  className="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </UserLayout>
  );
}
