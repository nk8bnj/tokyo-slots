import { useEffect, useState } from 'react';
import { MODAL_SHOW_DELAY, MODAL_AUTO_CLOSE_DELAY } from '@/constants/animations';

/**
 * Hook to manage modal visibility with delayed show and auto-close
 * @param shouldShow - Whether the modal should be shown based on state
 * @param onClose - Callback to close the modal
 * @returns isVisible - Current visibility state for rendering
 */
export function useModal(shouldShow: boolean, onClose: () => void): boolean {
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle showing modal with delay
  useEffect(() => {
    if (shouldShow) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, MODAL_SHOW_DELAY);
      
      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
    }
  }, [shouldShow]);
  
  // Handle auto-close
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, MODAL_AUTO_CLOSE_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  return isVisible;
}

