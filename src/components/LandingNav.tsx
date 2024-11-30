import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChartLineUp, 
  ChartPieSlice, 
  Users, 
  Brain, 
  FileText, 
  CaretDown 
} from '@phosphor-icons/react';

const LandingNav: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsFeatureMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFeatureMenuOpen(false);
    }, 200); // Délai de 200ms avant la fermeture
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const features = [
    {
      name: 'Visualisation',
      path: '/features/visualization',
      icon: <ChartPieSlice className="w-5 h-5" />,
      description: 'Visualisez vos investissements en détail'
    },
    {
      name: 'Backtesting',
      path: '/features/backtesting',
      icon: <ChartLineUp className="w-5 h-5" />,
      description: 'Testez vos stratégies sur des données historiques'
    },
    {
      name: 'Communauté',
      path: '/features/community',
      icon: <Users className="w-5 h-5" />,
      description: 'Échangez avec d\'autres investisseurs'
    },
    {
      name: 'IA & Stratégies',
      path: '/features/ai-strategies',
      icon: <Brain className="w-5 h-5" />,
      description: 'Optimisez avec l\'intelligence artificielle'
    },
    {
      name: 'Reporting',
      path: '/features/reporting',
      icon: <FileText className="w-5 h-5" />,
      description: 'Générez des rapports détaillés'
    }
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-wallet text-white text-2xl"></i>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              WalletVision
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 pl-16">
            {/* Middle Links */}
            <div className="flex items-center justify-center space-x-8 mx-auto">
              {/* Features Dropdown */}
              <div 
                className="relative"
                ref={menuRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span>Features</span>
                  <CaretDown className={`w-4 h-4 transition-transform ${isFeatureMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-2 z-50 transition-all duration-200 ${
                    isFeatureMenuOpen 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {features.map((feature) => (
                    <button
                      key={feature.path}
                      onClick={() => {
                        navigate(feature.path);
                        setIsFeatureMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 transition-colors"
                    >
                      <div className="text-blue-400">
                        {feature.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-white">{feature.name}</div>
                        <div className="text-sm text-gray-400">{feature.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </button>
            </div>

            {/* Right Side - Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-white transition-colors">
                Connexion
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
                onClick={() => navigate('/signup')}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              {features.map((feature) => (
                <button
                  key={feature.path}
                  onClick={() => {
                    navigate(feature.path);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="text-blue-400">
                    {feature.icon}
                  </div>
                  <span>{feature.name}</span>
                </button>
              ))}
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </button>
              <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-white transition-colors">
                Connexion
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
                onClick={() => navigate('/signup')}
              >
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingNav;
