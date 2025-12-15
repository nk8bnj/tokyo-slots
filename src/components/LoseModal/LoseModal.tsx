'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSlotStore } from '@/store/useSlotStore';
import { GameResult } from '@/types';
import Modal from '@/components/ui/Modal';
import CoinIcon from '@/components/ui/CoinIcon';
import { textStyleGold } from '@/styles/components';
import { MODAL_DECORATION_POSITIONS } from '@/constants/layout';
import { SPARKLE_ANIMATION_DURATION, SPARKLE_DELAY_INCREMENT } from '@/constants/animations';
import { COLORS } from '@/styles/theme';
import { useModal } from '@/hooks/useModal';
import loseImg from '@/assets/bg/lose.png';

export default function LoseModal() {
  const { gameResult, currentBet, closeModal } = useSlotStore();
  const shouldShow = gameResult === GameResult.LOSE;
  const isVisible = useModal(shouldShow, closeModal);
  
  return (
    <Modal
      isVisible={isVisible}
      onClose={closeModal}
      overlayColor={COLORS.loseOverlay}
    >
      {/* Lose banner background image */}
      <Image
        src={loseImg}
        alt="Lose banner"
        fill
        className="object-contain"
        priority
      />
      
      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-red-600 shadow-lg hover:bg-gray-100 transition-all hover:scale-110 active:scale-95 z-10"
        aria-label="Close"
      >
        ×
      </button>
      
      {/* Loss amount positioned below */}
      <div className="absolute bottom-[25%] left-[33%] right-[33%]">
        <div className="flex items-center gap-2">
          <CoinIcon>
            <span className="font-bold text-white">T</span>
          </CoinIcon>
          <span 
            className="text-2xl md:text-3xl font-black tracking-tight"
            style={textStyleGold}
          >
            -{currentBet.toLocaleString()}.99
          </span>
        </div>
      </div>
      
      {/* Animated skulls */}
      {MODAL_DECORATION_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
          }}
          animate={{
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: SPARKLE_ANIMATION_DURATION,
            repeat: Infinity,
            delay: i * SPARKLE_DELAY_INCREMENT,
          }}
        >
          💀
        </motion.div>
      ))}
    </Modal>
  );
}
