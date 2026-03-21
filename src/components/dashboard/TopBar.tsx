import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { getUnreadNotificationsCount, notifications, formatDate } from '@/data/investorData';
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  onMenuToggle: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sectionTitles: Record<string, string> = {
  overview: 'Dashboard',
  investments: 'Investments',
  documents: 'Documents',
  notifications: 'Notifications',
  settings: 'Settings',
  help: 'Help & Support',
};

const TopBar: React.FC<TopBarProps> = ({ onMenuToggle, activeSection, onNavigate }) => {
  const { profile, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const unreadCount = getUnreadNotificationsCount();

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const shortName = displayName.split(' ').length > 1
    ? `${displayName.split(' ')[0]} ${displayName.split(' ').slice(-1)[0][0]}.`
    : displayName;
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          <div>
            <h2 className="text-[16px] font-semibold text-slate-900">
              {sectionTitles[activeSection] || 'Dashboard'}
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div ref={searchRef} className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-48 sm:w-64 pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X size={16} className="text-slate-400" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Search size={18} className="text-slate-500" />
              </button>
            )}
          </div>

          {/* Notifications bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors relative"
            >
              <Bell size={18} className="text-slate-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-slide-in">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-slate-900">Notifications</p>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                        !notif.read ? 'bg-emerald-50/30' : ''
                      }`}
                      onClick={() => {
                        setNotifOpen(false);
                        onNavigate('notifications');
                      }}
                    >
                      <div className="flex items-start gap-2">
                        {!notif.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                        )}
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium text-slate-900 truncate">{notif.title}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{formatDate(notif.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                      onNavigate('notifications');
                    }}
                    className="w-full text-center text-[12px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="hidden sm:flex items-center gap-2 ml-1 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[11px] font-semibold">
              {initials}
            </div>
            <span className="text-[13px] font-medium text-slate-700 hidden md:inline">{shortName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
