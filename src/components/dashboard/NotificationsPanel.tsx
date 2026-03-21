import React, { useState } from 'react';
import {
  Bell,
  FileText,
  Briefcase,
  User,
  BarChart3,
  Check,
  ChevronRight,
  CheckCheck,
} from 'lucide-react';
import { Notification, notifications as initialNotifications, formatDate } from '@/data/investorData';
import { toast } from '@/components/ui/use-toast';

interface NotificationsPanelProps {
  onViewAll: () => void;
  compact?: boolean;
}

const notifTypeConfig: Record<string, { icon: React.ElementType; bg: string; iconColor: string }> = {
  document: { icon: FileText, bg: 'bg-blue-50', iconColor: 'text-blue-500' },
  deal: { icon: Briefcase, bg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  account: { icon: User, bg: 'bg-violet-50', iconColor: 'text-violet-500' },
  report: { icon: BarChart3, bg: 'bg-amber-50', iconColor: 'text-amber-500' },
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onViewAll, compact = true }) => {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);

  const displayNotifs = compact ? notifs.slice(0, 4) : notifs;
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: 'All Caught Up',
      description: 'All notifications marked as read.',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
      <div className="px-5 lg:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold text-slate-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-emerald-600 transition-colors"
            >
              <CheckCheck size={13} />
              Mark all read
            </button>
          )}
          {compact && (
            <button
              onClick={onViewAll}
              className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors ml-2"
            >
              View All
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {displayNotifs.map((notif) => {
          const config = notifTypeConfig[notif.type] || notifTypeConfig.document;
          const Icon = config.icon;
          return (
            <div
              key={notif.id}
              className={`flex items-start gap-3 px-5 lg:px-6 py-3.5 transition-colors cursor-pointer hover:bg-slate-50/50 ${
                !notif.read ? 'bg-emerald-50/30' : ''
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className={`w-9 h-9 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon size={16} className={config.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[13px] font-medium leading-snug ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{formatDate(notif.date)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {displayNotifs.length === 0 && (
        <div className="text-center py-8 px-4">
          <Bell size={28} className="text-slate-300 mx-auto mb-2" />
          <p className="text-[13px] text-slate-400">No notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
