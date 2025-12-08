import { Symbol, WinResult } from '@/types';
import { PAYOUT_MULTIPLIERS, PAYOUT_TIERS, JACKPOT_SYMBOL } from '@/config/payouts';

/**
 * Calculates win amount and details based on reel results
 * @param reels - Array of 4 symbols from the reels
 * @param bet - The bet amount placed
 * @returns WinResult with win amount, jackpot status, and match details
 */
export const calculateWin = (reels: Symbol[], bet: number): WinResult => {
  // Count occurrences of each symbol
  const counts = new Map<Symbol, number>();
  reels.forEach(symbol => {
    counts.set(symbol, (counts.get(symbol) || 0) + 1);
  });
  
  // Check for jackpot (all 4 crowns)
  if (reels.every(symbol => symbol === JACKPOT_SYMBOL)) {
    return {
      winAmount: bet * PAYOUT_MULTIPLIERS.JACKPOT,
      isJackpot: true,
      matchedSymbols: reels,
      matchCount: PAYOUT_TIERS.JACKPOT,
    };
  }
  
  // Check for 3 crowns
  if (counts.get(JACKPOT_SYMBOL) === PAYOUT_TIERS.THREE_CROWNS) {
    return {
      winAmount: bet * PAYOUT_MULTIPLIERS.THREE_CROWNS,
      isJackpot: false,
      matchedSymbols: reels.filter(s => s === JACKPOT_SYMBOL),
      matchCount: PAYOUT_TIERS.THREE_CROWNS,
    };
  }
  
  // Check for any 3 matching symbols
  for (const [symbol, count] of counts.entries()) {
    if (count >= PAYOUT_TIERS.THREE_MATCH) {
      return {
        winAmount: bet * PAYOUT_MULTIPLIERS.THREE_MATCH,
        isJackpot: false,
        matchedSymbols: reels.filter(s => s === symbol),
        matchCount: count,
      };
    }
  }
  
  // Check for any 2 matching symbols
  for (const [symbol, count] of counts.entries()) {
    if (count >= PAYOUT_TIERS.TWO_MATCH) {
      return {
        winAmount: bet * PAYOUT_MULTIPLIERS.TWO_MATCH,
        isJackpot: false,
        matchedSymbols: reels.filter(s => s === symbol),
        matchCount: count,
      };
    }
  }
  
  // No win
  return {
    winAmount: 0,
    isJackpot: false,
    matchedSymbols: [],
    matchCount: 0,
  };
};
