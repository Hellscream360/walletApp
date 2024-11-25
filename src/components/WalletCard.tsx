import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Wallet } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface WalletCardProps {
  wallet: Wallet;
}

export default function WalletCard({ wallet }: WalletCardProps) {
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
    <Link to={`/wallets/${wallet.id}`} className="block">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-sky-200">{wallet.name}</h3>
        </div>
        <div className="w-48 h-48 mx-auto">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {wallet.categories.map((category) => (
            <div key={category.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-gray-600 dark:text-sky-300">
                {category.name} ({category.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}