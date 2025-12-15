import { Symbol } from '@/types';
import { StaticImageData } from 'next/image';
import bomb from '@/assets/slot-machine-icons/bomb.svg';
import crown from '@/assets/slot-machine-icons/crown.svg';
import key from '@/assets/slot-machine-icons/key.svg';
import money from '@/assets/slot-machine-icons/money.svg';
import skull from '@/assets/slot-machine-icons/skull.svg';
import sword from '@/assets/slot-machine-icons/sword.svg';

export const SYMBOLS: Symbol[] = ['bomb', 'crown', 'key', 'money', 'skull', 'sword'];

export const SYMBOL_IMAGES: Record<Symbol, StaticImageData> = {
  bomb,
  crown,
  key,
  money,
  skull,
  sword,
};

/**
 * Weighted symbol selection for random reel generation
 * Crown symbol is rarer (5% chance) to make jackpot more difficult
 * @returns A randomly selected symbol based on weights
 */
export const getRandomSymbol = (): Symbol => {
  const weights = {
    'bomb': 20,
    'skull': 20,
    'sword': 20,
    'key': 20,
    'money': 15,
    'crown': 5, // Rarer for jackpot
  };
  
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const [symbol, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) {
      return symbol as Symbol;
    }
  }
  
  return 'bomb';
};

/**
 * Generates 4 random symbols for the slot machine reels
 * @returns Array of 4 symbols
 */
export const generateReels = (): Symbol[] => {
  return [
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol(),
  ];
};
