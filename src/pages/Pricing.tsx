import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import WaveBackground from '../components/WaveBackground';
import GlowingCard from '../components/GlowingCard';
import Footer from "../components/Footer";
import GradientBackground from "../components/GradientBackground";

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      <GradientBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <LandingNav />

        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-32 pb-20 text-center">
          <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Tarifs Simples et Transparents
          </h1>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Free Plan */}
            <GlowingCard 
              className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm flex flex-col"
              glowColor="rgba(59, 130, 246, 0.5)" // Blue glow
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Gratuit</h2>
                <div className="text-4xl font-bold mb-2">0€</div>
                <div className="text-gray-400">Pour toujours</div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>1 portefeuille</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Visualisations de base</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Historique 30 jours</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Support communautaire</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors mt-auto"
              >
                Commencer Gratuitement
              </button>
            </GlowingCard>

            {/* Pro Plan */}
            <GlowingCard 
              className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm transform scale-105 flex flex-col border-2 border-emerald-500/30 relative before:absolute before:-z-10 before:inset-0 before:rounded-xl before:border before:border-emerald-500/50 before:p-[2px] before:bg-gradient-to-b before:from-emerald-500/30 before:to-emerald-500/0"
              glowColor="rgba(16, 185, 129, 0.3)" // Emerald glow, plus subtil
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                  Populaire
                </span>
              </div>
              <div className="text-center mb-8 relative">
                <h2 className="text-2xl font-bold mb-4">Pro</h2>
                <div className="text-4xl font-bold mb-2">19€</div>
                <div className="text-gray-400">par mois</div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow relative">
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Portefeuilles illimités</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Visualisations avancées</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Historique illimité</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Backtesting avancé</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Suggestions IA</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg transition-colors mt-auto relative"
              >
                Commencer l'essai gratuit
              </button>
            </GlowingCard>

            {/* Enterprise Plan */}
            <GlowingCard 
              className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm flex flex-col"
              glowColor="rgba(168, 85, 247, 0.5)" // Purple glow
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Entreprise</h2>
                <div className="text-4xl font-bold mb-2">Sur mesure</div>
                <div className="text-gray-400">Contactez-nous</div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Tout du plan Pro</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>API dédiée</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Support dédié 24/7</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Formation personnalisée</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Déploiement sur site</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors mt-auto"
              >
                Contactez-nous
              </button>
            </GlowingCard>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Questions Fréquentes
          </h2>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of investors who are already using our platform to manage their portfolios.
            </p>
          </div>
        </div>

        {/* Footer with more padding */}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
