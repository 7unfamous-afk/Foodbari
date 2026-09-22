import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  Utensils, 
  MapPin, 
  Star, 
  Pencil, 
  Camera, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ArrowRight,
  Shield,
  Bell,
  Check,
  X,
  Flame,
  CheckCircle2
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useAuth } from '../../context/AuthContext';
import { useUserApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const { 
    orders, 
    favorites, 
    addresses, 
    preferences, 
    updatePreferences, 
    notificationSettings, 
    updateNotificationSettings 
  } = useUserApp();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('personal');

  // Edit Profile Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editPhone, setEditPhone] = useState(currentUser.phone || '+977 9812345678');
  const [editDob, setEditDob] = useState(currentUser.dob || '2003-01-12');
  const [editGender, setEditGender] = useState(currentUser.gender || 'Male');
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      dob: editDob,
      gender: editGender,
      avatar: editAvatar
    });
    setShowEditModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Center Main Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Profile Header Banner */}
          <div className="bg-gradient-to-r from-orange-50/80 via-amber-50/40 to-orange-100/40 rounded-3xl p-6 sm:p-8 border border-orange-100/80 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                {/* Avatar with Camera Overlay */}
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#FF6500] text-white flex items-center justify-center shadow-md hover:bg-[#e05800] transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                {/* Info Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                      {currentUser.name}
                    </h1>
                    <button onClick={() => setShowEditModal(true)} className="text-slate-400 hover:text-slate-600">
                      <Pencil size={16} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-500 font-medium">
                    {currentUser.email}
                  </p>

                  <div className="pt-1">
                    <span className="inline-flex items-center space-x-1.5 bg-orange-100/80 text-[#FF6500] text-xs font-bold px-3 py-1 rounded-full">
                      <Heart size={12} className="fill-[#FF6500]" />
                      <span>{currentUser.role || 'Food Lover'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Profile Action Button */}
              <button 
                onClick={() => setShowEditModal(true)}
                className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 transition-colors"
              >
                <Pencil size={14} />
                <span>Edit Profile</span>
              </button>

            </div>
          </div>

          {/* User Stats Grid (4 Columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0">
                <Utensils size={18} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{orders.length}</h3>
                <p className="text-[11px] font-medium text-slate-500">Total Orders</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                <Heart size={18} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{favorites.length}</h3>
                <p className="text-[11px] font-medium text-slate-500">Favorite Restaurants</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{addresses.length}</h3>
                <p className="text-[11px] font-medium text-slate-500">Saved Addresses</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center shrink-0">
                <Star size={18} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{currentUser.stats?.avgRating || 4.5}</h3>
                <p className="text-[11px] font-medium text-slate-500">Avg. Rating</p>
              </div>
            </div>

          </div>

          {/* Profile Tabs & Form */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            
            {/* Nav Tabs */}
            <div className="flex border-b border-slate-100 px-6 pt-4 gap-8">
              {[
                { id: 'personal', label: 'Personal Information', icon: UserIcon },
                { id: 'preferences', label: 'Preferences', icon: Heart },
                { id: 'notifications', label: 'Notifications', icon: Bell },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 pb-4 text-xs font-bold transition-all relative cursor-pointer
                      ${isActive 
                        ? 'text-[#FF6500]' 
                        : 'text-slate-500 hover:text-slate-900'}
                    `}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6500] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Personal Information */}
            {activeTab === 'personal' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Personal Information
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Update your personal details and keep your account up to date.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-100/60 transition-colors">
                    <div className="flex items-center space-x-3.5">
                      <div className="text-slate-400">
                        <UserIcon size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">Full Name</span>
                        <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-[#FF6500] px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Email Address */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-100/60 transition-colors">
                    <div className="flex items-center space-x-3.5">
                      <div className="text-slate-400">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">Email Address</span>
                        <span className="text-xs font-bold text-slate-800">{currentUser.email}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-[#FF6500] px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-100/60 transition-colors">
                    <div className="flex items-center space-x-3.5">
                      <div className="text-slate-400">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">Phone Number</span>
                        <span className="text-xs font-bold text-slate-800">{currentUser.phone || '+977 9812345678'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-[#FF6500] px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-100/60 transition-colors">
                    <div className="flex items-center space-x-3.5">
                      <div className="text-slate-400">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">Date of Birth</span>
                        <span className="text-xs font-bold text-slate-800">{currentUser.dob || '12 Jan 2003'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-[#FF6500] px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-100/60 transition-colors">
                    <div className="flex items-center space-x-3.5">
                      <div className="text-slate-400">
                        <Shield size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">Gender</span>
                        <span className="text-xs font-bold text-slate-800">{currentUser.gender || 'Male'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-[#FF6500] px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Preferences */}
            {activeTab === 'preferences' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Food & Dining Preferences
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Customize your food experience for better recommendations.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Vegetarian Preference */}
                  <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">Vegetarian Only</span>
                      <span className="text-[11px] text-slate-400">Filter out non-veg options by default</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.vegetarianOnly}
                      onChange={(e) => updatePreferences({ vegetarianOnly: e.target.checked })}
                      className="w-5 h-5 text-[#FF6500] rounded accent-[#FF6500]"
                    />
                  </label>

                  {/* Spicy Preference */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Flame size={16} className="text-amber-500" />
                      <span className="font-bold text-slate-900 text-xs">Spicy Food Preference</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      {['Mild', 'Medium', 'Extra Hot'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => updatePreferences({ spicyFoodPreference: lvl })}
                          className={`
                            px-4 py-2 rounded-xl text-xs font-bold border transition-all
                            ${preferences.spicyFoodPreference === lvl
                              ? 'bg-[#FF6500] text-white border-[#FF6500]'
                              : 'bg-white text-slate-700 border-slate-200'}
                          `}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Notification Settings
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Manage how and when you receive notifications from Foodbari.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'orderUpdates', title: 'Order Updates', desc: 'Real-time order status and delivery tracking notifications' },
                    { key: 'promotions', title: 'Promotions & Discounts', desc: 'Exclusive coupons, seasonal discounts and promo alerts' },
                    { key: 'restaurantOffers', title: 'Restaurant Offers', desc: 'Special deals from your favorite saved restaurants' },
                    { key: 'deliveryNotifications', title: 'Delivery Notifications', desc: 'Alerts when driver is approaching your doorstep' },
                  ].map((setting) => (
                    <label 
                      key={setting.key}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer"
                    >
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">{setting.title}</span>
                        <span className="text-[11px] text-slate-400">{setting.desc}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings[setting.key])}
                        onChange={(e) => updateNotificationSettings({ [setting.key]: e.target.checked })}
                        className="w-5 h-5 text-[#FF6500] rounded accent-[#FF6500]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Banner */}
          <div className="bg-[#FFF8F3] p-5 rounded-3xl border border-orange-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center">
                <Utensils size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Food tastes better when you're happy!
                </h4>
                <p className="text-xs text-slate-500">
                  Stay hungry, stay happy. 🍕
                </p>
              </div>
            </div>

            <p className="text-sm font-serif italic text-slate-900 font-bold hidden sm:block">
              Good Food <br />
              <span className="text-[#FF6500] font-sans not-italic">Good Mood</span>
            </p>
          </div>

        </div>

        {/* Right Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Quick Actions</h3>

            <button 
              onClick={() => setShowEditModal(true)}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Pencil size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                    Edit Profile
                  </h4>
                  <p className="text-[11px] text-slate-400">Update your personal information</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

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
                  <p className="text-[11px] text-slate-400">Your saved delivery addresses</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button 
              onClick={() => setActiveTab('preferences')}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Lock size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF6500] transition-colors">
                    Change Password
                  </h4>
                  <p className="text-[11px] text-slate-400">Keep your account secure</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Special Offer Card */}
          <div className="bg-[#FFF4ED] p-6 rounded-3xl border border-orange-100 relative overflow-hidden space-y-3">
            <div className="relative z-10 space-y-3 max-w-[200px]">
              <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                Craving <br />
                Something Special?
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Explore new restaurants, exclusive offers and more!
              </p>
              <Link
                to="/restaurants"
                className="inline-flex items-center space-x-2 bg-[#FF6500] hover:bg-[#e05800] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <span>Browse Restaurants</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="absolute -right-4 -bottom-4 w-32 h-32">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
                alt="Promo Food"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Logout Button Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between group text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <LogOut size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-600 group-hover:underline">
                    Logout
                  </h4>
                  <p className="text-[11px] text-slate-400">Sign out from your account</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </button>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Avatar Image URL</label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    value={editDob}
                    onChange={(e) => setEditDob(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FF6500] text-white text-xs font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
