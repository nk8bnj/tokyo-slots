'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { MODAL_ANIMATION_DURATION, MODAL_OVERLAY_DURATION } from '@/constants/animations';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  overlayColor: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isVisible, onClose, overlayColor, children, className = '' }: ModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MODAL_OVERLAY_DURATION }}
            className="fixed inset-0 backdrop-blur-sm z-40"
            style={{ backgroundColor: overlayColor }}
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ type: 'spring', duration: MODAL_ANIMATION_DURATION }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${className}`}
          >
            <div 
              className="relative w-[400px] h-[200px] md:w-[500px] md:h-[250px]"
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

