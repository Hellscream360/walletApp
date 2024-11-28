import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../components/LandingNav';
import ParticlesBackground from '../components/ParticlesBackground';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Logo and Navigation */}
        <LandingNav />

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Votre Assistant Intelligent d'Investissement
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Optimisez vos investissements avec l'intelligence artificielle et prenez le contrôle de votre avenir financier
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Commencer Gratuitement
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Se Connecter
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visualisation Intelligente</h3>
              <p className="text-gray-400">
                Explorez vos investissements à travers des graphiques interactifs et prenez des décisions éclairées grâce à nos outils d'analyse avancés.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-clock-rotate-left text-emerald-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Backtesting Précis</h3>
              <p className="text-gray-400">
                Testez vos stratégies sur des données historiques et optimisez votre approche avant d'investir réellement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-share-nodes text-purple-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Communauté d'Investisseurs</h3>
              <p className="text-gray-400">
                Partagez vos stratégies gagnantes et inspirez-vous des meilleurs investisseurs de notre communauté.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-robot text-red-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">IA Personnalisée</h3>
              <p className="text-gray-400">
                Notre IA analyse votre profil et crée des stratégies sur mesure adaptées à votre appétence au risque.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-gauge-high text-yellow-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Suivi en Temps Réel</h3>
              <p className="text-gray-400">
                Surveillez les performances de vos portefeuilles en temps réel et recevez des alertes personnalisées.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-bell text-pink-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Alertes Intelligentes</h3>
              <p className="text-gray-400">
                Restez informé des mouvements importants du marché avec nos notifications en temps réel.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Choisissez votre Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Gratuit</h3>
                <div className="text-4xl font-bold mb-4">0€<span className="text-lg font-normal">/mois</span></div>
                <div className="text-gray-400 mb-8">Pour démarrer</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>1 portefeuille</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Visualisation de base</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Backtesting limité</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/signup')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Commencer Gratuitement
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-8 rounded-xl transform hover:scale-105 transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="text-4xl font-bold mb-4">19€<span className="text-lg font-normal">/mois</span></div>
                <div className="text-gray-200 mb-8">Pour les investisseurs actifs</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-400 mr-2"></i>
                  <span>Portefeuilles illimités</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-400 mr-2"></i>
                  <span>Visualisations avancées</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-400 mr-2"></i>
                  <span>Backtesting illimité</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-400 mr-2"></i>
                  <span>Suggestions IA personnalisées</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-400 mr-2"></i>
                  <span>Alertes en temps réel</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/signup?plan=pro')}
                className="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-700/50 transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-bold mb-4">49€<span className="text-lg font-normal">/mois</span></div>
                <div className="text-gray-400 mb-8">Pour les équipes</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Tout dans Pro</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>API personnalisée</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Rapports personnalisés</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-emerald-500 mr-2"></i>
                  <span>Formation dédiée</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Contactez-nous
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Optimiser vos Investissements ?</h2>
            <p className="text-xl text-gray-200 mb-6">
              Rejoignez des milliers d'investisseurs qui ont déjà transformé leur approche de l'investissement
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Créer un Compte Gratuit
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-400">Utilisateurs Actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">€2M+</div>
              <div className="text-gray-400">Wallets Générés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-400">Satisfaction Client</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">24/7</div>
              <div className="text-gray-400">Support Client</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
