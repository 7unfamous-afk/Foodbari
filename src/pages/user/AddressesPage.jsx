import React, { useState } from 'react';
import { 
  MapPin, 
  Home as HomeIcon, 
  Briefcase, 
  Plus, 
  Pencil, 
  Trash2, 
  Circle,
  X,
  Check
} from 'lucide-react';
import UserLayout from '../../components/user/UserLayout';
import { useUserApp } from '../../context/AppContext';
import DeleteAddressModal from '../../components/user/DeleteAddressModal';

export default function AddressesPage() {
  const { addresses, addAddress, editAddress, deleteAddress, setDefaultAddress } = useUserApp();
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [label, setLabel] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [district, setDistrict] = useState('Kathmandu');
  const [postalCode, setPostalCode] = useState('');
  const [note, setNote] = useState('');
  const [isDefaultForm, setIsDefaultForm] = useState(false);

  // Delete modal state
  const [deletingAddress, setDeletingAddress] = useState(null);

  const startEdit = (item) => {
    setEditingId(item.id);
    setLabel(item.label);
    setFullAddress(item.fullAddress);
    setDistrict(item.district || 'Kathmandu');
    setPostalCode(item.postalCode || '');
    setNote(item.landmark || item.note || '');
    setIsDefaultForm(item.isDefault);
  };

  const resetForm = () => {
    setEditingId(null);
    setLabel('');
    setFullAddress('');
    setDistrict('Kathmandu');
    setPostalCode('');
    setNote('');
    setIsDefaultForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim() || !fullAddress.trim()) return;

    const addressData = {
      label: label.trim(),
      fullAddress: fullAddress.trim(),
      district: district || 'Kathmandu',
      city: district || 'Kathmandu',
      postalCode: postalCode.trim(),
      landmark: note.trim(),
      note: note.trim(),
      isDefault: isDefaultForm,
      icon: label.toLowerCase().includes('home') ? 'home' : label.toLowerCase().includes('office') ? 'briefcase' : 'map-pin'
    };

    if (editingId) {
      editAddress(editingId, addressData);
    } else {
      addAddress(addressData);
    }
    resetForm();
  };

  const getAddressIcon = (type) => {
    if (type === 'home') return <HomeIcon size={20} className="text-[#FF6500]" />;
    if (type === 'briefcase') return <Briefcase size={20} className="text-slate-600" />;
    return <MapPin size={20} className="text-slate-600" />;
  };

  return (
    <UserLayout searchPlaceholder="Search for food, restaurants, or cuisines...">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Addresses
              </h1>
              <p className="text-slate-500 text-sm mt-0.5 font-medium">
                Manage your delivery addresses for a faster and smoother food ordering experience.
              </p>
            </div>
          </div>

          {/* Address Cards List */}
          <div className="space-y-4">
            {addresses.map((item) => {
              const isDefault = item.isDefault;

              return (
                <div
                  key={item.id}
                  onClick={() => setDefaultAddress(item.id)}
                  className={`
                    relative bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md
                    ${isDefault 
                      ? 'border-[#FF6500] bg-[#FFFDFB] ring-2 ring-orange-100' 
                      : 'border-slate-100 hover:border-slate-200'}
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* Left Icon & Details */}
                    <div className="flex items-start space-x-4">
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5
                        ${isDefault ? 'bg-orange-100/80' : 'bg-slate-100'}
                      `}>
                        {getAddressIcon(item.icon)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          {isDefault && (
                            <span className="bg-[#FF6500] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Default
                            </span>
                          )}
                          <h3 className="font-extrabold text-slate-900 text-base">
                            {item.label}
                          </h3>
                        </div>

                        <p className="text-xs font-semibold text-slate-700">
                          {item.fullAddress}
                        </p>
                        
                        {(item.landmark || item.note) && (
                          <p className="text-xs text-slate-400 font-medium">
                            {item.landmark || item.note}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Actions & Radio Indicator */}
                    <div className="flex items-center space-x-4 shrink-0">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(item);
                        }}
                        className="flex items-center space-x-1 text-slate-400 hover:text-slate-700 text-xs font-semibold"
                      >
                        <Pencil size={14} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingAddress(item);
                        }}
                        className="flex items-center space-x-1 text-slate-400 hover:text-rose-600 text-xs font-semibold"
                      >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>

                      {/* Select Indicator */}
                      <div className="pl-2">
                        {isDefault ? (
                          <div className="w-5 h-5 rounded-full border-2 border-[#FF6500] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6500]"></div>
                          </div>
                        ) : (
                          <Circle size={20} className="text-slate-300" />
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Promotional Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <MapPin size={28} className="text-[#FF6500]" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Faster Delivery, Happier You!
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keep your addresses updated for a seamless ordering experience.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-sm font-serif italic text-slate-900 font-bold">
                Good Food <br />
                <span className="text-[#FF6500] font-sans not-italic">Good Vibes ❤️</span>
              </p>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Add / Edit Address Form Panel (4 Columns) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 sticky top-24">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6500] text-white flex items-center justify-center">
                  {editingId ? <Pencil size={16} /> : <Plus size={18} />}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {editingId ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {editingId ? 'Update your saved delivery address details.' : 'Save a new address to get your favorite food delivered here.'}
                  </p>
                </div>
              </div>

              {editingId && (
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Address Label */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Address Label <span className="text-slate-400 font-normal">(e.g. Home, Office)</span>
                </label>
                <input
                  type="text"
                  required
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Enter label name"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                />
              </div>

              {/* Full Address */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Full Address
                </label>
                <input
                  type="text"
                  required
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="House No., Street, Area, Landmark"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                />
              </div>

              {/* City / District & Postal Code */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    City / District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#FF6500]"
                  >
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Lalitpur">Lalitpur</option>
                    <option value="Bhaktapur">Bhaktapur</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 44600"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Additional Note */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Additional Note <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={200}
                  rows={3}
                  placeholder="Any specific instructions for the delivery person."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all resize-none"
                />
                <div className="text-right text-[10px] text-slate-400">
                  {note.length}/200
                </div>
              </div>

              {/* Set Default Checkbox */}
              <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isDefaultForm}
                  onChange={(e) => setIsDefaultForm(e.target.checked)}
                  className="w-4 h-4 text-[#FF6500] rounded accent-[#FF6500]"
                />
                <span className="text-slate-700 font-semibold">Set as default delivery address</span>
              </label>

              {/* Save Address Button */}
              <button
                type="submit"
                className="w-full bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <MapPin size={16} />
                <span>{editingId ? 'Update Address' : 'Save Address'}</span>
              </button>

            </form>

          </div>
        </div>

      </div>

      {/* Delete Address Confirmation Modal */}
      {deletingAddress && (
        <DeleteAddressModal
          address={deletingAddress}
          onConfirm={deleteAddress}
          onClose={() => setDeletingAddress(null)}
        />
      )}
    </UserLayout>
  );
}
