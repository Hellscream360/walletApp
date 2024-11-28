import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import WaveBackground from '../components/WaveBackground';
import GlowingCard from '../components/GlowingCard';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <LandingNav />

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Nos Offres
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Choisissez le plan qui correspond le mieux à vos besoins
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {/* Free Plan */}
            <GlowingCard 
              className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-colors flex flex-col"
              glowColor="rgba(59, 130, 246, 0.5)" // Blue glow
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Gratuit</h3>
                <p className="text-4xl font-bold mb-6">0€<span className="text-lg text-gray-400">/mois</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    Suivi de 3 portefeuilles
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    Visualisations de base
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    Accès communauté limité
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/signup')}
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Commencer
                </button>
              </div>
            </GlowingCard>

            {/* Pro Plan */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm whitespace-nowrap">
                  Plus populaire
                </span>
              </div>
              <GlowingCard 
                className="bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-blue-500 transform scale-105 flex flex-col h-full"
                glowColor="rgba(59, 130, 246, 0.5)" // Blue glow
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Pro</h3>
                  <p className="text-4xl font-bold mb-6">19€<span className="text-lg text-gray-400">/mois</span></p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-400 mr-2"></i>
                      Portefeuilles illimités
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-400 mr-2"></i>
                      Visualisations avancées
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-400 mr-2"></i>
                      Backtesting illimité
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-400 mr-2"></i>
                      Accès communauté complet
                    </li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <button 
                    onClick={() => navigate('/signup')}
                    className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Essai gratuit 14 jours
                  </button>
                </div>
              </GlowingCard>
            </div>

            {/* Enterprise Plan */}
            <GlowingCard 
              className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-colors flex flex-col"
              glowColor="rgba(59, 130, 246, 0.5)" // Blue glow
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-6">49€<span className="text-lg text-gray-400">/mois</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    Tout dans Pro
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    API dédiée
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    Support prioritaire
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-emerald-400 mr-2"></i>
                    Stratégies IA personnalisées
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Nous contacter
                </button>
              </div>
            </GlowingCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
