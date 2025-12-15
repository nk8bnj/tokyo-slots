import { useCallback } from 'react';
import { generateReels } from '@/utils/symbols';
import { calculateWin } from '@/utils/calculateWin';
import { REEL_STOP_DELAY, REEL_FINAL_STOP_DELAY } from '@/constants/animations';
import { INITIAL_JACKPOT, JACKPOT_CONTRIBUTION_RATE } from '@/constants/game';
import { GameResult } from '@/types';

interface SpinParams {
  balance: number;
  currentBet: number;
  setReels: (reels: string[]) => void;
  setBalance: (balance: number) => void;
  setLastWin: (win: number) => void;
  setIsSpinning: (spinning: boolean) => void;
  setGameResult: (result: GameResult) => void;
  setJackpot: (jackpot: number) => void;
  saveBalance: (balance: number) => void;
  saveJackpot: (jackpot: number) => void;
}

/**
 * Hook to handle slot machine spin logic with proper timing
 */
export function useSlotSpin() {
  const executeSpin = useCallback(async ({
    balance,
    currentBet,
    setReels,
    setBalance,
    setLastWin,
    setIsSpinning,
    setGameResult,
    setJackpot,
    saveBalance,
    saveJackpot,
  }: SpinParams) => {
    // Deduct bet
    const newBalance = balance - currentBet;
    setBalance(newBalance);
    setIsSpinning(true);
    setGameResult(GameResult.IDLE);
    setLastWin(0);
    saveBalance(newBalance);
    
    // Generate new reels
    const newReels = generateReels();
    
    // Wait for reels to start spinning
    await new Promise(resolve => setTimeout(resolve, REEL_STOP_DELAY));
    
    // Set reels (this triggers the stop animation)
    setReels(newReels);
    
    // Wait for all reels to stop before calculating win
    await new Promise(resolve => setTimeout(resolve, REEL_FINAL_STOP_DELAY));
    
    // Calculate win
    const winResult = calculateWin(newReels, currentBet);
    const finalBalance = newBalance + winResult.winAmount;
    
    let newJackpot = INITIAL_JACKPOT; // This should come from state, but using constant for now
    let gameResult: GameResult;
    
    if (winResult.isJackpot) {
      gameResult = GameResult.JACKPOT;
      newJackpot = INITIAL_JACKPOT; // Reset jackpot
    } else if (winResult.winAmount > 0) {
      gameResult = GameResult.WIN;
      // Jackpot contribution will be handled by store
    } else {
      gameResult = GameResult.LOSE;
      // Jackpot contribution will be handled by store
    }
    
    // Update state
    setBalance(finalBalance);
    setLastWin(winResult.winAmount);
    setIsSpinning(false);
    setGameResult(gameResult);
    setJackpot(newJackpot);
    
    // Save to localStorage
    saveBalance(finalBalance);
    saveJackpot(newJackpot);
  }, []);
  
  return { executeSpin };
}

