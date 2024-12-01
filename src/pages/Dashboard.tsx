import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import WalletCard from '../components/WalletCard';
import WalletForm from '../components/WalletForm';
import FamousInvestors from '../components/FamousInvestors';
import { famousInvestorsWallets } from '../components/FamousInvestors';
import { suggestedStrategies } from '../components/SuggestedStrategies';
import type { Wallet } from '../types';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/use-toast';
import { Toaster } from '../components/ui/toaster';

export default function Dashboard() {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadWallets();
    }
  }, [user]);

  const loadWallets = async () => {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      
      // Ensure categories is always an array
      const formattedData = (data || []).map(wallet => ({
        ...wallet,
        categories: Array.isArray(wallet.categories) ? wallet.categories : []
      }));
      
      setWallets(formattedData);
    } catch (error) {
      console.error('Error loading wallets:', error);
      toast({
        title: "Error",
        description: "Failed to load wallets",
        variant: "destructive",
      });
    }
  };

  const handleEditWallet = async (wallet: Wallet) => {
    try {
      if (wallet.id.startsWith('copy-')) {
        // C'est une copie, on doit la créer dans la base de données
        const { data: newWallet, error } = await supabase
          .from('wallets')
          .insert({
            name: wallet.name,
            user_id: user?.id,
            categories: wallet.categories,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Portfolio copied successfully!",
          variant: "default",
        });
        
        // Recharger la liste des wallets
        loadWallets();
      } else {
        // C'est une édition normale, ouvrir le modal d'édition
        setEditingWallet(wallet);
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error handling wallet:', error);
      toast({
        title: "Error",
        description: "Failed to handle wallet operation",
        variant: "destructive",
      });
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
            href="/signup"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Section Portefeuilles Personnels */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl blur-xl"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                Personal Wallets
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-all hover:scale-105 shadow-lg hover:shadow-primary-500/20"
              >
                <Plus size={20} />
                New Wallet
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <WalletCard key={wallet.id} wallet={wallet} onEdit={handleEditWallet} />
              ))}
              {/* <NewWalletCard /> */}
            </div>
          </div>
        </div>

        {/* Section Stratégies Suggérées */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 dark:from-secondary-900/20 dark:to-primary-900/20 rounded-3xl blur-xl"></div>
          <div className="relative">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-secondary-500 to-primary-500 rounded-full"></span>
                Suggested Strategies For You
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedStrategies.map((wallet) => (
                <WalletCard 
                  key={wallet.id} 
                  wallet={wallet} 
                  onEdit={handleEditWallet}
                  allowCopy={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section Investisseurs Célèbres */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl blur-xl"></div>
          <div className="relative">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                Famous Investors' Strategies
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {famousInvestorsWallets.map((wallet) => (
                <WalletCard 
                  key={wallet.id} 
                  wallet={wallet} 
                  onEdit={handleEditWallet}
                  allowCopy={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <WalletForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            loadWallets();
            setShowForm(false);
          }}
          editingWallet={editingWallet}
        />
      )}
      <Toaster />
    </div>
  );
}