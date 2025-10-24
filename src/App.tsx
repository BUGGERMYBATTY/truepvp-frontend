import React, { useState, useCallback, useEffect } from 'react';
import Wallet from '../components/Wallet';
import MainPage from '../components/MainPage';
import { GAME_TITLES } from './utils/constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const DisclaimerModal = ({ onConfirm, checked, onCheckChange }: any) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
    <div className="bg-brand-dark p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 border-2 border-yellow relative text-center">
      <h2 className="text-3xl font-bold font-display mb-4 text-yellow">Important Notice</h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-2">
        This is a self-custody platform. Your funds never leave your wallet. All wagers are peer-to-peer on Solana.
      </p>
      <div className="flex items-center justify-center mt-6 mb-6">
        <input
          id="disclaimer-check"
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckChange(e.target.checked)}
          className="h-5 w-5 rounded bg-brand-gray border-gray-500 text-yellow focus:ring-yellow cursor-pointer"
        />
        <label htmlFor="disclaimer-check" className="ml-3 text-gray-300 cursor-pointer">
          Don't show again
        </label>
      </div>
      <button onClick={onConfirm} className="bg-yellow text-brand-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-light transition-transform transform hover:scale-105">
        I Understand
      </button>
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
      <form onSubmit={handleSubmit} className="bg-brand-dark p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 border-2 border-blue relative text-center">
        <h2 className="text-3xl font-bold font-display mb-2 text-blue">Create Nickname</h2>
        <p className="text-gray-400 mb-6">Choose a permanent nickname (cannot be changed)</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-brand-gray border border-gray-600 rounded-md p-3 text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue mb-4"
          placeholder="Enter nickname"
          maxLength={16}
          required
          autoFocus
        />
        <button type="submit" className="w-full bg-blue text-brand-dark font-bold py-3 rounded-lg text-lg hover:bg-blue-light transition-transform transform hover:scale-105">
          Set Nickname
        </button>
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
  const [connection, setConnection] = useState<any>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [dontShowDisclaimer, setDontShowDisclaimer] = useState(false);

  useEffect(() => {
    if ("solana" in window) {
      const solanaProvider = (window as any).solana;
      if (solanaProvider?.isPhantom) {
        setProvider(solanaProvider);
        
        const conn = new (window as any).solanaWeb3.Connection(
          (window as any).solanaWeb3.clusterApiUrl('devnet'),
          'confirmed'
        );
        setConnection(conn);

        const handleConnect = async (publicKey: any) => {
          const address = publicKey.toString();
          setWalletAddress(address);
          setWalletConnected(true);
          setIsDemoMode(false);
          
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
    <main className="min-h-screen text-white font-sans flex flex-col items-center p-4">
      {showDisclaimer && (
        <DisclaimerModal 
          onConfirm={handleDisclaimerConfirm} 
          checked={dontShowDisclaimer} 
          onCheckChange={setDontShowDisclaimer} 
        />
      )}
      {showNicknameModal && <NicknameModal onSubmit={handleSetNickname} />}
      
      <header className="w-full max-w-6xl mx-auto p-4 flex justify-between items-center border-b border-blue/20">
        <div>
          {currentGame ? (
            <h1 className="text-3xl font-bold font-display tracking-wider text-yellow">
              {GAME_TITLES[currentGame]}
            </h1>
          ) : (
            <img src="/logo.png" alt="TRUEPVP.io" className="h-24" />
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

      <div className="w-full max-w-5xl flex items-center justify-center mt-8 px-4">
        {!currentGame && <MainPage onSelectGame={setCurrentGame} />}
        {currentGame === 'solana-gold-rush' && (
          <div className="text-center text-2xl text-yellow">
            Gold Rush Game Coming Soon...
          </div>
        )}
      </div>

      <footer className="text-center text-gray-500 mt-auto pt-8">
        <p>Demo application. All transactions on Solana devnet.</p>
        {isDemoMode && <p className="text-yellow-light mt-2">Demo Mode Active</p>}
      </footer>
    </main>
  );
};

export default App;
