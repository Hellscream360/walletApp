import React from 'react';
import { Link } from 'react-router-dom';
import {
  TwitterLogo,
  LinkedinLogo,
  DiscordLogo,
  GithubLogo,
  Envelope,
} from '@phosphor-icons/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const features = [
    { name: 'Visualisation', path: '/features/visualization' },
    { name: 'Backtesting', path: '/features/backtesting' },
    { name: 'Communauté', path: '/features/community' },
    { name: 'IA & Stratégies', path: '/features/ai-strategies' },
    { name: 'Reporting', path: '/features/reporting' },
  ];

  const company = [
    { name: 'À propos', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Carrières', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const legal = [
    { name: 'Confidentialité', path: '/privacy' },
    { name: 'CGU', path: '/terms' },
    { name: 'Cookies', path: '/cookies' },
  ];

  const socials = [
    { 
      name: 'Twitter', 
      icon: <TwitterLogo className="w-5 h-5" />, 
      url: 'https://twitter.com/walletvision' 
    },
    { 
      name: 'LinkedIn', 
      icon: <LinkedinLogo className="w-5 h-5" />, 
      url: 'https://linkedin.com/company/walletvision' 
    },
    { 
      name: 'Discord', 
      icon: <DiscordLogo className="w-5 h-5" />, 
      url: 'https://discord.gg/walletvision' 
    },
    { 
      name: 'GitHub', 
      icon: <GithubLogo className="w-5 h-5" />, 
      url: 'https://github.com/walletvision' 
    },
  ];

  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-wallet text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                WalletVision
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Optimisez vos investissements avec l'intelligence artificielle et des outils de visualisation avancés.
            </p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Fonctionnalités</h3>
            <ul className="space-y-2">
              {features.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Restez informé des dernières actualités et fonctionnalités.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
                aria-label="S'inscrire à la newsletter"
              >
                <Envelope className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400">
            © {currentYear} WalletVision. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            {legal.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
