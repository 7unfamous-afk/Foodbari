import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { useUserApp } from '../../context/AppContext';

export default function ItemCustomizationModal({ item, restaurant, onClose }) {
  const { addToCart } = useUserApp();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSpice, setSelectedSpice] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    if (item && item.customizations) {
      if (item.customizations.sizes && item.customizations.sizes.length > 0) {
        setSelectedSize(item.customizations.sizes[0]);
      }
      if (item.customizations.spiceLevels && item.customizations.spiceLevels.length > 0) {
        setSelectedSpice(item.customizations.spiceLevels[0]);
      }
    }
  }, [item]);

  if (!item) return null;

  const toggleExtra = (extra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.name === extra.name);
      if (exists) {
        return prev.filter(e => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  };

  // Calculate price
  let unitPrice = item.price;
  if (selectedSize && selectedSize.price) {
    unitPrice += selectedSize.price;
  }
  selectedExtras.forEach(e => {
    unitPrice += e.price || 0;
  });
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const customization = {
      size: selectedSize,
      spiceLevel: selectedSpice,
      extras: selectedExtras,
      specialInstructions
    };

    const added = addToCart(item, restaurant, customization, quantity);
    if (added) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-scale-up">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 shrink-0">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-all"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
            Rs. {item.price}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                {item.name}
              </h3>
              {item.isVegetarian ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Veg</span>
              ) : (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">Non-Veg</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Sizes Customization */}
          {item.customizations?.sizes && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Portion Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customizations.sizes.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`
                      p-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer
                      ${selectedSize?.name === s.name 
                        ? 'border-[#FF6500] bg-orange-50/60 text-[#FF6500]' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'}
                    `}
                  >
                    <span>{s.name}</span>
                    <span>{s.price > 0 ? `+Rs. ${s.price}` : 'Included'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level */}
          {item.customizations?.spiceLevels && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                <Flame size={14} className="text-amber-500" />
                <span>Spice Level</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {item.customizations.spiceLevels.map((lvl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSpice(lvl)}
                    className={`
                      px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer
                      ${selectedSpice === lvl 
                        ? 'bg-[#FF6500] text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
                    `}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {item.customizations?.extras && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Add-ons & Extras
              </label>
              <div className="space-y-2">
                {item.customizations.extras.map((ex, idx) => {
                  const isChecked = selectedExtras.some(e => e.name === ex.name);
                  return (
                    <label
                      key={idx}
                      className={`
                        flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all text-xs font-semibold
                        ${isChecked 
                          ? 'border-[#FF6500] bg-orange-50/40 text-slate-900' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleExtra(ex)}
                          className="w-4 h-4 text-[#FF6500] rounded accent-[#FF6500]"
                        />
                        <span>{ex.name}</span>
                      </div>
                      <span className="font-bold text-[#FF6500]">+Rs. {ex.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Special Instructions
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Less spicy, no onions, extra napkins..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6500] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="font-extrabold text-sm text-slate-900 w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-8 h-8 rounded-xl bg-[#FF6500] text-white flex items-center justify-center hover:bg-[#e05800] transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#FF6500] hover:bg-[#e05800] text-white font-bold py-3 px-5 rounded-2xl shadow-lg transition-all flex items-center justify-between text-xs sm:text-sm"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </span>
            <span className="font-extrabold">Rs. {totalPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
