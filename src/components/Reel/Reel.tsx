'use client';

import { motion } from 'framer-motion';
import { Symbol } from '@/types';
import Image from 'next/image';
import { SYMBOL_IMAGES } from '@/utils/symbols';

interface ReelProps {
  symbol: Symbol;
  isSpinning: boolean;
  delay: number;
}

// Reel spin duration in seconds
const REEL_SPIN_DURATION = 0.6;

function Reel({ symbol, isSpinning, delay }: ReelProps) {
  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-1"
        animate={
          isSpinning
            ? {
                y: [0, -300, -600, -900, 0],
                transition: {
                  duration: REEL_SPIN_DURATION,
                  delay: delay / 1000,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatDelay: 0,
                },
              }
            : { y: 0 }
        }
      >
        <Image
          src={SYMBOL_IMAGES[symbol]}
          alt={symbol}
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </motion.div>
    </div>
  );
}

export default Reel;
