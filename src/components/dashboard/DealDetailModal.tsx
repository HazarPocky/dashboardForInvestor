import React from 'react';
import {
  X,
  Download,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  Building2,
  Stethoscope,
  Monitor,
  Home,
  Landmark,
  ShoppingBag,
  Zap,
  Hotel,
} from 'lucide-react';
import { Investment, Document, formatCurrency, formatDate, getDocumentsForDeal } from '@/data/investorData';
import { toast } from '@/components/ui/use-toast';

interface DealDetailModalProps {
  investment: Investment | null;
  isOpen: boolean;
  onClose: () => void;
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

const docTypeColors: Record<string, { bg: string; text: string; icon: string }> = {
  'K-1': { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' },
  Report: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500' },
  Update: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500' },
  Statement: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500' },
};

const DealDetailModal: React.FC<DealDetailModalProps> = ({ investment, isOpen, onClose }) => {
  if (!isOpen || !investment) return null;

  const docs = getDocumentsForDeal(investment.id);
  const Icon = sectorIcons[investment.sector] || Building2;

  const statusConfig = {
    active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    realized: { label: 'Realized', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    pending: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  };

  const status = statusConfig[investment.status];

  const handleDownload = (doc: Document) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${doc.name} (${doc.fileSize})`,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 sm:pt-16 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-slide-in">
        {/* Header accent */}
        <div className={`h-1.5 w-full ${investment.status === 'active' ? 'bg-emerald-500' : investment.status === 'realized' ? 'bg-blue-500' : 'bg-amber-400'}`} />

        {/* Header */}
        <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {investment.dealName}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[12px] font-medium text-slate-500">{investment.sector}</span>
                  <span className="text-slate-300">|</span>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${status.bg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    <span className={`text-[11px] font-semibold ${status.text}`}>{status.label}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
          {/* Description */}
          <div className="px-6 lg:px-8 py-5 border-b border-slate-100">
            <p className="text-[13px] text-slate-600 leading-relaxed">{investment.description}</p>
          </div>

          {/* Key Metrics */}
          <div className="px-6 lg:px-8 py-5 border-b border-slate-100">
            <h3 className="text-[13px] font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Key Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <DollarSign size={13} className="text-slate-400" />
                  <span className="text-[11px] font-medium text-slate-500">Investment</span>
                </div>
                <p className="text-[17px] font-bold text-slate-900">
                  {formatCurrency(investment.investmentAmount)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingUp size={13} className="text-slate-400" />
                  <span className="text-[11px] font-medium text-slate-500">Net IRR</span>
                </div>
                <p className="text-[17px] font-bold text-emerald-600 flex items-center gap-0.5">
                  {investment.irr ? `${investment.irr}%` : 'N/A'}
                  {investment.irr && <ArrowUpRight size={14} />}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[11px] font-medium text-slate-500 ml-0.5">Multiple</span>
                </div>
                <p className="text-[17px] font-bold text-slate-900">
                  {investment.multiple ? `${investment.multiple}x` : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Calendar size={13} className="text-slate-400" />
                  <span className="text-[11px] font-medium text-slate-500">Invested</span>
                </div>
                <p className="text-[14px] font-bold text-slate-900">
                  {formatDate(investment.investmentDate)}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-emerald-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-emerald-600">Total Distributions to Date</span>
                <p className="text-xl font-bold text-emerald-700 mt-0.5">
                  {formatCurrency(investment.distributionsToDate)}
                </p>
              </div>
              <DollarSign size={28} className="text-emerald-300" />
            </div>
          </div>

          {/* Documents */}
          <div className="px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-semibold text-slate-900 uppercase tracking-wider">
                Documents ({docs.length})
              </h3>
            </div>

            {docs.length > 0 ? (
              <div className="space-y-2">
                {docs.map((doc) => {
                  const docColors = docTypeColors[doc.type] || docTypeColors.Report;
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 ${docColors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <FileText size={16} className={docColors.icon} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-slate-900 truncate">
                            {doc.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${docColors.bg} ${docColors.text}`}>
                              {doc.type}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {formatDate(doc.uploadDate)}
                            </span>
                            <span className="text-[11px] text-slate-400">{doc.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(doc);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-500 text-slate-600 hover:text-white transition-all text-[12px] font-medium flex-shrink-0"
                      >
                        <Download size={13} />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText size={32} className="text-slate-300 mx-auto mb-2" />
                <p className="text-[13px] text-slate-400">No documents available for this deal yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailModal;
