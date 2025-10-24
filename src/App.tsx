import React, { useState, useCallback, useEffect } from 'react';
import Wallet from '../components/Wallet';
import MainPage from '../components/MainPage';
import { GAME_TITLES } from './utils/constants';

const DisclaimerModal = ({ onConfirm, checked, onCheckChange }: any) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
    <div className="relative bg-gradient-to-br from-brand-dark to-brand-gray p-8 rounded-2xl shadow-2xl w-full max-w-lg border-2 border-yellow/50 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow/5 to-transparent rounded-2xl"></div>

      <div className="relative z-10">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-4xl font-bold font-display mb-6 text-yellow drop-shadow-lg">Important Notice</h2>

        <div className="bg-brand-gray/50 backdrop-blur-sm border border-yellow/20 rounded-xl p-6 mb-6">
          <p className="text-gray-200 text-lg leading-relaxed mb-4">
            This is a <span className="text-yellow font-bold">self-custody platform</span>. Your funds never leave your wallet.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            All wagers are <span className="text-blue-light font-bold">peer-to-peer</span> transactions on the Solana blockchain.
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <input
            id="disclaimer-check"
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckChange(e.target.checked)}
            className="h-5 w-5 rounded bg-brand-gray border-gray-500 text-yellow focus:ring-yellow focus:ring-2 cursor-pointer"
          />
          <label htmlFor="disclaimer-check" className="ml-3 text-gray-300 cursor-pointer select-none hover:text-white transition-colors">
            Don't show this again
          </label>
        </div>

        <button
          onClick={onConfirm}
          className="group relative bg-gradient-to-r from-yellow to-yellow-light text-brand-dark font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow/50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer opacity-0 group-hover:opacity-100"></div>
          <span className="relative z-10">I Understand, Continue</span>
        </button>
      </div>
    </div>
  </div>
);

