import { coinIconStyle } from '@/styles/components';

interface CoinIconProps {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-6 h-6 text-sm',
  md: 'w-7 h-7 md:w-8 md:h-8 text-base md:text-lg',
  lg: 'w-10 h-10 text-xl',
} as const;

export default function CoinIcon({ size = 'md', children = '💰', className = '' }: CoinIconProps) {
  return (
    <div
      className={`${SIZE_MAP[size]} rounded-full flex items-center justify-center shrink-0 ${className}`}
      style={coinIconStyle}
    >
      {children}
    </div>
  );
}

