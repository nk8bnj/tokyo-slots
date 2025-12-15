import { create } from 'zustand';
import { SlotStore, GameResult } from '@/types';
import { generateReels } from '@/utils/symbols';
import { calculateWin } from '@/utils/calculateWin';
import {
  INITIAL_BALANCE,
  INITIAL_BET,
  MIN_BET,
  MAX_BET,
  INITIAL_JACKPOT,
  BET_INCREMENT,
  JACKPOT_CONTRIBUTION_RATE,
} from '@/constants/game';
import { REEL_STOP_DELAY, REEL_FINAL_STOP_DELAY } from '@/constants/animations';

// Helper to get initial values consistently (always use defaults for SSR)
const getInitialBalance = () => INITIAL_BALANCE;
const getInitialJackpot = () => INITIAL_JACKPOT;

/**
 * Zustand store for slot machine game state
 * Handles balance, bets, reels, spinning state, and game results
 */
export const useSlotStore = create<SlotStore>((set, get) => ({
  // State - always initialize with defaults to avoid hydration mismatch
  balance: getInitialBalance(),
  currentBet: INITIAL_BET,
  reels: ['bomb', 'bomb', 'bomb', 'bomb'],
  isSpinning: false,
  lastWin: 0,
  gameResult: GameResult.IDLE,
  jackpot: getInitialJackpot(),
  
  // Actions
  /**
   * Initiates a spin: deducts bet, generates new reels, calculates win
   * Uses sequential delays to simulate realistic reel stopping animation
   */
  spin: () => {
    const { balance, currentBet, isSpinning, jackpot } = get();
    
    // Validate
    if (isSpinning) return;
    if (currentBet > balance) return;
    
    // Deduct bet and start spinning
    const newBalance = balance - currentBet;
    set({ 
      balance: newBalance, 
      isSpinning: true, 
      gameResult: GameResult.IDLE,
      lastWin: 0,
    });
    
    // Save balance to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('balance', newBalance.toString());
    }
    
    // Generate new reels
    const newReels = generateReels();
    
    // Start reel animation, then stop reels
    setTimeout(() => {
      set({ reels: newReels });
      
      // Calculate win after all reels stop
      setTimeout(() => {
        const winResult = calculateWin(newReels, currentBet);
        const finalBalance = newBalance + winResult.winAmount;
        
        // Determine game result and update jackpot
        let newJackpot = jackpot;
        let gameResult: GameResult;
        
        if (winResult.isJackpot) {
          gameResult = GameResult.JACKPOT;
          newJackpot = INITIAL_JACKPOT; // Reset jackpot on win
        } else if (winResult.winAmount > 0) {
          gameResult = GameResult.WIN;
          newJackpot += currentBet * JACKPOT_CONTRIBUTION_RATE;
        } else {
          gameResult = GameResult.LOSE;
          newJackpot += currentBet * JACKPOT_CONTRIBUTION_RATE;
        }
        
        // Update final state
        set({
          balance: finalBalance,
          lastWin: winResult.winAmount,
          isSpinning: false,
          gameResult,
          jackpot: newJackpot,
        });
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('balance', finalBalance.toString());
          localStorage.setItem('jackpot', newJackpot.toString());
        }
      }, REEL_FINAL_STOP_DELAY);
    }, REEL_STOP_DELAY);
  },
  
  /**
   * Sets the bet amount, clamped between MIN_BET and MAX_BET
   */
  setBet: (bet: number) => {
    if (get().isSpinning) return;
    const clampedBet = Math.max(MIN_BET, Math.min(MAX_BET, bet));
    set({ currentBet: clampedBet });
  },
  
  /**
   * Increments bet by BET_INCREMENT, up to MAX_BET
   */
  incrementBet: () => {
    const { currentBet, isSpinning } = get();
    if (isSpinning) return;
    if (currentBet < MAX_BET) {
      set({ currentBet: currentBet + BET_INCREMENT });
    }
  },
  
  /**
   * Decrements bet by BET_INCREMENT, down to MIN_BET
   */
  decrementBet: () => {
    const { currentBet, isSpinning } = get();
    if (isSpinning) return;
    if (currentBet > MIN_BET) {
      set({ currentBet: currentBet - BET_INCREMENT });
    }
  },
  
  /**
   * Resets game to initial state and clears localStorage
   */
  resetGame: () => {
    set({
      balance: INITIAL_BALANCE,
      currentBet: INITIAL_BET,
      reels: ['bomb', 'bomb', 'bomb', 'bomb'],
      isSpinning: false,
      lastWin: 0,
      gameResult: GameResult.IDLE,
      jackpot: INITIAL_JACKPOT,
    });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('balance', INITIAL_BALANCE.toString());
      localStorage.setItem('jackpot', INITIAL_JACKPOT.toString());
    }
  },
  
  /**
   * Closes the win/lose modal by resetting game result to IDLE
   */
  closeModal: () => {
    set({ gameResult: GameResult.IDLE });
  },
  
  /**
   * Syncs balance and jackpot from localStorage on mount
   * Used to restore game state after page refresh
   */
  syncFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const savedBalance = localStorage.getItem('balance');
      const savedJackpot = localStorage.getItem('jackpot');
      
      if (savedBalance) {
        set({ balance: Number(savedBalance) });
      }
      if (savedJackpot) {
        set({ jackpot: Number(savedJackpot) });
      }
    }
  },
}));
