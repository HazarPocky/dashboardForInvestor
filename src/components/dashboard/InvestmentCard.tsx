import React from 'react';
import {
  ArrowUpRight,
  Building2,
  Heart,
  Stethoscope,
  Monitor,
  Home,
  Landmark,
  ShoppingBag,
  Zap,
  Hotel,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Investment, formatCurrency, formatDate, getDocumentsForDeal } from '@/data/investorData';

interface InvestmentCardProps {
  investment: Investment;
  onClick: (investment: Investment) => void;
}

const sectorIcons: Record<string, React.ElementType> = {
  Industrial: Building2,
  Healthcare: Stethoscope,
  Technology: Monitor,
  'Real Estate': Home,
  Infrastructure: Landmark,
  Consumer: ShoppingBag,
  Energy: Zap,
  Hospitality: Hotel,
};

const sectorColors: Record<string, { bg: string; text: string; badge: string }> = {
  Industrial: { bg: 'bg-orange-50', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  Healthcare: { bg: 'bg-rose-50', text: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
  Technology: { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  'Real Estate': { bg: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  Infrastructure: { bg: 'bg-slate-50', text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' },
  Consumer: { bg: 'bg-pink-50', text: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
  Energy: { bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  Hospitality: { bg: 'bg-amber-50', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
};

const statusConfig = {
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  realized: { label: 'Realized', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  pending: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
};

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, onClick }) => {
  const Icon = sectorIcons[investment.sector] || Building2;
  const colors = sectorColors[investment.sector] || sectorColors.Industrial;
  const status = statusConfig[investment.status];
  const docsCount = getDocumentsForDeal(investment.id).length;

  return (
    <button
      onClick={() => onClick(investment)}
      className="w-full text-left bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 group overflow-hidden"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${investment.status === 'active' ? 'bg-emerald-500' : investment.status === 'realized' ? 'bg-blue-500' : 'bg-amber-400'}`} />
      
      <div className="p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 ${colors.bg} rounded-xl flex items-center justify-center`}>
            <Icon size={20} className={colors.text} />
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className={`text-[11px] font-semibold ${status.text}`}>{status.label}</span>
          </div>
        </div>

        {/* Deal info */}
        <h3 className="text-[15px] font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug">
          {investment.dealName}
        </h3>
        <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md ${colors.badge} mb-3`}>
          {investment.sector}
        </span>

        {/* Metrics */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-slate-500 font-medium">Investment</span>
            <span className="text-[14px] font-semibold text-slate-900">
              {formatCurrency(investment.investmentAmount)}
            </span>
          </div>
          {investment.irr !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-slate-500 font-medium">Net IRR</span>
              <span className="text-[14px] font-semibold text-emerald-600 flex items-center gap-0.5">
                {investment.irr}%
                <ArrowUpRight size={12} />
              </span>
            </div>
          )}
          {investment.multiple !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-slate-500 font-medium">Multiple</span>
              <span className="text-[14px] font-semibold text-slate-900">{investment.multiple}x</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-slate-500 font-medium">Distributions</span>
            <span className="text-[14px] font-semibold text-slate-900">
              {formatCurrency(investment.distributionsToDate)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400">
            <FileText size={13} />
            <span className="text-[11px] font-medium">{docsCount} document{docsCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Details</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default InvestmentCard;
