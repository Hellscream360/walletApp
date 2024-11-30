import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingNav: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <button onClick={() => navigate('/features/visualization')} className="text-gray-300 hover:text-white transition-colors">
                Visualisation
              </button>
              <button onClick={() => navigate('/features/backtesting')} className="text-gray-300 hover:text-white transition-colors">
                Backtesting
              </button>
              <button onClick={() => navigate('/features/community')} className="text-gray-300 hover:text-white transition-colors">
                Communauté
              </button>
              <button onClick={() => navigate('/features/ai-strategies')} className="text-gray-300 hover:text-white transition-colors">
                IA & Stratégies
              </button>
              <button onClick={() => navigate('/features/reporting')} className="text-gray-300 hover:text-white transition-colors">
                Reporting
              </button>
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">
                Tarifs
              </button>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-white hover:text-blue-400 transition-colors"
              >
                Connexion
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => navigate('/features/visualization')} className="text-gray-300 hover:text-white transition-colors">
                Visualisation
              </button>
              <button onClick={() => navigate('/features/backtesting')} className="text-gray-300 hover:text-white transition-colors">
                Backtesting
              </button>
              <button onClick={() => navigate('/features/community')} className="text-gray-300 hover:text-white transition-colors">
                Communauté
              </button>
              <button onClick={() => navigate('/features/ai-strategies')} className="text-gray-300 hover:text-white transition-colors">
                IA & Stratégies
              </button>
              <button onClick={() => navigate('/features/reporting')} className="text-gray-300 hover:text-white transition-colors">
                Reporting
              </button>
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">
                Tarifs
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="text-white hover:text-blue-400 transition-colors"
              >
                Connexion
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                S'inscrire
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingNav;
