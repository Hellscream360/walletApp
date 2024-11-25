import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Edit2, Trash2 } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Wallet } from '../types';
import EditWalletForm from '../components/EditWalletForm';

export default function WalletView() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    loadWallet();
  }, [id]);

  const loadWallet = async () => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error('Error loading wallet');
      navigate('/');
      return;
    }

    setWallet(data);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${wallet?.name} - Portfolio Breakdown`,
      text: `Check out my investment portfolio on WalletVision!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Error sharing wallet');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this wallet?')) return;

    const { error } = await supabase
      .from('wallets')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Error deleting wallet');
      return;
    }

    toast.success('Wallet deleted successfully');
    navigate('/');
  };

  if (!wallet) return null;

  const data = {
    labels: wallet.categories.map(cat => cat.name),
    datasets: [{
      data: wallet.categories.map(cat => cat.percentage),
      backgroundColor: wallet.categories.map(cat => cat.color),
      borderWidth: 4,
      borderColor: '#152342'
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '65%'
  };

  const isOwner = user?.id === wallet.userId;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-sky-200">{wallet.name}</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 dark:text-sky-200 dark:hover:text-sky-300 hover:text-gray-900"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
            {isOwner && (
              <>
                <button
                  onClick={() => setShowEditForm(true)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
                >
                  <Edit2 size={20} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                >
                  <Trash2 size={20} />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full max-w-xs mx-auto">
            <Doughnut data={data} options={options} />
          </div>

          <div className="space-y-4">
            {wallet.categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-sky-900 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-gray-900 dark:text-sky-200">{category.name}</span>
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-sky-200">
                  {category.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEditForm && (
        <EditWalletForm
          wallet={wallet}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            loadWallet();
            setShowEditForm(false);
          }}
        />
      )}
    </div>
  );
}