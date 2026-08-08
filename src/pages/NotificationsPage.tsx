import React from 'react';
import { useGigly } from '../context/GiglyContext';
import { Bell, Trash2 } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications, navigate } = useGigly();

  // Group notifications into Today and Earlier
  const todayNotifs = notifications.filter(n => n.timestamp.includes('min') || n.timestamp.includes('hour') || n.timestamp.includes('Just now'));
  const earlierNotifs = notifications.filter(n => !n.timestamp.includes('min') && !n.timestamp.includes('hour') && !n.timestamp.includes('Just now'));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Notifications
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Activity updates on offers, messages, and task completions.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Notifications Stream */}
      {notifications.length === 0 ? (
        <div className="py-16 text-center bg-[#121814] border border-gray-800 rounded-3xl p-8 space-y-3">
          <Bell className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No notifications right now</h3>
          <p className="text-xs text-gray-400">Updates on your offers and tasks will appear here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Today Section */}
          {todayNotifs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#8CE600] uppercase tracking-wider">Today</h3>
              <div className="space-y-3">
                {todayNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      if (notif.gigId) navigate(`/gigs/${notif.gigId}`);
                    }}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border flex items-start justify-between gap-4 ${
                      notif.isRead
                        ? 'bg-[#121814] border-gray-800/80 text-gray-400'
                        : 'bg-[#18201A] border-[#8CE600]/40 text-white font-medium shadow-md'
                    } hover:border-[#8CE600]`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
                        )}
                      </div>
                      <p className="text-xs text-gray-300">{notif.message}</p>
                    </div>

                    <span className="text-[10px] text-gray-500 shrink-0">{notif.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earlier Section */}
          {earlierNotifs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Earlier</h3>
              <div className="space-y-3">
                {earlierNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      if (notif.gigId) navigate(`/gigs/${notif.gigId}`);
                    }}
                    className="p-5 rounded-2xl bg-[#121814] border border-gray-800 text-gray-400 hover:border-gray-700 cursor-pointer transition-all flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 mb-1">{notif.title}</h4>
                      <p className="text-xs text-gray-400">{notif.message}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 shrink-0">{notif.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
