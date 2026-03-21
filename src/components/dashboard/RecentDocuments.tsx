import React from 'react';
import { Download, FileText, ChevronRight, Search } from 'lucide-react';
import { documents, Document, formatDate } from '@/data/investorData';
import { toast } from '@/components/ui/use-toast';

interface RecentDocumentsProps {
  onViewAll: () => void;
  limit?: number;
}

const docTypeColors: Record<string, { bg: string; text: string; icon: string }> = {
  'K-1': { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' },
  Report: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500' },
  Update: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500' },
  Statement: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500' },
};

const RecentDocuments: React.FC<RecentDocumentsProps> = ({ onViewAll, limit = 5 }) => {
  const recentDocs = [...documents]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, limit);

  const handleDownload = (doc: Document) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${doc.name} (${doc.fileSize})`,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
      <div className="px-5 lg:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">Recent Documents</h3>
          <p className="text-[12px] text-slate-500 mt-0.5">Latest files uploaded to your account</p>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="divide-y divide-slate-50">
        {recentDocs.map((doc) => {
          const colors = docTypeColors[doc.type] || docTypeColors.Report;
          return (
            <div
              key={doc.id}
              className="flex items-center justify-between px-5 lg:px-6 py-3.5 hover:bg-slate-50/50 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-9 h-9 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <FileText size={16} className={colors.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-slate-900 truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-400 truncate">{doc.dealName}</span>
                    <span className="text-slate-200 flex-shrink-0">|</span>
                    <span className="text-[11px] text-slate-400 flex-shrink-0">{formatDate(doc.uploadDate)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${colors.bg} ${colors.text} hidden sm:inline-block`}>
                  {doc.type}
                </span>
                <button
                  onClick={() => handleDownload(doc)}
                  className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all"
                  title={`Download ${doc.name}`}
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentDocuments;
