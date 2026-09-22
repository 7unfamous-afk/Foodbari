import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Floating Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-up text-xs font-bold
              ${toast.type === 'success' 
                ? 'bg-slate-900/95 text-white border-emerald-500/40' 
                : toast.type === 'error' 
                ? 'bg-rose-950/95 text-white border-rose-500/40' 
                : 'bg-slate-900/95 text-white border-orange-500/40'}
            `}
          >
            <div className="flex items-center space-x-3">
              {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle size={18} className="text-rose-400 shrink-0" />}
              {toast.type === 'info' && <Info size={18} className="text-[#FF6500] shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white ml-3 p-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
