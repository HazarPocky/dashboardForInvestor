import React, { useState, useCallback } from 'react';

import { Investment, getUnreadNotificationsCount } from '@/data/investorData';
import Sidebar from './dashboard/Sidebar';
import TopBar from './dashboard/TopBar';
import OverviewPage from './dashboard/OverviewPage';
import InvestmentsPage from './dashboard/InvestmentsPage';
import DocumentsPage from './dashboard/DocumentsPage';
import NotificationsPage from './dashboard/NotificationsPage';
import SettingsPage from './dashboard/SettingsPage';
import HelpPage from './dashboard/HelpPage';
import DealDetailModal from './dashboard/DealDetailModal';

const AppLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Investment | null>(null);
  const [dealModalOpen, setDealModalOpen] = useState(false);

  const unreadCount = getUnreadNotificationsCount();

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDealClick = useCallback((investment: Investment) => {
    setSelectedDeal(investment);
    setDealModalOpen(true);
  }, []);

  const handleCloseDealModal = useCallback(() => {
    setDealModalOpen(false);
    setTimeout(() => setSelectedDeal(null), 200);
  }, []);

  const renderPage = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewPage
            onNavigate={handleSectionChange}
            onDealClick={handleDealClick}
          />
        );
      case 'investments':
        return <InvestmentsPage onDealClick={handleDealClick} />;
      case 'documents':
        return <DocumentsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return (
          <OverviewPage
            onNavigate={handleSectionChange}
            onDealClick={handleDealClick}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <TopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          activeSection={activeSection}
          onNavigate={handleSectionChange}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-[1920px]">
            {renderPage()}
          </div>

          {/* Footer */}
          <footer className="px-4 lg:px-8 py-6 border-t border-slate-200/80 bg-white mt-auto">
            <div className="max-w-[1920px] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-emerald-500 rounded-md flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-[12px] text-slate-500">
                   Hellacious, LLC. All rights reserved.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleSectionChange('help')}
                  className="text-[12px] text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  Support
                </button>
                <span className="text-slate-200">|</span>
                <button className="text-[12px] text-slate-400 hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </button>
                <span className="text-slate-200">|</span>
                <button className="text-[12px] text-slate-400 hover:text-emerald-600 transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Deal Detail Modal */}
      <DealDetailModal
        investment={selectedDeal}
        isOpen={dealModalOpen}
        onClose={handleCloseDealModal}
      />
    </div>
  );
};

export default AppLayout;