const NicknameModal = ({ onSubmit }: any) => {
  const [name, setName] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
      <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-brand-dark to-brand-gray p-8 rounded-2xl shadow-2xl w-full max-w-lg border-2 border-blue/50 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-transparent rounded-2xl"></div>

        <div className="relative z-10">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-4xl font-bold font-display mb-3 text-blue drop-shadow-lg">Create Your Nickname</h2>
          <p className="text-gray-300 mb-8 text-lg">Choose a permanent nickname for your wallet.<br />
            <span className="text-sm text-gray-400">(This cannot be changed later)</span>
          </p>

          <div className="mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-brand-gray/50 backdrop-blur-sm border-2 border-blue/30 focus:border-blue rounded-xl p-4 text-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue/50 transition-all placeholder:text-gray-500"
              placeholder="Enter your nickname"
              maxLength={16}
              required
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-2 text-right">{name.length}/16 characters</p>
          </div>

          <button
            type="submit"
            className="group relative w-full bg-gradient-to-r from-blue to-blue-light text-white font-bold py-4 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer opacity-0 group-hover:opacity-100"></div>
            <span className="relative z-10">Set Nickname</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [nickname, setNickname] = useState('');
  const [balance, setBalance] = useState(0);
  const [provider, setProvider] = useState<any>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [dontShowDisclaimer, setDontShowDisclaimer] = useState(false);

  useEffect(() => {
    if ("solana" in window) {
      const solanaProvider = (window as any).solana;
      if (solanaProvider?.isPhantom) {
        setProvider(solanaProvider);

        const handleConnect = async (publicKey: any) => {
          const address = publicKey.toString();
          setWalletAddress(address);
          setWalletConnected(true);
          setIsDemoMode(false);

          const conn = new (window as any).solanaWeb3.Connection(
            (window as any).solanaWeb3.clusterApiUrl('devnet'),
            'confirmed'
          );
          const balance = await conn.getBalance(publicKey);
          setBalance(balance / (window as any).solanaWeb3.LAMPORTS_PER_SOL);

          const stored = JSON.parse(localStorage.getItem('userNicknames') || '{}');
          if (stored[address]) {
            setNickname(stored[address]);
          } else {
            setShowNicknameModal(true);
          }
        };

        const handleDisconnect = () => {
          if (!isDemoMode) {
            setWalletConnected(false);
            setWalletAddress('');
            setNickname('');
            setBalance(0);
            setCurrentGame(null);
          }
        };

        solanaProvider.on('connect', handleConnect);
        solanaProvider.on('disconnect', handleDisconnect);

        return () => {
          solanaProvider.removeListener('connect', handleConnect);
          solanaProvider.removeListener('disconnect', handleDisconnect);
        };
      }
    }
  }, [isDemoMode]);

  const connectWallet = useCallback(async () => {
    if (!provider) {
      alert('Phantom wallet not found. Please install it.');
      return;
    }
    
    const hasAcknowledged = localStorage.getItem('disclaimerAcknowledged') === 'true' ||
                           sessionStorage.getItem('disclaimerAcknowledged') === 'true';
    
    if (hasAcknowledged) {
      await provider.connect({ onlyIfTrusted: false });
    } else {
      setShowDisclaimer(true);
    }
  }, [provider]);

  const handleDisclaimerConfirm = useCallback(async () => {
    setShowDisclaimer(false);
    sessionStorage.setItem('disclaimerAcknowledged', 'true');
    if (dontShowDisclaimer) {
      localStorage.setItem('disclaimerAcknowledged', 'true');
    }
    await provider.connect({ onlyIfTrusted: false });
  }, [dontShowDisclaimer, provider]);

  const handleDisconnect = useCallback(async () => {
    if (isDemoMode) {
      setWalletConnected(false);
      setWalletAddress('');
      setNickname('');
      setBalance(0);
      setIsDemoMode(false);
      setCurrentGame(null);
    } else if (provider?.isConnected) {
      await provider.disconnect();
    }
  }, [provider, isDemoMode]);

  const handlePlayAsGuest = useCallback(() => {
    let guestId = sessionStorage.getItem('guestId');
    if (!guestId) {
      guestId = `GUEST_${Math.random().toString(36).substring(2, 10)}`;
      sessionStorage.setItem('guestId', guestId);
    }
    setIsDemoMode(true);
    setWalletConnected(true);
    setWalletAddress(guestId);
    setNickname('Guest');
    setBalance(10);
  }, []);

  const handleSetNickname = useCallback((newNickname: string) => {
    if (walletAddress) {
      const stored = JSON.parse(localStorage.getItem('userNicknames') || '{}');
      stored[walletAddress] = newNickname;
      localStorage.setItem('userNicknames', JSON.stringify(stored));
      setNickname(newNickname);
      setShowNicknameModal(false);
    }
  }, [walletAddress]);

  return (
    <main className="min-h-screen text-white font-sans flex flex-col items-center">
      {showDisclaimer && (
        <DisclaimerModal
          onConfirm={handleDisclaimerConfirm}
          checked={dontShowDisclaimer}
          onCheckChange={setDontShowDisclaimer}
        />
      )}
      {showNicknameModal && <NicknameModal onSubmit={handleSetNickname} />}

      <div className="w-full">
        <header className="relative w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/30 to-transparent"></div>

          <div className="relative">
            {currentGame ? (
              <h1 className="text-4xl font-bold font-display tracking-wider text-yellow drop-shadow-lg">
                {GAME_TITLES[currentGame]}
              </h1>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-4xl">🎮</div>
                <h1 className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-r from-pink-light via-blue-light to-yellow-light bg-clip-text text-transparent">
                  TRUEPVP.io
                </h1>
              </div>
            )}
          </div>

          <Wallet
            connected={walletConnected}
            address={walletAddress}
            nickname={nickname}
            balance={balance}
            onConnect={connectWallet}
            onDisconnect={handleDisconnect}
            isDemoMode={isDemoMode}
            onPlayAsGuest={handlePlayAsGuest}
          />
        </header>
      </div>

      <div className="w-full max-w-6xl flex-1 flex items-center justify-center px-6 py-12">
        {!currentGame && <MainPage onSelectGame={setCurrentGame} />}
        {currentGame === 'solana-gold-rush' && (
          <div className="text-center animate-fadeIn">
            <div className="text-8xl mb-6 animate-float">💰</div>
            <h2 className="text-4xl font-bold font-display text-yellow mb-4">Gold Rush Game</h2>
            <p className="text-xl text-gray-400">Coming Soon...</p>
          </div>
        )}
      </div>

      <footer className="w-full border-t border-blue/10 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Demo application. All transactions on Solana devnet.
              </p>
              {isDemoMode && (
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <div className="w-2 h-2 bg-yellow-light rounded-full animate-pulse"></div>
                  <p className="text-yellow-light text-sm font-semibold">Demo Mode Active</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="hover:text-blue-light transition-colors cursor-pointer">About</span>
              <span className="hover:text-blue-light transition-colors cursor-pointer">FAQ</span>
              <span className="hover:text-blue-light transition-colors cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;
