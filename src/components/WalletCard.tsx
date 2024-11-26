import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import type { Wallet } from '../types';
import WalletEdit from './WalletEdit';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WalletCardProps {
  wallet: Wallet;
  onUpdate?: () => void;
}

export default function WalletCard({ wallet, onUpdate }: WalletCardProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
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

  const data = {
    labels: wallet.categories.map(cat => cat.name),
    datasets: [{
      data: wallet.categories.map(cat => cat.percentage),
      backgroundColor: wallet.categories.map(cat => cat.color),
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
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-50">
              {wallet.name}
            </h3>
            <button
              onClick={handleEdit}
              className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700"
            >
              <Edit2 size={18} />
            </button>
          </div>
          <div className="w-48 h-48 mx-auto">
            <Doughnut data={data} options={options} />
          </div>
          <div className="mt-6 space-y-3">
            {wallet.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors cursor-pointer"
                  onClick={(e) => toggleCategory(category.name, e)}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
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
                        className="flex items-center p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                      >
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
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
      </Link>

      {showEditModal && (
        <WalletEdit
          wallet={wallet}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onUpdate?.();
          }}
        />
      )}
    </>
  );
}