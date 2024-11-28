import { useNavigate } from "react-router-dom";
import LandingNav from "../../components/LandingNav";
import WaveBackground from "../../components/WaveBackground";

const Reporting: React.FC = () => {
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
              Reporting Avancé et Analytics
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Visualisez et analysez vos performances d'investissement en détail
            </p>
          </div>
        </div>

        {/* Main Features */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Rapports Détaillés</h3>
                <p className="text-gray-300">
                  Générez des rapports complets sur vos performances, incluant les métriques
                  clés et l'analyse des risques.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Visualisations Interactives</h3>
                <p className="text-gray-300">
                  Explorez vos données d'investissement à travers des graphiques
                  interactifs et des tableaux de bord personnalisables.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Export et Partage</h3>
                <p className="text-gray-300">
                  Exportez vos rapports dans différents formats et partagez-les
                  facilement avec vos conseillers ou partenaires.
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
                  <span>Rapports personnalisables</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check text-emerald-500"></i>
                  <span>Métriques avancées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check text-emerald-500"></i>
                  <span>Export multi-formats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check text-emerald-500"></i>
                  <span>Tableaux de bord interactifs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Types de Rapports</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-pie text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Performance</h3>
              <p className="text-gray-400">
                Analysez vos rendements, la volatilité et les métriques de risque
                sur différentes périodes.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-balance-scale text-emerald-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Allocation</h3>
              <p className="text-gray-400">
                Visualisez la répartition de vos actifs et l'évolution de votre
                allocation dans le temps.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-coins text-purple-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Transactions</h3>
              <p className="text-gray-400">
                Suivez vos transactions, les coûts associés et l'impact sur
                votre performance globale.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Commencez à Analyser</h2>
            <p className="text-xl text-gray-200 mb-6">
              Découvrez la puissance de nos outils de reporting
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
    </div>
  );
};

export default Reporting;
