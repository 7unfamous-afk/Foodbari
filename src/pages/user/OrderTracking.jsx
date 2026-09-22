import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  ArrowLeft, 
  RotateCcw, 
  XCircle, 
  Headphones, 
  ChefHat, 
  Bike, 
  PackageCheck 
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';

export default function OrderTracking() {
  const { orderId } = useParams();
  const { orders, cancelOrder, reorder } = useUserApp();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
        <div className="max-w-md mx-auto text-center py-16 space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">Order Not Found</h2>
          <Link to="/orders" className="text-[#FF6500] font-bold text-xs hover:underline">
            Back to My Orders
          </Link>
        </div>
      </UserLayout>
    );
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered':
      case 'Completed': return 3;
      case 'Cancelled': return -1;
      default: return 1;
    }
  };

  const currentStep = getStatusStep(order.status);

  const handleReorder = () => {
    reorder(order);
    navigate('/cart');
  };

  return (
    <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <Link 
          to="/orders" 
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-[#FF6500] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to My Orders</span>
        </Link>

        {/* Status Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-extrabold text-[#FF6500] tracking-wider uppercase">
                Order #{order.id}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {order.status === 'Cancelled' ? 'Order Cancelled' : order.status === 'Delivered' || order.status === 'Completed' ? 'Order Delivered! 🎉' : 'Preparing your meal... 🍳'}
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Placed on {order.date} at {order.time}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {order.status === 'Preparing' && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <XCircle size={14} />
                  <span>Cancel Order</span>
                </button>
              )}

              {(order.status === 'Delivered' || order.status === 'Completed' || order.status === 'Cancelled') && (
                <button
                  onClick={handleReorder}
                  className="px-5 py-2.5 rounded-xl bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
                >
                  <RotateCcw size={14} />
                  <span>Reorder Meal</span>
                </button>
              )}
            </div>
          </div>

          {/* Visual Timeline Bar (If not cancelled) */}
          {order.status !== 'Cancelled' && (
            <div className="py-4">
              <div className="relative flex items-center justify-between">
                
                {/* Connecting Progress Line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0">
                  <div 
                    className="h-full bg-[#FF6500] transition-all duration-500" 
                    style={{ width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%' }}
                  />
                </div>

                {/* Step 1: Order Placed */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#FF6500] text-white flex items-center justify-center shadow-md">
                    <ChefHat size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Preparing</span>
                </div>

                {/* Step 2: Out for Delivery */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
                    ${currentStep >= 2 ? 'bg-[#FF6500] text-white' : 'bg-slate-100 text-slate-400'}
                  `}>
                    <Bike size={20} />
                  </div>
                  <span className={`text-xs font-bold ${currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Out for Delivery
                  </span>
                </div>

                {/* Step 3: Delivered */}
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
                    ${currentStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}
                  `}>
                    <PackageCheck size={20} />
                  </div>
                  <span className={`text-xs font-bold ${currentStep >= 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    Delivered
                  </span>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Order Details & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Items Summary */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <img 
                src={order.restaurantImage} 
                alt={order.restaurantName}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{order.restaurantName}</h3>
                <p className="text-[11px] text-slate-400 font-medium">{order.restaurantCuisine}</p>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#FF6500]">{item.quantity || 1}x</span>
                    <span className="text-slate-800">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">Rs. {item.totalPrice || item.price * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal || order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Fee</span>
                <span className="text-emerald-600">
                  {order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Amount</span>
                <span className="text-[#FF6500] text-base">Rs. {order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Right: Delivery Info & Support */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Delivery Details
              </h3>

              <div className="space-y-3 text-xs font-medium text-slate-600">
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-[#FF6500] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Delivery Address</span>
                    <span>{order.deliveryAddress || order.location}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CreditCard size={16} className="text-[#FF6500] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Payment Method</span>
                    <span>{order.paymentMethod || 'Cash on Delivery'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Headphones size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Need help with this order?</h4>
                  <p className="text-[11px] text-slate-400">Our customer support team is available 24/7.</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#FF6500] hover:underline shrink-0">
                Contact Support
              </button>
            </div>
          </div>

        </div>

      </div>
    </UserLayout>
  );
}
