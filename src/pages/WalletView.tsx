import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Edit2, ChevronDown, ChevronUp, Facebook } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/use-toast';
import type { Wallet } from '../types';
import WalletEdit from '../components/WalletEdit';
import { famousInvestorsWallets, famousInvestorsData } from '../components/FamousInvestors';

ChartJS.register(ArcElement, Tooltip, Legend);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    className="fill-current"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className="fill-none stroke-current"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function WalletView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [investorInfo, setInvestorInfo] = useState<typeof famousInvestorsData[0] | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    const loadWallet = async () => {
      // Check if it's a famous investor's wallet
      const famousWallet = famousInvestorsWallets.find(w => w.id === id);
      if (famousWallet) {
        setWallet(famousWallet);
        // Find investor info directly by wallet id
        const investor = famousInvestorsData.find(i => i.id === id);
        if (investor) {
          setInvestorInfo(investor);
        }
        return;
      }

      // If not a famous wallet, load from database
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading wallet:', error);
        toast({
          title: "Error",
          description: "Failed to load wallet",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (data) {
        setWallet(data);
      }
    };

    loadWallet();
  }, [id, navigate]);

  const handleShare = async (platform?: 'x' | 'facebook') => {
    const shareUrl = window.location.href;
    const shareText = `Check out my investment portfolio "${wallet?.name}" on WalletVision!`;

    if (platform === 'x') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank');
      return;
    }

    if (platform === 'facebook') {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(facebookUrl, '_blank');
      return;
    }

    // Default native share
    const shareData = {
      title: `${wallet?.name} - Portfolio Breakdown`,
      text: shareText,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Success",
          description: "Link copied to clipboard!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error sharing wallet",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this wallet?')) return;

    try {
      const { error } = await supabase
        .from('wallets')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Error deleting wallet",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Wallet deleted successfully",
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting wallet:', error);
      toast({
        title: "Error",
        description: "Failed to delete wallet",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    // Ne pas permettre l'édition des portefeuilles d'investisseurs célèbres
    if (wallet?.user_id === 'famous-investors') {
      toast({
        title: "Error",
        description: "Les portefeuilles des investisseurs célèbres ne peuvent pas être modifiés",
        variant: "destructive",
      });
      return;
    }
    setShowEditModal(true);
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const isCategoryExpanded = (categoryName: string) => {
    return expandedCategories.includes(categoryName);
  };

  if (!wallet) return null;

  const mainChartData = {
    labels: wallet.categories.map(cat => cat.name),
    datasets: [{
      data: wallet.categories.map(cat => cat.percentage),
      backgroundColor: wallet.categories.map(cat => cat.color + 'CC'),
      borderColor: wallet.categories.map(cat => cat.color),
      borderWidth: 2,
      hoverOffset: 15
    }]
  };

  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 14
          },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label;
            const value = context.raw;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '50%'
  };

  const getSubCategoryChartData = (category: any) => ({
    labels: category.subCategories?.map((sub: any) => sub.name) || [],
    datasets: [{
      data: category.subCategories?.map((sub: any) => sub.percentage) || [],
      backgroundColor: category.subCategories?.map((sub: any) => sub.color + 'CC') || [],
      borderColor: category.subCategories?.map((sub: any) => sub.color) || [],
      borderWidth: 1,
      hoverOffset: 8
    }]
  });

  const subChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label;
            const value = context.raw;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '40%'
  };

  const isOwner = user?.id === wallet.user_id;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {wallet && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 mb-8">
          {/* Header avec les actions */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-4 flex-1">
              {investorInfo ? (
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={investorInfo.avatarUrl}
                    alt={investorInfo.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-sky-200 mb-2">
                      {investorInfo.name}
                    </h1>
                    <h2 className="text-xl text-gray-600 dark:text-sky-100">
                      {wallet.name}
                    </h2>
                  </div>
                </div>
              ) : (
                <h1 className="text-4xl font-bold text-gray-900 dark:text-sky-200">
                  {wallet.name}
                </h1>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => handleShare('x')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                title="Share on X"
              >
                <XIcon />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare()}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {isOwner && (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    title="Edit wallet"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    title="Delete wallet"
                  >
                    <CrossIcon />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Informations de l'investisseur */}
          {investorInfo && (
            <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-sky-200 mb-2">
                      Biography
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {investorInfo.biography}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-sky-200 mb-2">
                      Investment Strategy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {investorInfo.strategy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditModal && (
            <WalletEdit
              wallet={wallet}
              onClose={() => setShowEditModal(false)}
              onSuccess={() => {
                setShowEditModal(false);
                loadWallet();
              }}
            />
          )}

          {/* Graphiques et catégories */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-start">
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <div className="w-full h-[400px]">
                <Doughnut
                  data={mainChartData}
                  options={mainChartOptions}
                />
              </div>
            </div>

            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-sky-200">Categories</h2>
              <div className="space-y-4">
                {wallet.categories.map((category) => (
                  <div
                    key={category.name}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-gray-900 dark:text-sky-200">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 dark:text-sky-200">
                          {category.percentage}%
                        </span>
                        {category.subCategories && category.subCategories.length > 0 && (
                          <div className="text-gray-500 dark:text-gray-400">
                            {isCategoryExpanded(category.name) ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </div>
                        )}
                      </div>
                    </button>

                    {category.subCategories && category.subCategories.length > 0 && isCategoryExpanded(category.name) && (
                      <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-[150px]">
                            <Doughnut
                              data={getSubCategoryChartData(category)}
                              options={subChartOptions}
                            />
                          </div>
                          <div className="space-y-2">
                            {category.subCategories.map((sub) => (
                              <div
                                key={sub.name}
                                className="flex items-center justify-between text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: sub.color }}
                                  />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {sub.name}
                                  </span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {sub.percentage}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}