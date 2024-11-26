import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import WalletCard from '../components/WalletCard';
import WalletForm from '../components/WalletForm';
import type { Wallet } from '../types';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      loadWallets();
    }
  }, [user]);

  const loadWallets = async () => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('userId', user?.id);

    if (!error && data) {
      setWallets(data);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-secondary-900 dark:text-secondary-50 mb-6">
          Smart Wallet Management
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-12">
          Take control of your finances with our powerful wallet tracking platform
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50 mb-3">
              Track Multiple Wallets
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300">
              Manage all your wallets in one place with real-time updates and insights
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50 mb-3">
              Secure & Private
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300">
              Your financial data is encrypted and protected with industry-standard security
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-50 mb-3">
              Smart Analytics
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300">
              Get insights into your spending patterns and financial health
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-50">My Wallets</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          New Wallet
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <WalletCard 
            key={wallet.id} 
            wallet={wallet} 
            onUpdate={loadWallets}
          />
        ))}
      </div>

      {showForm && (
        <WalletForm 
          onClose={() => setShowForm(false)} 
          onSuccess={loadWallets}
        />
      )}
    </div>
  );
}