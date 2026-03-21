import React from 'react';
import {
  DollarSign,
  Briefcase,
  TrendingUp,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  investments,
  documents,
  formatCurrency,
  getTotalInvested,
  getActiveDealsCount,
  getTotalDistributions,
} from '@/data/investorData';

const StatsCards: React.FC = () => {
  const totalInvested = getTotalInvested();
  const activeDeals = getActiveDealsCount();
  const totalDistributions = getTotalDistributions();
  const totalDocuments = documents.length;

  const stats = [
    {
      label: 'Total Invested',
      value: formatCurrency(totalInvested),
      change: '+$300K this year',
      changeType: 'positive' as const,
      icon: DollarSign,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Active Deals',
      value: activeDeals.toString(),
      change: `${investments.length} total`,
      changeType: 'neutral' as const,
      icon: Briefcase,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Total Distributions',
      value: formatCurrency(totalDistributions),
      change: '+12.4% vs last year',
      changeType: 'positive' as const,
      icon: TrendingUp,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      label: 'Documents',
      value: totalDocuments.toString(),
      change: '3 new this month',
      changeType: 'neutral' as const,
      icon: FileText,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200/80 p-5 lg:p-6 hover:shadow-md hover:border-slate-300/80 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${stat.iconBg} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Icon size={20} className={stat.iconColor} />
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {stat.changeType === 'positive' && (
                  <ArrowUpRight size={14} className="text-emerald-500" />
                )}
                <span
                  className={`text-[12px] font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-emerald-600'
                      : 'text-slate-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
