import { useNavigate } from "react-router-dom";
import LandingNav from "../../components/LandingNav";
import WaveBackground from "../../components/WaveBackground";
import DemoChart from "../../components/DemoChart";
import Footer from "../../components/Footer";

const Visualization: React.FC = () => {
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
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Visualisez vos Investissements
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Des graphiques interactifs et des tableaux de bord personnalisables pour suivre vos performances
            </p>
          </div>

          {/* Demo Chart */}
          <div className="max-w-4xl mx-auto mt-20">
            <DemoChart />
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
                  Mesurez la performance de vos investissements avec des métriques avancées.
                  Comparez vos résultats avec des indices de référence.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Diversification</h3>
                <p className="text-gray-300">
                  Visualisez la répartition de vos actifs par catégorie, secteur, ou zone géographique.
                  Optimisez votre diversification pour réduire les risques.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Suivi des Dividendes</h3>
                <p className="text-gray-300">
                  Suivez vos revenus passifs avec des graphiques détaillés des dividendes.
                  Anticipez vos futurs versements.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Export de Données</h3>
                <p className="text-gray-300">
                  Exportez vos données et graphiques dans différents formats.
                  Partagez facilement vos analyses avec vos conseillers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Prêt à visualiser vos investissements ?
          </h2>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Commencer Gratuitement
          </button>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Visualization;
