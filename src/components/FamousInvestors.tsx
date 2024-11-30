import React from 'react';
import type { Wallet } from '../types';
import WalletCard from './WalletCard';

export const famousInvestorsWallets: Wallet[] = [
  {
    id: 'warren-buffett',
    name: "Warren Buffett's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Actions US',
        percentage: 85,
        color: '#4F46E5',
        subCategories: [
          { name: 'AAPL - Apple Inc.', percentage: 45, color: '#818CF8' },
          { name: 'BAC - Bank of America', percentage: 30, color: '#6366F1' },
          { name: 'AXP - American Express', percentage: 25, color: '#A5B4FC' }
        ]
      },
      {
        name: 'Obligations',
        percentage: 15,
        color: '#10B981',
        subCategories: [
          { name: 'T - US Treasury Bonds', percentage: 100, color: '#34D399' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'michael-burry',
    name: "Michael Burry's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Actions US',
        percentage: 60,
        color: '#EC4899',
        subCategories: [
          { name: 'GEO - GEO Group Inc.', percentage: 40, color: '#F472B6' },
          { name: 'CXW - CoreCivic Inc.', percentage: 35, color: '#FB7185' },
          { name: 'AAPL - Apple Inc. (Short)', percentage: 25, color: '#FDA4AF' }
        ]
      },
      {
        name: 'Actions Internationales',
        percentage: 40,
        color: '#8B5CF6',
        subCategories: [
          { name: 'BABA - Alibaba Group', percentage: 60, color: '#A78BFA' },
          { name: 'JD - JD.com Inc.', percentage: 40, color: '#C4B5FD' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ray-dalio',
    name: "Ray Dalio's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'ETFs',
        percentage: 40,
        color: '#3B82F6',
        subCategories: [
          { name: 'VWO - Vanguard Emerging Markets', percentage: 45, color: '#60A5FA' },
          { name: 'SPY - S&P 500 ETF', percentage: 55, color: '#93C5FD' }
        ]
      },
      {
        name: 'Obligations',
        percentage: 35,
        color: '#10B981',
        subCategories: [
          { name: 'TLT - iShares 20+ Year Treasury', percentage: 100, color: '#34D399' }
        ]
      },
      {
        name: 'Matières Premières',
        percentage: 25,
        color: '#F59E0B',
        subCategories: [
          { name: 'GLD - SPDR Gold Trust', percentage: 100, color: '#FBBF24' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'peter-lynch',
    name: "Peter Lynch's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Actions US Small Cap',
        percentage: 45,
        color: '#EC4899',
        subCategories: [
          { name: 'PLCE - Children\'s Place', percentage: 35, color: '#F472B6' },
          { name: 'DKS - Dick\'s Sporting Goods', percentage: 35, color: '#FB7185' },
          { name: 'FIVE - Five Below', percentage: 30, color: '#FDA4AF' }
        ]
      },
      {
        name: 'Actions US Mid Cap',
        percentage: 35,
        color: '#8B5CF6',
        subCategories: [
          { name: 'DLTR - Dollar Tree', percentage: 50, color: '#A78BFA' },
          { name: 'TJX - TJX Companies', percentage: 50, color: '#C4B5FD' }
        ]
      },
      {
        name: 'Actions US Large Cap',
        percentage: 20,
        color: '#F59E0B',
        subCategories: [
          { name: 'WMT - Walmart', percentage: 100, color: '#FBBF24' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cathie-wood',
    name: "Cathie Wood's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Actions Tech US',
        percentage: 50,
        color: '#3B82F6',
        subCategories: [
          { name: 'TSLA - Tesla Inc.', percentage: 40, color: '#60A5FA' },
          { name: 'COIN - Coinbase Global', percentage: 35, color: '#93C5FD' },
          { name: 'SQ - Block Inc.', percentage: 25, color: '#BFDBFE' }
        ]
      },
      {
        name: 'Actions Biotech',
        percentage: 30,
        color: '#10B981',
        subCategories: [
          { name: 'CRSP - CRISPR Therapeutics', percentage: 60, color: '#34D399' },
          { name: 'NTLA - Intellia Therapeutics', percentage: 40, color: '#6EE7B7' }
        ]
      },
      {
        name: 'Actions Aérospatiales',
        percentage: 20,
        color: '#6366F1',
        subCategories: [
          { name: 'RKLB - Rocket Lab USA', percentage: 100, color: '#818CF8' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'bill-ackman',
    name: "Bill Ackman's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Actions US Large Cap',
        percentage: 70,
        color: '#EC4899',
        subCategories: [
          { name: 'CMG - Chipotle Mexican Grill', percentage: 35, color: '#F472B6' },
          { name: 'HLT - Hilton Worldwide', percentage: 35, color: '#FB7185' },
          { name: 'LOW - Lowe\'s Companies', percentage: 30, color: '#FDA4AF' }
        ]
      },
      {
        name: 'REIT',
        percentage: 30,
        color: '#8B5CF6',
        subCategories: [
          { name: 'HHC - Howard Hughes Corp', percentage: 100, color: '#A78BFA' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'howard-marks',
    name: "Howard Marks's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Obligations Corporate',
        percentage: 40,
        color: '#3B82F6',
        subCategories: [
          { name: 'HYG - High Yield Corp Bond ETF', percentage: 60, color: '#60A5FA' },
          { name: 'LQD - Investment Grade Corp Bond ETF', percentage: 40, color: '#93C5FD' }
        ]
      },
      {
        name: 'Obligations Distressed',
        percentage: 35,
        color: '#10B981',
        subCategories: [
          { name: 'EMB - Emerging Markets Bond ETF', percentage: 65, color: '#34D399' },
          { name: 'MHY - High Yield Muni Bond ETF', percentage: 35, color: '#6EE7B7' }
        ]
      },
      {
        name: 'Actions Spéciales',
        percentage: 25,
        color: '#6366F1',
        subCategories: [
          { name: 'ABNB - Airbnb (IPO)', percentage: 55, color: '#818CF8' },
          { name: 'RIVN - Rivian (Post-IPO)', percentage: 45, color: '#A5B4FC' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'carl-icahn',
    name: "Carl Icahn's Strategy",
    userId: 'famous-investors',
    categories: [
      {
        name: 'Actions US Large Cap',
        percentage: 50,
        color: '#EC4899',
        subCategories: [
          { name: 'CVX - Chevron Corporation', percentage: 40, color: '#F472B6' },
          { name: 'OXY - Occidental Petroleum', percentage: 35, color: '#FB7185' },
          { name: 'NFLX - Netflix (Short)', percentage: 25, color: '#FDA4AF' }
        ]
      },
      {
        name: 'Actions Tech',
        percentage: 30,
        color: '#8B5CF6',
        subCategories: [
          { name: 'DELL - Dell Technologies', percentage: 60, color: '#A78BFA' },
          { name: 'HPQ - HP Inc.', percentage: 40, color: '#C4B5FD' }
        ]
      },
      {
        name: 'Actions Biotech',
        percentage: 20,
        color: '#F59E0B',
        subCategories: [
          { name: 'BIIB - Biogen Inc.', percentage: 100, color: '#FBBF24' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const FamousInvestors: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {famousInvestorsWallets.map((wallet) => (
        <WalletCard key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
};

export default FamousInvestors;
