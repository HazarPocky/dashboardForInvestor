export interface Investment {
  id: string;
  dealName: string;
  description: string;
  investmentAmount: number;
  status: 'active' | 'realized' | 'pending';
  investmentDate: string;
  sector: string;
  irr?: number;
  multiple?: number;
  distributionsToDate: number;
}

export interface Document {
  id: string;
  name: string;
  type: 'K-1' | 'Report' | 'Update' | 'Statement';
  dealName: string;
  dealId: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'XLSX' | 'DOCX';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'document' | 'deal' | 'account' | 'report';
}

export const investorProfile = {
  name: 'James Richardson',
  email: 'j.richardson@email.com',
  memberSince: 'January 2021',
  lastLogin: 'March 20, 2026 at 4:32 PM',
  accountStatus: 'Active',
};

export const investments: Investment[] = [
  {
    id: 'deal-001',
    dealName: 'Meridian Industrial Fund III',
    description: 'Diversified industrial real estate portfolio across the Midwest and Southeast regions, targeting value-add warehouse and logistics properties.',
    investmentAmount: 250000,
    status: 'active',
    investmentDate: '2023-03-15',
    sector: 'Industrial',
    irr: 14.2,
    multiple: 1.3,
    distributionsToDate: 37500,
  },
  {
    id: 'deal-002',
    dealName: 'Summit Healthcare Partners II',
    description: 'Healthcare-focused private equity fund investing in specialty physician practices and outpatient surgical centers.',
    investmentAmount: 500000,
    status: 'active',
    investmentDate: '2022-09-01',
    sector: 'Healthcare',
    irr: 18.7,
    multiple: 1.5,
    distributionsToDate: 125000,
  },
  {
    id: 'deal-003',
    dealName: 'Cascade Technology Ventures',
    description: 'Growth equity fund focused on B2B SaaS companies with $10M–$50M ARR in the enterprise software space.',
    investmentAmount: 150000,
    status: 'active',
    investmentDate: '2024-01-10',
    sector: 'Technology',
    irr: 22.1,
    multiple: 1.2,
    distributionsToDate: 0,
  },
  {
    id: 'deal-004',
    dealName: 'Pinnacle Multifamily Fund I',
    description: 'Class B multifamily acquisition fund targeting Sun Belt markets with strong population growth and employment trends.',
    investmentAmount: 350000,
    status: 'realized',
    investmentDate: '2021-06-20',
    sector: 'Real Estate',
    irr: 21.4,
    multiple: 1.8,
    distributionsToDate: 630000,
  },
  {
    id: 'deal-005',
    dealName: 'Atlas Infrastructure Income',
    description: 'Infrastructure debt fund providing senior secured loans to mid-market infrastructure projects across North America.',
    investmentAmount: 200000,
    status: 'active',
    investmentDate: '2023-11-05',
    sector: 'Infrastructure',
    irr: 11.8,
    multiple: 1.1,
    distributionsToDate: 18000,
  },
  {
    id: 'deal-006',
    dealName: 'Vanguard Consumer Growth Fund',
    description: 'Consumer-focused buyout fund targeting premium brands in health, wellness, and sustainable consumer products.',
    investmentAmount: 175000,
    status: 'active',
    investmentDate: '2024-05-12',
    sector: 'Consumer',
    irr: 16.3,
    multiple: 1.15,
    distributionsToDate: 8750,
  },
  {
    id: 'deal-007',
    dealName: 'Horizon Energy Transition Fund',
    description: 'Clean energy private equity fund investing in solar, wind, and battery storage projects with long-term contracted revenue.',
    investmentAmount: 300000,
    status: 'active',
    investmentDate: '2023-07-22',
    sector: 'Energy',
    irr: 13.5,
    multiple: 1.2,
    distributionsToDate: 36000,
  },
  {
    id: 'deal-008',
    dealName: 'Sterling Hospitality Partners',
    description: 'Boutique hospitality fund acquiring and repositioning select-service hotels in top 25 U.S. metro markets.',
    investmentAmount: 100000,
    status: 'pending',
    investmentDate: '2025-12-01',
    sector: 'Hospitality',
    distributionsToDate: 0,
  },
];

