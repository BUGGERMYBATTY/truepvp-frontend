export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

export const GAME_TITLES: { [key: string]: string } = {
  'solana-gold-rush': 'Gold Rush',
  'neon-pong': 'Neon Pong',
  'viper-pit': 'Cosmic Dodge',
};

export const TREASURY_WALLET = 'DpfnnAQb9z5qQsoR6mjNtF6P6HpTj3M17K5BfLmfvBoC';
