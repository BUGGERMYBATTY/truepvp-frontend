import React from 'react';

interface MainPageProps {
  onSelectGame: (gameId: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onSelectGame }) => {
  return (
    <div className="w-full animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold font-display mb-4 bg-gradient-to-r from-pink-light via-blue-light to-yellow-light bg-clip-text text-transparent animate-psychedelic-bg bg-[size:400%_400%] uppercase">
          <div>The Future of</div>
          <div>Web3 PvP Games</div>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          Experience skill-based gaming on the Solana blockchain. Fair, transparent, and instant peer-to-peer wagers.
        </p>
      </div>
      
      <h2 className="text-4xl font-extrabold font-display mb-10 text-center bg-gradient-to-r from-pink-light via-blue-light to-yellow-light bg-clip-text text-transparent">
        Choose Your Game
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button
          onClick={() => onSelectGame('solana-gold-rush')}
          className="group bg-brand-gray border-2 border-yellow/20 hover:border-yellow/50 rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow/10"
        >
          <h3 className="text-3xl font-bold font-display mb-3 text-yellow">Gold Rush</h3>
          <p className="text-gray-400 mb-6">Strategy game. Outplay your opponent over 5 rounds.</p>
          <div className="mt-auto bg-yellow text-brand-dark font-bold py-2 px-8 rounded-lg text-lg transition-transform transform group-hover:scale-105">
            Play Now
          </div>
        </button>
        
        <div className="bg-brand-gray border-2 border-gray-600 rounded-lg p-6 flex flex-col items-center text-center opacity-50">
          <h3 className="text-3xl font-bold font-display mb-3 text-blue">Neon Pong</h3>
          <p className="text-gray-400 mb-6">Coming Soon</p>
        </div>
        
        <div className="bg-brand-gray border-2 border-gray-600 rounded-lg p-6 flex flex-col items-center text-center opacity-50">
          <h3 className="text-3xl font-bold font-display mb-3 text-pink">Cosmic Dodge</h3>
          <p className="text-gray-400 mb-6">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;+
