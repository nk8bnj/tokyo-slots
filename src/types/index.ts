export type Symbol = 'bomb' | 'crown' | 'key' | 'money' | 'skull' | 'sword';

export enum GameResult {
  IDLE = 'IDLE',
  WIN = 'WIN',
  LOSE = 'LOSE',
  JACKPOT = 'JACKPOT',
}

export interface WinResult {
  winAmount: number;
  isJackpot: boolean;
  matchedSymbols: Symbol[];
  matchCount: number;
}

export interface SlotStore {
  // State
  balance: number;
  currentBet: number;
  reels: Symbol[];
  isSpinning: boolean;
  lastWin: number;
  gameResult: GameResult;
  jackpot: number;
  
  // Actions
  spin: () => void;
  setBet: (bet: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  resetGame: () => void;
  closeModal: () => void;
  syncFromLocalStorage: () => void;
}