export const documents: Document[] = [
  {
    id: 'doc-001',
    name: '2025 K-1 Tax Form',
    type: 'K-1',
    dealName: 'Meridian Industrial Fund III',
    dealId: 'deal-001',
    uploadDate: '2026-03-15',
    fileSize: '245 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-002',
    name: 'Q4 2025 Investor Report',
    type: 'Report',
    dealName: 'Summit Healthcare Partners II',
    dealId: 'deal-002',
    uploadDate: '2026-03-10',
    fileSize: '1.2 MB',
    fileType: 'PDF',
  },
  {
    id: 'doc-003',
    name: 'Q4 2025 Deal Update',
    type: 'Update',
    dealName: 'Cascade Technology Ventures',
    dealId: 'deal-003',
    uploadDate: '2026-03-08',
    fileSize: '890 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-004',
    name: '2025 K-1 Tax Form',
    type: 'K-1',
    dealName: 'Summit Healthcare Partners II',
    dealId: 'deal-002',
    uploadDate: '2026-03-05',
    fileSize: '312 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-005',
    name: 'Final Distribution Statement',
    type: 'Statement',
    dealName: 'Pinnacle Multifamily Fund I',
    dealId: 'deal-004',
    uploadDate: '2026-02-28',
    fileSize: '156 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-006',
    name: 'Q4 2025 Investor Report',
    type: 'Report',
    dealName: 'Meridian Industrial Fund III',
    dealId: 'deal-001',
    uploadDate: '2026-02-20',
    fileSize: '2.1 MB',
    fileType: 'PDF',
  },
  {
    id: 'doc-007',
    name: '2025 K-1 Tax Form',
    type: 'K-1',
    dealName: 'Atlas Infrastructure Income',
    dealId: 'deal-005',
    uploadDate: '2026-02-15',
    fileSize: '198 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-008',
    name: 'Annual Performance Summary',
    type: 'Report',
    dealName: 'Vanguard Consumer Growth Fund',
    dealId: 'deal-006',
    uploadDate: '2026-02-10',
    fileSize: '1.5 MB',
    fileType: 'PDF',
  },
  {
    id: 'doc-009',
    name: 'Capital Call Notice',
    type: 'Update',
    dealName: 'Sterling Hospitality Partners',
    dealId: 'deal-008',
    uploadDate: '2026-01-28',
    fileSize: '89 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-010',
    name: 'Q3 2025 Investor Report',
    type: 'Report',
    dealName: 'Horizon Energy Transition Fund',
    dealId: 'deal-007',
    uploadDate: '2026-01-15',
    fileSize: '1.8 MB',
    fileType: 'PDF',
  },
  {
    id: 'doc-011',
    name: '2025 K-1 Tax Form',
    type: 'K-1',
    dealName: 'Horizon Energy Transition Fund',
    dealId: 'deal-007',
    uploadDate: '2026-03-12',
    fileSize: '267 KB',
    fileType: 'PDF',
  },
  {
    id: 'doc-012',
    name: '2025 K-1 Tax Form',
    type: 'K-1',
    dealName: 'Vanguard Consumer Growth Fund',
    dealId: 'deal-006',
    uploadDate: '2026-03-14',
    fileSize: '221 KB',
    fileType: 'PDF',
  },
];

export const notifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'New K-1 Available',
    message: 'Your 2025 K-1 tax form for Meridian Industrial Fund III has been uploaded and is ready for download.',
    date: '2026-03-15',
    read: false,
    type: 'document',
  },
  {
    id: 'notif-002',
    title: 'Quarterly Report Published',
    message: 'The Q4 2025 Investor Report for Summit Healthcare Partners II is now available in your documents.',
    date: '2026-03-10',
    read: false,
    type: 'report',
  },
  {
    id: 'notif-003',
    title: 'Deal Update',
    message: 'Cascade Technology Ventures has posted a new deal update with Q4 performance metrics.',
    date: '2026-03-08',
    read: true,
    type: 'deal',
  },
  {
    id: 'notif-004',
    title: 'New K-1 Available',
    message: 'Your 2025 K-1 tax form for Summit Healthcare Partners II has been uploaded.',
    date: '2026-03-05',
    read: true,
    type: 'document',
  },
  {
    id: 'notif-005',
    title: 'Distribution Completed',
    message: 'A final distribution of $630,000 has been processed for Pinnacle Multifamily Fund I.',
    date: '2026-02-28',
    read: true,
    type: 'deal',
  },
  {
    id: 'notif-006',
    title: 'New Investment Confirmation',
    message: 'Your commitment to Sterling Hospitality Partners has been confirmed. Capital call notice is available.',
    date: '2026-01-28',
    read: true,
    type: 'account',
  },
];

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTotalInvested = (): number => {
  return investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
};

export const getActiveDealsCount = (): number => {
  return investments.filter((inv) => inv.status === 'active').length;
};

export const getTotalDistributions = (): number => {
  return investments.reduce((sum, inv) => sum + inv.distributionsToDate, 0);
};

export const getDocumentsForDeal = (dealId: string): Document[] => {
  return documents.filter((doc) => doc.dealId === dealId);
};

export const getUnreadNotificationsCount = (): number => {
  return notifications.filter((n) => !n.read).length;
};
