import React from 'react';
import { Bell, CheckCheck, Package, Tag, Info } from 'lucide-react';
import { useUserApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationsDropdown({ onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useUserApp();
  const navigate = useNavigate();

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.orderId) {
      navigate(`/orders/${notif.orderId}`);
    } else {
      navigate('/restaurants');
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 z-50 animate-scale-up">
      <div className="flex items-center justify-between px-5 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Bell size={18} className="text-[#FF6500]" />
          <h3 className="font-extrabold text-slate-900 text-sm">Notifications</h3>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-bold text-[#FF6500] hover:underline flex items-center gap-1"
        >
          <CheckCheck size={14} />
          <span>Mark all read</span>
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No notifications yet
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`
                p-4 flex items-start space-x-3 cursor-pointer hover:bg-slate-50 transition-colors relative
                ${!notif.read ? 'bg-orange-50/40' : ''}
              `}
            >
              <div className={`
                w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5
                ${notif.type === 'order' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-[#FF6500]'}
              `}>
                {notif.type === 'order' ? <Package size={16} /> : <Tag size={16} />}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {notif.message}
                </p>
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-[#FF6500] shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
