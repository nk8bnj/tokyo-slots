'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSlotStore } from '@/store/useSlotStore';
import spinButtonImg from '@/assets/bg/spin button pressed.png';

// Animation constants
const SPIN_BUTTON_PULSE_DURATION = 1.5; // seconds
const SPIN_BUTTON_HOVER_SCALE = 1.05;
const SPIN_BUTTON_TAP_SCALE = 0.95;

function SpinButton() {
  const { spin, isSpinning, currentBet, balance } = useSlotStore();
  const canSpin = !isSpinning && balance >= currentBet;
  
  return (
    <motion.button
      onClick={spin}
      disabled={!canSpin}
      className="relative w-48 h-48 md:w-56 md:h-56 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={canSpin ? { scale: SPIN_BUTTON_HOVER_SCALE } : {}}
      whileTap={canSpin ? { scale: SPIN_BUTTON_TAP_SCALE } : {}}
      animate={
        canSpin && !isSpinning
          ? {
              scale: [1, 1.02, 1],
              transition: {
                duration: SPIN_BUTTON_PULSE_DURATION,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
          : {}
      }
    >
      <Image
        src={spinButtonImg}
        alt="Spin"
        fill
        className="object-contain z-0"
      />
    </motion.button>
  );
}

export default SpinButton;
