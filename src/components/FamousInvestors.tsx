import React from 'react';
import type { Wallet } from '../types';
import WalletCard from './WalletCard';

export interface FamousInvestorInfo {
  id: string;
  name: string;
  avatarUrl: string;
  biography: string;
  strategy: string;
  wallet: Wallet;
}

export const famousInvestorsWallets: Wallet[] = [
  {
    id: 'warren-buffett',
    name: "Warren Buffett's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'michael-burry',
    name: "Michael Burry's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ray-dalio',
    name: "Ray Dalio's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'peter-lynch',
    name: "Peter Lynch's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cathie-wood',
    name: "Cathie Wood's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'bill-ackman',
    name: "Bill Ackman's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'howard-marks',
    name: "Howard Marks's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'carl-icahn',
    name: "Carl Icahn's Strategy",
    user_id: 'famous-investors',
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const famousInvestorsData: FamousInvestorInfo[] = [
  {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    avatarUrl: 'https://tse4.mm.bing.net/th?id=OIF.tSbo0kK0CX72zj5%2fGhOAig&pid=Api',
    biography: 'Warren Buffett, known as the "Oracle of Omaha," is one of the most successful investors of all time. As the CEO of Berkshire Hathaway, he has amassed a fortune through value investing and long-term holdings in quality companies.',
    strategy: 'Value investing with a focus on companies with strong fundamentals, good management, and competitive advantages. Prefers to buy great companies at fair prices rather than fair companies at great prices.',
    wallet: famousInvestorsWallets.find(w => w.id === 'warren-buffett')!
  },
  {
    id: 'michael-burry',
    name: 'Michael Burry',
    avatarUrl: 'https://tse2.mm.bing.net/th?id=OIP.Tt0KG3s-38T-jgTl5UYmSAHaE7&pid=Api',
    biography: 'Michael Burry is known for his contrarian investment style and for predicting the 2008 financial crisis. He founded Scion Capital and was featured in "The Big Short."',
    strategy: 'Deep value investing with a focus on finding market inefficiencies. Known for making concentrated bets based on extensive research and contrarian viewpoints.',
    wallet: famousInvestorsWallets.find(w => w.id === 'michael-burry')!
  },
  {
    id: 'ray-dalio',
    name: 'Ray Dalio',
    avatarUrl: 'https://tse1.mm.bing.net/th?id=OIP.eE0SQQzmuVBXO15m6y4u8QHaE8&pid=Api',
    biography: 'Ray Dalio is the founder of Bridgewater Associates, the world\'s largest hedge fund. Known for his principles-based approach to life and management, he revolutionized investment strategy with his "All Weather" portfolio concept.',
    strategy: 'Risk parity and global macro investing. His "All Weather" strategy aims to perform well across different economic environments by balancing risk across asset classes.',
    wallet: famousInvestorsWallets.find(w => w.id === 'ray-dalio')!
  },
  {
    id: 'peter-lynch',
    name: 'Peter Lynch',
    avatarUrl: 'https://tse4.mm.bing.net/th?id=OIP.TjFndixCV1ugWEGWP2Wx6gHaFS&pid=Api',
    biography: 'Peter Lynch is a legendary investor who managed the Magellan Fund at Fidelity Investments between 1977 and 1990. During his tenure, the fund\'s assets grew from $18 million to $14 billion.',
    strategy: 'Invest in what you know and understand the company\'s business model completely. Popularized the concept of "ten-baggers" - investments that increase in value by ten times.',
    wallet: famousInvestorsWallets.find(w => w.id === 'peter-lynch')!
  },
  {
    id: 'cathie-wood',
    name: 'Cathie Wood',
    avatarUrl: 'https://tse2.mm.bing.net/th?id=OIP.pIkav_QpOauElte8cBQe-wHaGN&pid=Api',
    biography: 'Cathie Wood is the founder of ARK Invest, known for her investments in disruptive innovation and emerging technologies.',
    strategy: 'Growth investing focused on disruptive innovation across sectors like AI, genomics, and blockchain. Emphasizes long-term technological trends and societal transformation.',
    wallet: famousInvestorsWallets.find(w => w.id === 'cathie-wood')!
  },
  {
    id: 'bill-ackman',
    name: 'Bill Ackman',
    avatarUrl: 'https://tse4.mm.bing.net/th?id=OIP.eAQJ4ckeEwCCnTxfjNOWkwHaE7&pid=Api',
    biography: 'Bill Ackman is the founder and CEO of Pershing Square Capital Management. Known for his activist investing style, he takes large positions in companies and actively works to influence their operations.',
    strategy: 'Concentrated, value-oriented, and activist investing approach. Focuses on identifying companies with strong fundamentals that could benefit from operational or strategic changes.',
    wallet: famousInvestorsWallets.find(w => w.id === 'bill-ackman')!
  },
  {
    id: 'howard-marks',
    name: 'Howard Marks',
    avatarUrl: 'https://tse1.mm.bing.net/th?id=OIF.o4p4R2WURrHARU8NCRsT2g&pid=Api',
    biography: 'Howard Marks is the co-founder and co-chairman of Oaktree Capital Management. He is renowned for his insightful market commentary and deep understanding of market cycles.',
    strategy: 'Contrarian approach with strong focus on risk management. Specializes in distressed debt investing and believes that understanding market psychology is crucial for investment success.',
    wallet: famousInvestorsWallets.find(w => w.id === 'howard-marks')!
  },
  {
    id: 'carl-icahn',
    name: 'Carl Icahn',
    avatarUrl: 'https://tse3.mm.bing.net/th?id=OIP.JXRyZ51r3ybZ1mFoQmtocwHaJj&pid=Api',
    biography: 'Carl Icahn is a legendary activist investor and founder of Icahn Enterprises. With a career spanning over five decades, he\'s known for taking positions in companies and pushing for changes to increase shareholder value.',
    strategy: 'Activist investing, identifying undervalued companies and advocating for strategic changes such as spin-offs, management changes, or operational improvements to unlock value.',
    wallet: famousInvestorsWallets.find(w => w.id === 'carl-icahn')!
  }
];

const FamousInvestors: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {famousInvestorsData.map((investor) => (
        <WalletCard key={investor.id} investor={investor} />
      ))}
    </div>
  );
};

export default FamousInvestors;
