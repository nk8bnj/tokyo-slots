'use client';

import { motion } from 'framer-motion';
import { Symbol } from '@/types';
import Image from 'next/image';
import { SYMBOL_IMAGES, getRandomSymbol } from '@/utils/symbols';
import { REEL_SPIN_DURATION } from '@/constants/animations';
import { useEffect, useState, useRef } from 'react';

interface ReelProps {
  symbol: Symbol;
  isSpinning: boolean;
  delay: number;
}

// Number of symbols to show in the reel strip (enough for seamless scrolling)
const SYMBOLS_PER_REEL = 30;

function Reel({ symbol, isSpinning, delay }: ReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbolHeight, setSymbolHeight] = useState(100);
  
  // Initialize strip with current symbol
  const generateStrip = (targetSymbol: Symbol): Symbol[] => {
    const strip: Symbol[] = [];
    // Generate random symbols for the strip
    for (let i = 0; i < SYMBOLS_PER_REEL; i++) {
      strip.push(getRandomSymbol());
    }
    // Place the final symbol at a specific position (will be visible when stopped)
    strip[SYMBOLS_PER_REEL - 3] = targetSymbol;
    // Store the last few symbols for seamless looping
    const lastSymbols = strip.slice(-5);
    // Add duplicates at the end and beginning for seamless looping
    strip.push(...lastSymbols);
    // Replace first few symbols to match the end for seamless loop
    for (let i = 0; i < 5; i++) {
      strip[i] = lastSymbols[i];
    }
    return strip;
  };

  const [symbolStrip, setSymbolStrip] = useState<Symbol[]>(() => generateStrip(symbol));

  // Calculate symbol height based on container
  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.clientHeight;
      setSymbolHeight(height);
    }
  }, []);

  // Generate a new strip when spinning starts
  useEffect(() => {
    if (isSpinning) {
      setSymbolStrip(generateStrip(symbol));
    }
  }, [isSpinning, symbol]);

  // Calculate the final position to center the target symbol
  // The target symbol is at index SYMBOLS_PER_REEL - 3
  const targetIndex = SYMBOLS_PER_REEL - 3;
  const finalPosition = -targetIndex * symbolHeight;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-white rounded-lg overflow-hidden"
    >
      <motion.div
        className="absolute left-0 right-0 flex flex-col p-1"
        style={{ top: 0 }}
        animate={
          isSpinning
            ? {
                y: [0, -symbolHeight * SYMBOLS_PER_REEL],
                transition: {
                  duration: REEL_SPIN_DURATION,
                  delay: delay / 1000,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatDelay: 0,
                },
              }
            : {
                y: finalPosition,
                transition: {
                  duration: 1.3,
                  // ease: [0.4, 0, 0.2, 1],
                },
              }
        }
      >
        {symbolStrip.map((sym, index) => (
          <div
            key={`${index}-${isSpinning}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ height: symbolHeight }}
          >
            <Image
              src={SYMBOL_IMAGES[sym]}
              alt={sym}
              width={80}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Reel;
