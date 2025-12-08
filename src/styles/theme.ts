/**
 * Shared theme values for consistent styling across components
 */

export const COLORS = {
  // Button colors
  buttonGradient: {
    from: '#F5E6FF',
    to: '#E8D5F5',
  },
  buttonBorder: '#3D2E5A',
  buttonText: '#3D2E5A',
  
  // Bet display colors
  betDisplayGradient: {
    from: '#7B6F8F',
    to: '#4A3D5E',
  },
  
  // Coin icon colors
  coinGradient: {
    from: '#FF6B9D',
    to: '#C94277',
  },
  coinBorder: '#8B2E4A',
  
  // Text colors
  textWhite: '#FFFFFF',
  textBlack: '#000000',
  
  // Modal overlay colors
  winOverlay: 'rgba(59, 130, 246, 0.3)', // blue-500/30
  loseOverlay: 'rgba(239, 68, 68, 0.3)', // red-500/30
  
  // Text shadow colors
  textShadowGold: '#DCAE2E',
} as const;

export const SHADOWS = {
  button: '0 4px 0 #3D2E5A, 0 6px 12px rgba(0,0,0,0.3)',
  betDisplay: '0 4px 0 #3D2E5A, inset 0 -3px 0 rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.3)',
  coin: 'inset 0 1px 3px rgba(255,255,255,0.3), 0 3px 6px rgba(0,0,0,0.3)',
  text: '2px 2px 0px rgba(0,0,0,0.5)',
  textGold: '2px 2px 0px #DCAE2E',
  textWhite: '1px 1px 0px rgba(255,255,255,0.5)',
  modalButton: '0 0 0 0 rgba(0,0,0,0.1)',
} as const;

export const GRADIENTS = {
  button: `linear-gradient(180deg, ${COLORS.buttonGradient.from} 0%, ${COLORS.buttonGradient.to} 100%)`,
  betDisplay: `linear-gradient(180deg, ${COLORS.betDisplayGradient.from} 0%, ${COLORS.betDisplayGradient.to} 100%)`,
  coin: `linear-gradient(135deg, ${COLORS.coinGradient.from} 0%, ${COLORS.coinGradient.to} 100%)`,
} as const;

