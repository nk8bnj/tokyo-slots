import { COLORS, SHADOWS, GRADIENTS } from './theme';

/**
 * Reusable style objects for common components
 */

export const buttonBaseStyle = {
  background: GRADIENTS.button,
  borderRadius: '10px',
  border: `3px solid ${COLORS.buttonBorder}`,
  boxShadow: SHADOWS.button,
} as const;

export const betDisplayStyle = {
  background: GRADIENTS.betDisplay,
  borderRadius: '10px',
  border: `3px solid ${COLORS.buttonBorder}`,
  boxShadow: SHADOWS.betDisplay,
} as const;

export const textStyleWhite = {
  color: COLORS.textWhite,
  textShadow: SHADOWS.text,
  fontFamily: 'system-ui, -apple-system, sans-serif',
} as const;

export const textStyleGold = {
  color: COLORS.textBlack,
  textShadow: SHADOWS.textGold,
  fontFamily: 'system-ui, -apple-system, sans-serif',
} as const;

export const textStyleButton = {
  color: COLORS.buttonText,
  textShadow: SHADOWS.textWhite,
} as const;

