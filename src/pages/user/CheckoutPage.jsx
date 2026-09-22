import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  Store,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';

export default function CheckoutPage() {
  const { 
    cart, 
    cartSubtotal, 
    deliveryFeesBreakdown,
    totalDeliveryFees,
    cartDiscount,
    cartTotal, 
    totalFoodItemsCount,
    minOrderStatuses,
    allMinOrdersMet,
    addresses, 
    placeOrder 
  } = useUserApp();

  const navigate = useNavigate();

  // Selected Delivery Address State
  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || '');

  // Selected Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // Loading state for placing order
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (cart.length === 0) {
    return (
      <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
        <div className="max-w-md mx-auto text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center mx-auto">
            <ShoppingBag size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Your cart is empty</h2>
          <p className="text-xs text-slate-500 font-medium">Please add items to your cart before proceeding to checkout.</p>
          <Link
            to="/restaurants"
            className="inline-block bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md"
          >
            Browse Restaurants
          </Link>
        </div>
      </UserLayout>
    );
  }

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || defaultAddress;

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      const newOrder = placeOrder({
        deliveryAddress: selectedAddress,
        paymentMethod
      });
      setIsPlacingOrder(false);
      if (newOrder) {
        navigate(`/orders/${newOrder.id}`);
      }
    }, 1000);
  };

  return (
    <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">
            Confirm your delivery address and payment method to complete your multi-restaurant order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Controls (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Section 1: Delivery Address Selection */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-[#FF6500]" />
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Select Delivery Address
                  </h3>
                </div>
                <Link
                  to="/addresses"
                  className="text-xs font-bold text-[#FF6500] hover:underline flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>Add New Address</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {addresses.map((item) => {
                  const isSelected = selectedAddressId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedAddressId(item.id)}
                      className={`
                        p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between
                        ${isSelected 
                          ? 'border-[#FF6500] bg-orange-50/50 ring-2 ring-orange-100' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'}
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`
                          w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center shrink-0
                          ${isSelected ? 'border-[#FF6500] bg-[#FF6500]' : 'border-slate-300'}
                        `}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-slate-900 text-sm">{item.label}</h4>
                            {item.isDefault && (
                              <span className="bg-[#FF6500] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{item.fullAddress}</p>
                          {item.landmark && <p className="text-[11px] text-slate-400">{item.landmark}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Payment Method Selection */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <CreditCard size={20} className="text-[#FF6500]" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`
                    p-4 rounded-2xl border cursor-pointer transition-all flex items-center space-x-3
                    ${paymentMethod === 'Cash on Delivery' 
                      ? 'border-[#FF6500] bg-orange-50/50 ring-2 ring-orange-100' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'}
                  `}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Cash on Delivery</h4>
                    <p className="text-[11px] text-slate-400">Pay when your order arrives</p>
                  </div>
                </div>

                {/* Online Payment (Mock) */}
                <div
                  onClick={() => setPaymentMethod('Online Payment')}
                  className={`
                    p-4 rounded-2xl border cursor-pointer transition-all flex items-center space-x-3
                    ${paymentMethod === 'Online Payment' 
                      ? 'border-[#FF6500] bg-orange-50/50 ring-2 ring-orange-100' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'}
                  `}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Online Payment</h4>
                    <p className="text-[11px] text-slate-400">eSewa / Khalti / Mobile Banking</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Sidebar: Order Summary & Place Order (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 sticky top-24">
              
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Multi-Restaurant Order</span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {cart.length} {cart.length === 1 ? 'Restaurant' : 'Restaurants'} • {totalFoodItemsCount} Items
                </h3>
              </div>

              {/* Itemized List Grouped by Restaurant */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {cart.map((group) => (
                  <div key={group.restaurantId} className="space-y-2">
                    <div className="flex items-center space-x-1.5 pb-1 border-b border-slate-100/80">
                      <Store size={12} className="text-[#FF6500]" />
                      <span className="text-[11px] font-extrabold text-slate-700 truncate">{group.restaurantName}</span>
                    </div>
                    {group.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs pl-4">
                        <div>
                          <span className="font-bold text-slate-900">{item.quantity}x </span>
                          <span className="font-medium text-slate-700">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-900">Rs. {item.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-semibold">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">Rs. {cartSubtotal}</span>
                </div>

                {/* Per-restaurant delivery fees */}
                {deliveryFeesBreakdown.map((df) => (
                  <div key={df.restaurantId} className="flex justify-between text-slate-400 text-[11px]">
                    <span className="truncate max-w-[130px]">Delivery: {df.restaurantName}</span>
                    <span className="font-bold text-emerald-600">
                      {df.deliveryFee === 0 ? 'FREE' : `Rs. ${df.deliveryFee}`}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between text-slate-500">
                  <span>Total Delivery</span>
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
                  <span className="font-extrabold text-slate-900">Total Payable</span>
                  <span className="text-lg font-extrabold text-[#FF6500]">Rs. {cartTotal}</span>
                </div>
              </div>

              {/* Minimum Order Warnings */}
              {!allMinOrdersMet && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-700 font-semibold space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <AlertCircle size={14} className="shrink-0 text-amber-500" />
                    <span className="font-bold">Min order not met:</span>
                  </div>
                  {minOrderStatuses.filter(s => !s.meetsMinOrder).map(s => (
                    <p key={s.restaurantId} className="pl-5 text-[11px]">
                      {s.restaurantName}: add Rs. {s.amountNeeded} more
                    </p>
                  ))}
                </div>
              )}

              {/* Place Order Button */}
              <button
                disabled={isPlacingOrder || !allMinOrdersMet}
                onClick={handlePlaceOrder}
                className="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Place Order</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Safe & Secure Checkout</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </UserLayout>
  );
}
