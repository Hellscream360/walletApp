import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../../components/LandingNav';

const Backtesting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <LandingNav />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Testez vos Stratégies avec le Backtesting
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Validez vos stratégies d'investissement sur des données historiques avant d'investir réellement
          </p>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Test Historique Complet</h3>
              <p className="text-gray-300">
                Simulez vos stratégies sur des années de données historiques pour comprendre
                leur comportement dans différentes conditions de marché.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Métriques de Performance</h3>
              <p className="text-gray-300">
                Analysez en détail les performances de vos stratégies avec des métriques
                avancées : rendement, volatilité, ratio de Sharpe, drawdown maximum...
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Optimisation de Stratégie</h3>
              <p className="text-gray-300">
                Affinez vos paramètres grâce à nos outils d'optimisation qui testent
                automatiquement différentes configurations pour trouver la meilleure approche.
              </p>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              {/* Placeholder pour une démo interactive ou une image */}
              <div className="w-full h-full bg-gray-700/50 rounded-lg flex items-center justify-center">
                <i className="fas fa-clock-rotate-left text-6xl text-blue-400"></i>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Données historiques complètes</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Analyse de risque détaillée</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Optimisation automatique</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Rapports personnalisables</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cas d'Utilisation</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-balance-scale text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Rééquilibrage de Portefeuille</h3>
            <p className="text-gray-400">
              Testez différentes stratégies de rééquilibrage pour optimiser vos performances
              tout en minimisant les coûts de transaction.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-chart-pie text-emerald-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Allocation d'Actifs</h3>
            <p className="text-gray-400">
              Évaluez différentes allocations d'actifs pour trouver le meilleur
              compromis entre rendement et risque.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-robot text-purple-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Trading Algorithmique</h3>
            <p className="text-gray-400">
              Développez et testez des stratégies de trading automatisées
              avant de les déployer sur le marché réel.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Tester vos Stratégies ?</h2>
          <p className="text-xl text-gray-200 mb-6">
            Commencez dès maintenant à valider vos stratégies d'investissement
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Essayer Gratuitement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Backtesting;