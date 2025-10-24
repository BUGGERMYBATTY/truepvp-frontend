import React from 'react';

interface MainPageProps {
  onSelectGame: (gameId: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onSelectGame }) => {
  return (
    <div className="w-full animate-fadeIn">
      <div className="text-center mb-20">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-light via-blue-light to-yellow-light blur-3xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-5xl md:text-7xl font-extrabold font-display mb-6 bg-gradient-to-r from-pink-light via-blue-light to-yellow-light bg-clip-text text-transparent animate-psychedelic-bg bg-[size:400%_400%] uppercase tracking-tight leading-tight">
            <div className="animate-slide-up">The Future of</div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>Web3 PvP Games</div>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Experience skill-based gaming on the Solana blockchain.
          <span className="block mt-2 text-blue-light font-semibold">Fair, transparent, and instant peer-to-peer wagers.</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="px-4 py-2 bg-brand-gray/50 backdrop-blur-sm border border-blue/30 rounded-full">
            <span className="text-sm text-gray-400">⚡ Instant Payouts</span>
          </div>
          <div className="px-4 py-2 bg-brand-gray/50 backdrop-blur-sm border border-pink/30 rounded-full">
            <span className="text-sm text-gray-400">🔒 Self-Custody</span>
          </div>
          <div className="px-4 py-2 bg-brand-gray/50 backdrop-blur-sm border border-yellow/30 rounded-full">
            <span className="text-sm text-gray-400">🎮 Skill-Based</span>
          </div>
        </div>
      </div>

      <div className="relative mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold font-display text-center bg-gradient-to-r from-pink-light via-blue-light to-yellow-light bg-clip-text text-transparent">
          Choose Your Game
        </h2>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-32 h-1 bg-gradient-to-r from-pink-light via-blue-light to-yellow-light rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button
          onClick={() => onSelectGame('solana-gold-rush')}
          className="group relative bg-gradient-to-br from-brand-gray to-brand-dark border-2 border-yellow/30 hover:border-yellow rounded-xl p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-shimmer-gradient animate-shimmer opacity-0 group-hover:opacity-100"></div>

          <div className="relative z-10 w-full">
            <div className="mb-4 text-6xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">💰</div>
            <h3 className="text-4xl font-bold font-display mb-4 text-yellow group-hover:text-yellow-light transition-colors">Gold Rush</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">Strategy game where you outplay your opponent over 5 intense rounds.</p>

            <div className="space-y-2 mb-6 text-sm text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-yellow rounded-full"></span>
                <span>5 Rounds</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-yellow rounded-full"></span>
                <span>Strategy & Timing</span>
              </div>
            </div>

            <div className="mt-auto bg-gradient-to-r from-yellow to-yellow-light text-brand-dark font-bold py-3 px-10 rounded-lg text-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-yellow/50">
              Play Now
            </div>
          </div>
        </button>

        <div className="relative bg-gradient-to-br from-brand-gray to-brand-dark border-2 border-blue/20 rounded-xl p-8 flex flex-col items-center text-center opacity-60 overflow-hidden">
          <div className="absolute top-4 right-4 bg-blue/20 text-blue text-xs font-bold px-3 py-1 rounded-full">Coming Soon</div>
          <div className="mb-4 text-6xl filter grayscale">🏓</div>
          <h3 className="text-4xl font-bold font-display mb-4 text-blue">Neon Pong</h3>
          <p className="text-gray-400 mb-6 leading-relaxed text-lg">Classic arcade action with a web3 twist.</p>
        </div>

        <div className="relative bg-gradient-to-br from-brand-gray to-brand-dark border-2 border-pink/20 rounded-xl p-8 flex flex-col items-center text-center opacity-60 overflow-hidden">
          <div className="absolute top-4 right-4 bg-pink/20 text-pink text-xs font-bold px-3 py-1 rounded-full">Coming Soon</div>
          <div className="mb-4 text-6xl filter grayscale">🚀</div>
          <h3 className="text-4xl font-bold font-display mb-4 text-pink">Cosmic Dodge</h3>
          <p className="text-gray-400 mb-6 leading-relaxed text-lg">Test your reflexes in space.</p>
        </div>
      </div>

      <div className="mt-20 text-center">
        <div className="inline-block bg-brand-gray/50 backdrop-blur-sm border border-blue/20 rounded-xl p-6 max-w-2xl">
          <h3 className="text-2xl font-bold font-display text-blue-light mb-3">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <div className="text-3xl mb-2">1️⃣</div>
              <p className="font-semibold mb-1">Connect Wallet</p>
              <p className="text-gray-400 text-xs">Your funds stay secure</p>
            </div>
            <div>
              <div className="text-3xl mb-2">2️⃣</div>
              <p className="font-semibold mb-1">Choose Game</p>
              <p className="text-gray-400 text-xs">Set your wager amount</p>
            </div>
            <div>
              <div className="text-3xl mb-2">3️⃣</div>
              <p className="font-semibold mb-1">Win & Earn</p>
              <p className="text-gray-400 text-xs">Instant blockchain payouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
