import React from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

export default function DeleteAddressModal({ address, onConfirm, onClose }) {
  if (!address) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Trash2 size={20} />
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Delete Address?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Are you sure you want to delete <span className="font-bold text-slate-800">"{address.label}"</span> ({address.fullAddress})?
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(address.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
