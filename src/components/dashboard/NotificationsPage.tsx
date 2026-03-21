import React, { useState } from 'react';
import {
  Bell,
  FileText,
  Briefcase,
  User,
  BarChart3,
  CheckCheck,
  Trash2,
  Filter,
} from 'lucide-react';
import { Notification, notifications as initialNotifications, formatDate } from '@/data/investorData';
import { toast } from '@/components/ui/use-toast';

const notifTypeConfig: Record<string, { icon: React.ElementType; bg: string; iconColor: string; label: string }> = {
  document: { icon: FileText, bg: 'bg-blue-50', iconColor: 'text-blue-500', label: 'Document' },
  deal: { icon: Briefcase, bg: 'bg-emerald-50', iconColor: 'text-emerald-500', label: 'Deal' },
  account: { icon: User, bg: 'bg-violet-50', iconColor: 'text-violet-500', label: 'Account' },
  report: { icon: BarChart3, bg: 'bg-amber-50', iconColor: 'text-amber-500', label: 'Report' },
};

const NotificationsPage: React.FC = () => {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const displayNotifs = filter === 'unread' ? notifs.filter((n) => !n.read) : notifs;
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: 'All Caught Up',
      description: 'All notifications have been marked as read.',
    });
  };

  const deleteNotification = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    toast({
      title: 'Notification Removed',
      description: 'The notification has been deleted.',
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <p className="text-[13px] text-slate-500 mt-1">
            Stay up to date with your investment activity and document uploads.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-medium transition-colors self-start"
          >
            <CheckCheck size={15} />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-5 bg-slate-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          All ({notifs.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
            filter === 'unread'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
        {displayNotifs.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {displayNotifs.map((notif) => {
              const config = notifTypeConfig[notif.type] || notifTypeConfig.document;
              const Icon = config.icon;
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 px-5 lg:px-6 py-4 transition-colors group ${
                    !notif.read ? 'bg-emerald-50/30' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={18} className={config.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-[14px] font-semibold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${config.bg} ${config.iconColor}`}>
                            {config.label}
                          </span>
                          <span className="text-[11px] text-slate-400">{formatDate(notif.date)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors"
                            title="Mark as read"
                          >
                            <CheckCheck size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete notification"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell size={36} className="text-slate-300 mx-auto mb-3" />
            <p className="text-[14px] font-medium text-slate-500">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </p>
            <p className="text-[12px] text-slate-400 mt-1">
              {filter === 'unread' ? "You're all caught up!" : 'Notifications will appear here when there are updates.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
