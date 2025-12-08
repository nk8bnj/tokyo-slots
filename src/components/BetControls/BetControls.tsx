'use client';

import { useSlotStore } from '@/store/useSlotStore';
import { MIN_BET, MAX_BET } from '@/constants/game';
import CoinIcon from '@/components/ui/CoinIcon';
import { buttonBaseStyle, betDisplayStyle, textStyleWhite, textStyleButton } from '@/styles/components';

export default function BetControls() {
  const { currentBet, incrementBet, decrementBet, isSpinning } = useSlotStore();

  return (
    <div className="w-full max-w-[450px] mb-16">
      <h2 
        className="text-lg md:text-xl font-black text-center mb-3 tracking-wider"
        style={{
          color: '#5C7FFF',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        PLACE A BET
      </h2>

      <div className='flex items-center justify-center gap-3 md:gap-4'>
        {/* Minus Button */}
        <button
          onClick={decrementBet}
          disabled={isSpinning || currentBet <= MIN_BET}
          className="group relative w-12 h-12 md:w-14 md:h-14 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          style={buttonBaseStyle}
        >
          <span 
            className="text-3xl md:text-4xl font-black"
            style={textStyleButton}
          >
            −
          </span>
        </button>

        {/* Bet Display */}
        <div 
          className="relative flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 flex-1 max-w-[240px]"
          style={betDisplayStyle}
        >
          <div className="flex items-center gap-2">
            <CoinIcon />
            <span 
              className="text-2xl md:text-3xl font-black tracking-tight"
              style={textStyleWhite}
            >
              {currentBet.toLocaleString()}.99
            </span>
          </div>
        </div>

        {/* Plus Button */}
        <button
          onClick={incrementBet}
          disabled={isSpinning || currentBet >= MAX_BET}
          className="group relative w-12 h-12 md:w-14 md:h-14 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          style={buttonBaseStyle}
        >
          <span 
            className="text-3xl md:text-4xl font-black"
            style={textStyleButton}
          >
            +
          </span>
        </button>
      </div>
    </div>
  );
}
