import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { investments, Investment } from '@/data/investorData';
import InvestmentCard from './InvestmentCard';

interface InvestmentsPageProps {
  onDealClick: (investment: Investment) => void;
}

const InvestmentsPage: React.FC<InvestmentsPageProps> = ({ onDealClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const sectors = useMemo(() => {
    const unique = [...new Set(investments.map((inv) => inv.sector))];
    return ['all', ...unique.sort()];
  }, []);

  const filteredInvestments = useMemo(() => {
    let filtered = [...investments];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.dealName.toLowerCase().includes(query) ||
          inv.sector.toLowerCase().includes(query) ||
          inv.description.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((inv) => inv.status === statusFilter);
    }

    // Sector filter
    if (sectorFilter !== 'all') {
      filtered = filtered.filter((inv) => inv.sector === sectorFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.dealName.localeCompare(b.dealName);
        case 'amount-high':
          return b.investmentAmount - a.investmentAmount;
        case 'amount-low':
          return a.investmentAmount - b.investmentAmount;
        case 'date-new':
          return new Date(b.investmentDate).getTime() - new Date(a.investmentDate).getTime();
        case 'date-old':
          return new Date(a.investmentDate).getTime() - new Date(b.investmentDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, sectorFilter, sortBy]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Investments</h2>
        <p className="text-[13px] text-slate-500 mt-1">
          View and manage all your investment positions across our portfolio of funds.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search investments..."
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

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="realized">Realized</option>
                <option value="pending">Pending</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white cursor-pointer"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
                <option value="date-new">Date: Newest</option>
                <option value="date-old">Date: Oldest</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active filters */}
        {(searchQuery || statusFilter !== 'all' || sectorFilter !== 'all') && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 flex-wrap">
            <span className="text-[11px] text-slate-500 font-medium">Active filters:</span>
            {searchQuery && (
              <span className="flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X size={11} className="text-slate-400 hover:text-slate-600" />
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md capitalize">
                {statusFilter}
                <button onClick={() => setStatusFilter('all')}>
                  <X size={11} className="text-slate-400 hover:text-slate-600" />
                </button>
              </span>
            )}
            {sectorFilter !== 'all' && (
              <span className="flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                {sectorFilter}
                <button onClick={() => setSectorFilter('all')}>
                  <X size={11} className="text-slate-400 hover:text-slate-600" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSectorFilter('all');
              }}
              className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-[12px] text-slate-500 mb-4">
        Showing {filteredInvestments.length} of {investments.length} investments
      </p>

      {/* Investment Grid */}
      {filteredInvestments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {filteredInvestments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onClick={onDealClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 text-center py-16">
          <SlidersHorizontal size={36} className="text-slate-300 mx-auto mb-3" />
          <p className="text-[14px] font-medium text-slate-500">No investments match your filters</p>
          <p className="text-[12px] text-slate-400 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentsPage;
