import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  RotateCcw, 
  Eye, 
  Navigation, 
  XCircle, 
  Headphones, 
  ChevronRight,
  ShoppingBag,
  Store
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';

export default function MyOrders() {
  const { orders, cancelOrder, reorder } = useUserApp();
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Helper to derive the overall status from restaurantOrders
  const getOrderStatus = (order) => {
    if (order.status) return order.status;
    if (!order.restaurantOrders || order.restaurantOrders.length === 0) return 'Unknown';
    const statuses = order.restaurantOrders.map(ro => ro.status);
    if (statuses.every(s => s === 'Cancelled')) return 'Cancelled';
    if (statuses.every(s => s === 'Delivered' || s === 'Completed')) return 'Delivered';
    if (statuses.some(s => s === 'Out for Delivery')) return 'Out for Delivery';
    if (statuses.some(s => s === 'Preparing')) return 'Preparing';
    return statuses[0] || 'Unknown';
  };

  const activeOrdersCount = orders.filter(o => {
    const s = getOrderStatus(o);
    return s === 'Preparing' || s === 'Out for Delivery';
  }).length;

  const completedOrdersCount = orders.filter(o => {
    const s = getOrderStatus(o);
    return s === 'Delivered' || s === 'Completed';
  }).length;

  const cancelledOrdersCount = orders.filter(o => getOrderStatus(o) === 'Cancelled').length;

  const filteredOrders = orders.filter(order => {
    const status = getOrderStatus(order);
    if (activeTab === 'active') return status === 'Preparing' || status === 'Out for Delivery';
    if (activeTab === 'completed') return status === 'Delivered' || status === 'Completed';
    if (activeTab === 'cancelled') return status === 'Cancelled';
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Preparing':
        return <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Preparing</span>;
      case 'Out for Delivery':
        return <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Out for Delivery</span>;
      case 'Delivered':
        return <span className="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">Delivered</span>;
      case 'Completed':
        return <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">Completed</span>;
      case 'Cancelled':
        return <span className="bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{status}</span>;
    }
  };

  const handleReorder = (order) => {
    reorder(order);
    navigate('/cart');
  };

  // Helper: get all items from all restaurant groups
  const getAllOrderItems = (order) => {
    if (order.restaurantOrders) {
      return order.restaurantOrders.flatMap(ro => ro.items || []);
    }
    return order.items || [];
  };

  // Helper: get restaurant names
  const getRestaurantNames = (order) => {
    if (order.restaurantOrders) {
      return order.restaurantOrders.map(ro => ro.restaurantName).join(', ');
    }
    return order.restaurantName || '';
  };

  return (
    <UserLayout searchPlaceholder="Search for restaurants, cuisines, or dishes...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Page Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Track your orders, view past orders, and reorder your favorite meals.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: `All Orders (${orders.length})` },
              { id: 'active', label: `Active Orders (${activeOrdersCount})` },
              { id: 'completed', label: `Completed (${completedOrdersCount})` },
              { id: 'cancelled', label: `Cancelled (${cancelledOrdersCount})` },
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

          {/* Order Cards List or Empty State */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">No orders found</h3>
              <p className="text-xs text-slate-500 font-medium">You haven't placed any orders in this category yet.</p>
              <Link
                to="/restaurants"
                className="inline-flex items-center space-x-2 bg-[#FF6500] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
              >
                <span>Browse Restaurants</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const orderStatus = getOrderStatus(order);
                const allItems = getAllOrderItems(order);
                const restaurantNames = getRestaurantNames(order);
                const restCount = order.restaurantOrders ? order.restaurantOrders.length : 1;

                // Get item images for thumbnail strip
                const itemImages = allItems.filter(i => i.image).slice(0, 3).map(i => i.image);
                // Items summary text
                const itemsSummary = allItems.slice(0, 2).map(i => `${i.quantity || 1}x ${i.name}`).join(', ');
                const extraItemsCount = Math.max(0, allItems.length - 2);

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center space-x-3">
                        {/* Multi-restaurant: show store icon with restaurant count */}
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF6500] flex items-center justify-center border border-orange-100 shrink-0">
                          <Store size={22} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">
                            {restCount > 1 ? `${restCount} Restaurants` : restaurantNames}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium">
                            {restCount > 1 ? restaurantNames : (order.restaurantOrders?.[0]?.restaurantCuisine || '')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getStatusBadge(orderStatus)}
                        <ChevronRight size={18} className="text-slate-400" />
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{order.date} • {order.time}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin size={14} className="text-slate-400" />
                        <span>{order.location}</span>
                      </div>
                    </div>

                    {/* Items Summary */}
                    <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-100/80">
                      <div className="flex -space-x-2 overflow-hidden shrink-0">
                        {itemImages.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt="Item" 
                            className="inline-block h-9 w-9 rounded-xl ring-2 ring-white object-cover"
                          />
                        ))}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {itemsSummary}
                        </p>
                        {extraItemsCount > 0 && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            +{extraItemsCount} more item{extraItemsCount > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block font-medium">Total</span>
                        <span className="text-sm font-extrabold text-slate-900">
                          Rs. {order.totalAmount}
                        </span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-start space-x-3 pt-1">
                      {orderStatus === 'Preparing' || orderStatus === 'Out for Delivery' ? (
                        <>
                          <button 
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#FF6500] text-[#FF6500] hover:bg-orange-50 text-xs font-bold transition-colors"
                          >
                            <Navigation size={14} />
                            <span>Track Order</span>
                          </button>

                          {orderStatus === 'Preparing' && (
                            <button 
                              onClick={() => cancelOrder(order.id)}
                              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-slate-500 hover:text-rose-600 text-xs font-semibold transition-colors"
                            >
                              <XCircle size={14} />
                              <span>Cancel Order</span>
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleReorder(order)}
                            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-[#FF6500] text-[#FF6500] hover:bg-orange-50 text-xs font-bold transition-colors"
                          >
                            <RotateCcw size={14} />
                            <span>Reorder</span>
                          </button>
                          <button 
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                          >
                            <Eye size={14} />
                            <span>View Details</span>
                          </button>
                        </>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Reorder Promo Card */}
          <div className="bg-[#FFF4ED] p-6 rounded-3xl border border-orange-100 relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6500] text-white flex items-center justify-center shadow-md">
              <RotateCcw size={24} />
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Craving something again?
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Reorder your favorite meals from past orders in just one click.
              </p>
            </div>

            <button 
              onClick={() => setActiveTab('completed')}
              className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
            >
              <span>View Past Orders</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Order Status Guide */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Order Status Guide</h3>

            <div className="space-y-3 relative pl-4 border-l-2 border-slate-100 text-xs">
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                <h4 className="font-bold text-slate-900">Preparing</h4>
                <p className="text-slate-400 text-[11px]">Your order is being prepared by the restaurant(s).</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                <h4 className="font-bold text-slate-900">Out for Delivery</h4>
                <p className="text-slate-400 text-[11px]">Your order is on the way.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-slate-100"></div>
                <h4 className="font-bold text-slate-900">Delivered</h4>
                <p className="text-slate-400 text-[11px]">Enjoy your meal!</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-50"></div>
                <h4 className="font-bold text-slate-900">Cancelled</h4>
                <p className="text-slate-400 text-[11px]">Your order was cancelled.</p>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <Headphones size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Need Help?</h3>
                <p className="text-[11px] text-slate-400">Facing an issue with your order?</p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              We're here to help. Contact support anytime.
            </p>

            <button className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors">
              <span>Contact Support</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </UserLayout>
  );
}
