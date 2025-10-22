export enum Screen {
  Betting,
  Matching,
  Game,
  Winner,
}

export const BET_AMOUNTS = [0.05, 0.1, 0.25, 0.5, 1.0];

export interface GameState {
  screen: Screen;
  betAmount: number;
  gameId: string | null;
  winnerId: number | null;
}
