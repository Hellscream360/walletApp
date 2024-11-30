import React from 'react';
import type { Wallet } from '../types';
import WalletCard from './WalletCard';

export const suggestedStrategies: Wallet[] = [
  {
    id: 'conservative-strategy',
    name: "Conservative Strategy",
    userId: 'suggested-strategies',
    categories: [
      {
        name: 'Obligations',
        percentage: 55,
        color: '#3B82F6',
        subCategories: [
          { name: 'AGG - iShares Core US Aggregate Bond', percentage: 40, color: '#60A5FA' },
          { name: 'GOVT - iShares US Treasury Bond', percentage: 35, color: '#93C5FD' },
          { name: 'MUB - iShares National Muni Bond', percentage: 25, color: '#BFDBFE' }
        ]
      },
      {
        name: 'Actions US',
        percentage: 25,
        color: '#10B981',
        subCategories: [
          { name: 'VIG - Vanguard Dividend Appreciation', percentage: 50, color: '#34D399' },
          { name: 'NOBL - ProShares S&P 500 Dividend Aristocrats', percentage: 50, color: '#6EE7B7' }
        ]
      },
      {
        name: 'Matières Premières',
        percentage: 15,
        color: '#F59E0B',
        subCategories: [
          { name: 'GLD - SPDR Gold Trust', percentage: 100, color: '#FBBF24' }
        ]
      },
      {
        name: 'Cryptomonnaies',
        percentage: 5,
        color: '#8B5CF6',
        subCategories: [
          { name: 'BTC - Bitcoin', percentage: 100, color: '#A78BFA' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'balanced-strategy',
    name: "Balanced Strategy",
    userId: 'suggested-strategies',
    categories: [
      {
        name: 'Actions US',
        percentage: 40,
        color: '#3B82F6',
        subCategories: [
          { name: 'VOO - Vanguard S&P 500', percentage: 40, color: '#60A5FA' },
          { name: 'VGT - Vanguard Information Technology', percentage: 35, color: '#93C5FD' },
          { name: 'VHT - Vanguard Healthcare', percentage: 25, color: '#BFDBFE' }
        ]
      },
      {
        name: 'Obligations',
        percentage: 30,
        color: '#10B981',
        subCategories: [
          { name: 'BND - Vanguard Total Bond Market', percentage: 60, color: '#34D399' },
          { name: 'VCIT - Vanguard Intermediate-Term Corporate', percentage: 40, color: '#6EE7B7' }
        ]
      },
      {
        name: 'Actions Internationales',
        percentage: 15,
        color: '#F59E0B',
        subCategories: [
          { name: 'VEA - Vanguard Developed Markets', percentage: 60, color: '#FBBF24' },
          { name: 'VWO - Vanguard Emerging Markets', percentage: 40, color: '#FCD34D' }
        ]
      },
      {
        name: 'Cryptomonnaies',
        percentage: 15,
        color: '#8B5CF6',
        subCategories: [
          { name: 'BTC - Bitcoin', percentage: 60, color: '#A78BFA' },
          { name: 'ETH - Ethereum', percentage: 40, color: '#C4B5FD' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'aggressive-strategy',
    name: "Aggressive Strategy",
    userId: 'suggested-strategies',
    categories: [
      {
        name: 'Actions US',
        percentage: 45,
        color: '#3B82F6',
        subCategories: [
          { name: 'QQQ - Invesco QQQ Trust', percentage: 40, color: '#60A5FA' },
          { name: 'ARKK - ARK Innovation ETF', percentage: 35, color: '#93C5FD' },
          { name: 'VUG - Vanguard Growth ETF', percentage: 25, color: '#BFDBFE' }
        ]
      },
      {
        name: 'Actions Internationales',
        percentage: 25,
        color: '#10B981',
        subCategories: [
          { name: 'KWEB - KraneShares CSI China Internet', percentage: 35, color: '#34D399' },
          { name: 'EWJ - iShares MSCI Japan', percentage: 35, color: '#6EE7B7' },
          { name: 'EIDO - iShares MSCI Indonesia', percentage: 30, color: '#A7F3D0' }
        ]
      },
      {
        name: 'Cryptomonnaies',
        percentage: 30,
        color: '#8B5CF6',
        subCategories: [
          { name: 'BTC - Bitcoin', percentage: 35, color: '#A78BFA' },
          { name: 'ETH - Ethereum', percentage: 30, color: '#C4B5FD' },
          { name: 'SOL - Solana', percentage: 15, color: '#DDD6FE' },
          { name: 'DOT - Polkadot', percentage: 10, color: '#E9D5FF' },
          { name: 'LINK - Chainlink', percentage: 10, color: '#F3E8FF' }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const SuggestedStrategies: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {suggestedStrategies.map((wallet) => (
        <WalletCard key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
};

export default SuggestedStrategies;
