import React, { useState, useMemo } from 'react';
import { Download, FileText, Search, Filter, ChevronDown, X } from 'lucide-react';
import { documents, Document, formatDate } from '@/data/investorData';
import { toast } from '@/components/ui/use-toast';

const docTypeColors: Record<string, { bg: string; text: string; icon: string }> = {
  'K-1': { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' },
  Report: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500' },
  Update: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500' },
  Statement: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500' },
};

const DocumentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredDocs = useMemo(() => {
    let filtered = [...documents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query) ||
          doc.dealName.toLowerCase().includes(query) ||
          doc.type.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((doc) => doc.type === typeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.uploadDate).getTime();
      const dateB = new Date(b.uploadDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [searchQuery, typeFilter, sortOrder]);

  const handleDownload = (doc: Document) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${doc.name} (${doc.fileSize})`,
    });
  };

  const handleDownloadAll = () => {
    toast({
      title: 'Bulk Download Started',
      description: `Preparing ${filteredDocs.length} documents for download...`,
    });
  };

  const docTypes = ['all', 'K-1', 'Report', 'Update', 'Statement'];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Documents</h2>
        <p className="text-[13px] text-slate-500 mt-1">
          Access and download all your investment documents, tax forms, and reports.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white cursor-pointer"
              >
                {docTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <button
              onClick={handleDownloadAll}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-medium transition-colors"
            >
              <Download size={14} />
              Download All
            </button>
          </div>
        </div>

        {/* Active filters */}
        {(searchQuery || typeFilter !== 'all') && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Active filters:</span>
            {searchQuery && (
              <span className="flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X size={11} className="text-slate-400 hover:text-slate-600" />
                </button>
              </span>
            )}
            {typeFilter !== 'all' && (
              <span className="flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                {typeFilter}
                <button onClick={() => setTypeFilter('all')}>
                  <X size={11} className="text-slate-400 hover:text-slate-600" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
              }}
              className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] text-slate-500">
          Showing {filteredDocs.length} of {documents.length} documents
        </p>
        <button
          onClick={handleDownloadAll}
          className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[12px] font-medium transition-colors"
        >
          <Download size={13} />
          Download All
        </button>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
        {filteredDocs.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {filteredDocs.map((doc) => {
              const colors = docTypeColors[doc.type] || docTypeColors.Report;
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between px-5 lg:px-6 py-4 hover:bg-slate-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <FileText size={18} className={colors.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-slate-900 truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[12px] text-slate-500 truncate">{doc.dealName}</span>
                        <span className="text-slate-200 hidden sm:inline">|</span>
                        <span className="text-[12px] text-slate-400 hidden sm:inline">{formatDate(doc.uploadDate)}</span>
                        <span className="text-slate-200 hidden sm:inline">|</span>
                        <span className="text-[12px] text-slate-400 hidden sm:inline">{doc.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${colors.bg} ${colors.text} hidden md:inline-block`}>
                      {doc.type}
                    </span>
                    <span className="text-[12px] text-slate-400 hidden lg:inline">{doc.fileType}</span>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-emerald-500 text-slate-600 hover:text-white transition-all text-[12px] font-medium"
                    >
                      <Download size={14} />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search size={36} className="text-slate-300 mx-auto mb-3" />
            <p className="text-[14px] font-medium text-slate-500">No documents found</p>
            <p className="text-[12px] text-slate-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
