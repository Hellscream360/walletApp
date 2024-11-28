import { useNavigate } from "react-router-dom";
import LandingNav from "../components/LandingNav";
import WaveBackground from "../components/WaveBackground";
import GlowingCard from "../components/GlowingCard";

const LandingPage: React.FC = () => {
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

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlowingCard 
              className="bg-gray-800/50 p-6 rounded-xl"
              glowColor="rgba(59, 130, 246, 0.5)" // Blue glow
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-robot text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Stratégies IA</h3>
              <p className="text-gray-400">
                Optimisez vos investissements avec nos algorithmes d'IA avancés qui
                analysent les marchés 24/7.
              </p>
              <button
                onClick={() => navigate("/features/ai-strategies")}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                En savoir plus →
              </button>
            </GlowingCard>

            <GlowingCard 
              className="bg-gray-800/50 p-6 rounded-xl"
              glowColor="rgba(16, 185, 129, 0.5)" // Emerald glow
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-emerald-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Backtesting</h3>
              <p className="text-gray-400">
                Testez vos stratégies sur des données historiques avant de les
                déployer sur les marchés réels.
              </p>
              <button
                onClick={() => navigate("/features/backtesting")}
                className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                En savoir plus →
              </button>
            </GlowingCard>

            <GlowingCard 
              className="bg-gray-800/50 p-6 rounded-xl"
              glowColor="rgba(168, 85, 247, 0.5)" // Purple glow
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-users text-purple-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Communauté</h3>
              <p className="text-gray-400">
                Rejoignez une communauté active d'investisseurs et partagez vos
                stratégies gagnantes.
              </p>
              <button
                onClick={() => navigate("/features/community")}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              >
                En savoir plus →
              </button>
            </GlowingCard>

            <GlowingCard 
              className="bg-gray-800/50 p-6 rounded-xl"
              glowColor="rgba(236, 72, 153, 0.5)" // Pink glow
            >
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-pie text-pink-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Reporting</h3>
              <p className="text-gray-400">
                Générez des rapports détaillés sur vos performances et suivez
                votre progression.
              </p>
              <button
                onClick={() => navigate("/features/reporting")}
                className="mt-4 text-pink-400 hover:text-pink-300 transition-colors"
              >
                En savoir plus →
              </button>
            </GlowingCard>

            <GlowingCard 
              className="bg-gray-800/50 p-6 rounded-xl"
              glowColor="rgba(245, 158, 11, 0.5)" // Amber glow
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-project-diagram text-amber-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Visualisation</h3>
              <p className="text-gray-400">
                Visualisez vos données avec des graphiques interactifs et
                personnalisables.
              </p>
              <button
                onClick={() => navigate("/features/visualization")}
                className="mt-4 text-amber-400 hover:text-amber-300 transition-colors"
              >
                En savoir plus →
              </button>
            </GlowingCard>

            <GlowingCard 
              className="bg-gray-800/50 p-6 rounded-xl"
              glowColor="rgba(239, 68, 68, 0.5)" // Red glow
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-red-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité</h3>
              <p className="text-gray-400">
                Protection de vos données avec un chiffrement de bout en bout
                et authentification forte.
              </p>
              <button
                onClick={() => navigate("/features/security")}
                className="mt-4 text-red-400 hover:text-red-300 transition-colors"
              >
                En savoir plus →
              </button>
            </GlowingCard>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Choisissez votre Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-700/50 transition-all flex flex-col">
              <div>
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
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/signup')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Commencer Gratuitement
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-8 rounded-xl transform hover:scale-105 transition-all flex flex-col">
              <div>
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
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/signup?plan=pro')}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Choisir Pro
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-700/50 transition-all flex flex-col">
              <div>
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
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Contactez-nous
                </button>
              </div>
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
