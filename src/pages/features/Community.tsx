import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../../components/LandingNav';

const Community: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <LandingNav />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Rejoignez une Communauté d'Investisseurs
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Partagez vos stratégies, apprenez des autres et progressez ensemble
          </p>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Partage de Stratégies</h3>
              <p className="text-gray-300">
                Partagez vos stratégies gagnantes avec la communauté et découvrez
                celles qui fonctionnent pour d'autres investisseurs.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Forum de Discussion</h3>
              <p className="text-gray-300">
                Échangez avec d'autres investisseurs, posez vos questions et
                participez à des discussions enrichissantes sur l'investissement.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Classements et Récompenses</h3>
              <p className="text-gray-300">
                Gagnez des points et des badges en partageant des analyses pertinentes
                et en aidant d'autres membres de la communauté.
              </p>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              {/* Placeholder pour une démo interactive ou une image */}
              <div className="w-full h-full bg-gray-700/50 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-6xl text-blue-400"></i>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Partage de portefeuilles</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Discussions en temps réel</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Système de réputation</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-emerald-500"></i>
                <span>Notifications personnalisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités Communautaires</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-comments text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Discussions en Direct</h3>
            <p className="text-gray-400">
              Échangez en temps réel avec d'autres investisseurs sur les opportunités
              du marché et les stratégies d'investissement.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-trophy text-emerald-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Challenges et Concours</h3>
            <p className="text-gray-400">
              Participez à des défis d'investissement et des concours pour tester
              vos compétences et gagner des récompenses.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-graduation-cap text-purple-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Mentorat</h3>
            <p className="text-gray-400">
              Connectez-vous avec des investisseurs expérimentés pour apprendre
              et progresser plus rapidement.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez la Communauté</h2>
          <p className="text-xl text-gray-200 mb-6">
            Commencez dès maintenant à échanger avec des milliers d'investisseurs
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Rejoindre Gratuitement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
