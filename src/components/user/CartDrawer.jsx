import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Store, 
  AlertCircle, 
  CheckCircle2,
  X
} from 'lucide-react';
import { useUserApp } from '../../context/AppContext';

export default function CartDrawer({ isOpen, onClose }) {
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
    minOrderStatuses,
    allMinOrdersMet,
    totalFoodItemsCount
  } = useUserApp();

  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile / Screen Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
      />

      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-slate-100 z-50 flex flex-col justify-between p-6 shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6500] flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Your Cart</h3>
              <p className="text-xs text-slate-400 font-medium">
                {cart.length} {cart.length === 1 ? 'Restaurant' : 'Restaurants'} • {totalFoodItemsCount} Items
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-slate-400 hover:text-rose-600 px-2 py-1"
              >
                Clear
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6500] flex items-center justify-center mx-auto">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg">Your cart is empty</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Add items from multiple restaurants into the same cart!
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate('/restaurants');
                }}
                className="inline-block bg-[#FF6500] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <>
              {/* Grouped by Restaurant */}
              {cart.map((group) => {
                const minStatus = minOrderStatuses.find(s => s.restaurantId === group.restaurantId);
                const isMinMet = minStatus ? minStatus.meetsMinOrder : true;

                return (
                  <div key={group.restaurantId} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                    
                    {/* Restaurant Group Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <Store size={16} className="text-[#FF6500]" />
                        <h4 className="font-extrabold text-slate-900 text-xs">
                          {group.restaurantName}
                        </h4>
                      </div>

                      <Link
                        to={`/restaurants/${group.restaurantId}`}
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#FF6500] hover:underline"
                      >
                        + Add Items
                      </Link>
                    </div>

                    {/* Minimum Order Warning */}
                    {!isMinMet && minStatus && (
                      <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold">
                        <AlertCircle size={14} className="shrink-0 text-amber-500" />
                        <span>Add Rs. {minStatus.amountNeeded} more to meet min order (Rs. {group.minOrder}).</span>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="space-y-3">
                      {group.items.map((item, idx) => (
                        <div key={item.id || idx} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-10 h-10 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="font-bold text-slate-900 text-xs truncate">{item.name}</h5>
                              <span className="text-[10px] text-slate-500">Rs. {item.unitPrice}</span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
                            <button
                              onClick={() => updateCartQuantity(group.restaurantId, idx, -1)}
                              className="w-5 h-5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-bold text-slate-900 text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(group.restaurantId, idx, 1)}
                              className="w-5 h-5 rounded-lg bg-[#FF6500] text-white flex items-center justify-center"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="text-right shrink-0 min-w-[50px]">
                            <span className="font-extrabold text-slate-900 text-xs block">Rs. {item.totalPrice}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}

              {/* Delivery Fee Breakdown */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block pb-1 border-b border-slate-100">
                  Delivery Fees Breakdown
                </span>
                {deliveryFeesBreakdown.map((df) => (
                  <div key={df.restaurantId} className="flex justify-between text-slate-600">
                    <span>{df.restaurantName}</span>
                    <span className="font-bold text-emerald-600">
                      {df.deliveryFee === 0 ? 'FREE' : `Rs. ${df.deliveryFee}`}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs font-semibold">
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
              <div className="flex justify-between items-center text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Grand Total</span>
                <span className="text-[#FF6500] text-lg">Rs. {cartTotal}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="py-3 px-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                View Cart
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="py-3 px-4 rounded-2xl bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </aside>
    </>
  );
}
