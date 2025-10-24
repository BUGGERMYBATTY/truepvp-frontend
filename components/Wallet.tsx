import React from 'react';

interface WalletProps {
  connected: boolean;
  address: string;
  nickname: string;
  balance: number;
  onConnect: () => void;
  onDisconnect: () => void;
  isDemoMode: boolean;
  onPlayAsGuest: () => void;
}

const Wallet: React.FC<WalletProps> = ({
  connected,
  address,
  nickname,
  balance,
  onConnect,
  onDisconnect,
  isDemoMode,
  onPlayAsGuest
}) => {
  if (!connected) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={onPlayAsGuest}
          className="group relative bg-transparent border-2 border-gray-500 text-gray-300 font-semibold py-2.5 px-6 rounded-lg hover:border-gray-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20"
        >
          <span className="relative z-10">Play as Guest</span>
        </button>
        <button
          onClick={onConnect}
          className="group relative bg-gradient-to-r from-blue to-blue-light text-white font-bold py-2.5 px-6 rounded-lg hover:shadow-xl hover:shadow-blue/40 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer opacity-0 group-hover:opacity-100"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zm-2 3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10">Connect Wallet</span>
        </button>
      </div>
    );
  }

  const displayName = nickname || `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;

  if (isDemoMode) {
    return (
      <div className="flex items-center gap-3">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg blur opacity-50"></div>
          <div className="relative bg-gradient-to-r from-gray-700 to-gray-600 px-4 py-2.5 rounded-lg shadow-lg border border-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-sm">{displayName}</span>
              </div>
              <div className="h-4 w-px bg-gray-500"></div>
              <span className="font-bold text-white text-sm">{balance.toFixed(4)} SOL</span>
            </div>
          </div>
        </div>
        <button
          onClick={onDisconnect}
          className="bg-gray-700 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm hover:shadow-lg"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-light via-blue-light to-yellow-light rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-gradient-to-r from-pink-light via-blue-light to-yellow-light animate-psychedelic-bg bg-[size:400%_400%] px-4 py-2.5 rounded-lg shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-dark rounded-full animate-pulse"></div>
              <span className="text-brand-dark font-bold text-sm">{displayName}</span>
            </div>
            <div className="h-4 w-px bg-brand-dark/30"></div>
            <span className="font-bold text-brand-dark text-sm">{balance.toFixed(4)} SOL</span>
          </div>
        </div>
      </div>
      <button
        onClick={onDisconnect}
        className="bg-gray-700 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm hover:shadow-lg"
      >
        Disconnect
      </button>
    </div>
  );
};

export default Wallet;
