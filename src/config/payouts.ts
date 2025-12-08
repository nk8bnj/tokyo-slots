import { Symbol } from '@/types';

/**
 * Payout multipliers for different winning combinations
 */
export const PAYOUT_MULTIPLIERS = {
  JACKPOT: 100, // All 4 crowns
  THREE_CROWNS: 20, // 3 crowns
  THREE_MATCH: 5, // Any 3 matching symbols
  TWO_MATCH: 1.5, // Any 2 matching symbols
} as const;

/**
 * Symbol required for jackpot
 */
export const JACKPOT_SYMBOL: Symbol = 'crown';

/**
 * Minimum match count for each payout tier
 */
export const PAYOUT_TIERS = {
  JACKPOT: 4,
  THREE_CROWNS: 3,
  THREE_MATCH: 3,
  TWO_MATCH: 2,
} as const;

