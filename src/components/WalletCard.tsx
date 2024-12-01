import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChevronDown, ChevronUp, Edit2, Copy } from 'lucide-react';
import type { Wallet } from '../types';
import WalletEdit from './WalletEdit';
import { useAuth } from '../context/AuthContext';
import { useToast } from './ui/use-toast';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WalletCardProps {
  wallet: Wallet;
  onEdit?: (wallet: Wallet) => void;
  allowCopy?: boolean;
}

export default function WalletCard({ wallet, onEdit, allowCopy }: WalletCardProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleCategory = (categoryName: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setShowEditModal(true);
  };

  // Ensure categories is always an array
  const categories = Array.isArray(wallet.categories) ? wallet.categories : [];

  const data = {
    labels: categories.map(cat => cat.name),
    datasets: [{
      data: categories.map(cat => cat.percentage),
      backgroundColor: categories.map(cat => cat.color),
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '70%'
  };

  return (
    <>
      <Link to={`/wallets/${wallet.id}`} className="block">
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] relative border border-gray-100/20 dark:border-gray-700/30">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-500/5 to-secondary-500/5 dark:from-transparent dark:via-primary-900/10 dark:to-secondary-900/10 rounded-xl"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-50">
                  {wallet.name}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  Last updated: {new Date(wallet.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                {allowCopy && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const newWallet = {
                        ...wallet,
                        id: `copy-${crypto.randomUUID()}`,
                        name: `Copy of ${wallet.name}`,
                        user_id: user?.id,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      };
                      onEdit?.(newWallet);
                    }}
                    className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    aria-label="Copy wallet"
                  >
                    <Copy size={20} />
                  </button>
                )}
                {onEdit && !wallet.user_id?.startsWith('suggested-') && !wallet.user_id?.startsWith('famous-') && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit(wallet);
                    }}
                    className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    aria-label="Edit wallet"
                  >
                    <Edit2 size={20} />
                  </button>
                )}
              </div>
            </div>
            <div className="w-48 h-48 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-full"></div>
              <Doughnut data={data} options={options} />
            </div>
            <div className="mt-6 space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-50/50 dark:hover:bg-secondary-700/30 transition-colors cursor-pointer backdrop-blur-sm"
                    onClick={(e) => toggleCategory(category.name, e)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2 shadow-sm"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-secondary-700 dark:text-secondary-200">
                        {category.name} ({category.percentage}%)
                      </span>
                    </div>
                    {category.subCategories && category.subCategories.length > 0 && (
                      <button className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200">
                        {expandedCategories.includes(category.name) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                  </div>

                  {expandedCategories.includes(category.name) && category.subCategories && (
                    <div className="ml-6 space-y-1">
                      {category.subCategories.map(subCat => (
                        <div 
                          key={subCat.name}
                          className="flex items-center p-2 rounded-lg hover:bg-secondary-50/50 dark:hover:bg-secondary-700/30 transition-colors backdrop-blur-sm"
                        >
                          <div 
                            className="w-2 h-2 rounded-full mr-2 shadow-sm"
                            style={{ backgroundColor: subCat.color }}
                          />
                          <span className="text-sm text-secondary-600 dark:text-secondary-300">
                            {subCat.name} ({subCat.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {showEditModal && (
        <WalletEdit
          wallet={wallet}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onEdit?.(wallet);
          }}
        />
      )}
    </>
  );
}