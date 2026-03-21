import React from 'react';
import { Calendar, ArrowRight, TrendingUp, Clock } from 'lucide-react';
import StatsCards from './StatsCards';
import InvestmentCard from './InvestmentCard';
import RecentDocuments from './RecentDocuments';
import NotificationsPanel from './NotificationsPanel';
import {
  investments,
  formatCurrency,
  getTotalInvested,
  Investment,
} from '@/data/investorData';
import { useAuth } from '@/contexts/AuthContext';

interface OverviewPageProps {
  onNavigate: (section: string) => void;
  onDealClick: (investment: Investment) => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate, onDealClick }) => {
  const { profile, user, session } = useAuth();

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Investor';

  // Format last sign in
  const lastSignIn = session?.user?.last_sign_in_at
    ? new Date(session.user.last_sign_in_at).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : 'Just now';

  const previewInvestments = investments
    .filter((inv) => inv.status === 'active')
    .slice(0, 3);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-emerald-500/5 rounded-full translate-y-1/2" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-emerald-400 text-[13px] font-medium mb-1">Welcome back,</p>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                {displayName}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-slate-400 text-[12px]">
                <Clock size={13} />
                <span>Last login: {lastSignIn}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <p className="text-[11px] text-emerald-300 font-medium">Portfolio Value</p>
                <p className="text-xl lg:text-2xl font-bold mt-0.5">
                  {formatCurrency(getTotalInvested())}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => onNavigate('documents')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-[12px] font-medium text-white border border-white/10 transition-all"
            >
              <Calendar size={13} />
              View Tax Documents
            </button>
            <button
              onClick={() => onNavigate('investments')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-[12px] font-medium text-white transition-all"
            >
              <TrendingUp size={13} />
              View All Investments
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Active Investments Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900">Active Investments</h2>
            <p className="text-[12px] text-slate-500 mt-0.5">Your current active positions</p>
          </div>
          <button
            onClick={() => onNavigate('investments')}
            className="flex items-center gap-1 text-[13px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View All
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {previewInvestments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onClick={onDealClick}
            />
          ))}
        </div>
      </div>

      {/* Bottom Grid: Documents + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <RecentDocuments onViewAll={() => onNavigate('documents')} limit={5} />
        </div>
        <div className="lg:col-span-2">
          <NotificationsPanel onViewAll={() => onNavigate('notifications')} compact />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
