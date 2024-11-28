import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../../components/LandingNav';

const Visualization: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <LandingNav />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Visualisez vos Investissements
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Des graphiques interactifs et des tableaux de bord personnalisables pour suivre vos performances
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Graphiques Interactifs</h3>
              <p className="text-gray-300">
                Explorez vos investissements avec des graphiques dynamiques et personnalisables.
                Analysez les tendances, les corrélations et les performances sur différentes périodes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Tableaux de Bord Personnalisés</h3>
              <p className="text-gray-300">
                Créez des tableaux de bord sur mesure avec les métriques qui comptent le plus pour vous.
                Gardez un œil sur vos KPIs essentiels en un coup d'œil.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Analyse de Performance</h3>
              <p className="text-gray-300">
                Mesurez la performance de vos investissements avec des métriques avancées comme
                le ratio de Sharpe, la volatilité et le drawdown maximum.
              </p>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              {/* Placeholder pour une démo interactive ou une image */}
              <div className="w-full h-full bg-gray-700/50 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-line text-6xl text-blue-400"></i>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Graphiques en temps réel</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Personnalisation complète</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Export des données</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Indicateurs techniques</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Visualiser vos Investissements ?</h2>
          <p className="text-xl text-gray-200 mb-6">
            Commencez dès maintenant à analyser vos portefeuilles comme un professionnel
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

export default Visualization;
