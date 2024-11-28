import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../../components/LandingNav';

const AIStrategies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <LandingNav />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Stratégies d'Investissement IA
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Exploitez la puissance de l'intelligence artificielle pour optimiser vos investissements
          </p>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Analyse Prédictive</h3>
              <p className="text-gray-300">
                Utilisez des modèles d'IA avancés pour analyser les tendances du marché
                et prédire les mouvements de prix potentiels.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Optimisation de Portefeuille</h3>
              <p className="text-gray-300">
                Laissez l'IA optimiser votre allocation d'actifs en fonction de vos
                objectifs et de votre tolérance au risque.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Alertes Intelligentes</h3>
              <p className="text-gray-300">
                Recevez des alertes personnalisées basées sur l'analyse en temps réel
                des conditions du marché et de votre portefeuille.
              </p>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              {/* Placeholder pour une démo interactive ou une image */}
              <div className="w-full h-full bg-gray-700/50 rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-6xl text-blue-400"></i>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Analyse en temps réel</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Recommandations personnalisées</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Apprentissage continu</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Rapports détaillés</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Capacités de l'IA</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-chart-line text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Analyse Technique</h3>
            <p className="text-gray-400">
              Détection automatique des patterns et des signaux techniques
              pour identifier les meilleures opportunités d'entrée et de sortie.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-newspaper text-emerald-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Analyse de Sentiment</h3>
            <p className="text-gray-400">
              Analyse des actualités et des réseaux sociaux pour évaluer
              le sentiment du marché et anticiper les mouvements.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-purple-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Gestion des Risques</h3>
            <p className="text-gray-400">
              Surveillance continue des risques et ajustement automatique
              des positions pour protéger votre capital.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Optimisez vos Investissements avec l'IA</h2>
          <p className="text-xl text-gray-200 mb-6">
            Commencez dès maintenant à utiliser l'intelligence artificielle pour vos investissements
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Commencer Maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIStrategies;
