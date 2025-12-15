import type { CSSProperties } from 'react';

// Floating icons layout configuration
export const FLOATING_ICON_POSITIONS = [
  { top: '15%', left: '8%', size: 108 },
  { top: '30%', left: '85%', size: 76 },
  { top: '45%', left: '25%', size: 96 },
  { top: '60%', left: '70%', size: 96 },
  { top: '70%', left: '10%', size: 130 },
  { top: '75%', left: '80%', size: 78 },
  { top: '5%', left: '65%', size: 156 },
  { top: '6%', left: '28%', size: 156 },
] as const;

// Modal sparkle/skull positions
export const MODAL_DECORATION_POSITIONS = [
  { top: '25%', left: '15%' },
  { top: '40%', left: '70%' },
  { top: '55%', left: '30%' },
  { top: '65%', left: '80%' },
  { top: '30%', left: '50%' },
  { top: '50%', left: '60%' },
] as const;

// Slot machine reel positioning
export const REEL_CONTAINER_STYLE: CSSProperties = {
  transform: 'translateX(-3%)',
  width: '74%',
  height: '33%',
};

// Modal dimensions
export const MODAL_DIMENSIONS = {
  width: 400,
  height: 200,
  mdWidth: 500,
  mdHeight: 250,
} as const;

