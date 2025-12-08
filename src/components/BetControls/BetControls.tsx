'use client';

import { useSlotStore } from '@/store/useSlotStore';
import { MIN_BET, MAX_BET } from '@/constants/game';
import CoinIcon from '@/components/ui/CoinIcon';
import { buttonBaseStyle, betDisplayStyle, textStyleWhite, textStyleButton } from '@/styles/components';

export default function BetControls() {
  const { currentBet, incrementBet, decrementBet, isSpinning } = useSlotStore();

  return (
    <div className="w-full max-w-[371px] mb-14">
      <h2 
        className="text-lg md:text-xl font-black text-center mb-2.5 tracking-wider"
        style={{
          color: '#5C7FFF',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        PLACE A BET
      </h2>

      <div className='flex items-center justify-center gap-2.5 md:gap-3.5'>
        {/* Minus Button */}
        <button
          onClick={decrementBet}
          disabled={isSpinning || currentBet <= MIN_BET}
          className="group relative w-10 h-[40px] md:w-11 md:h-[44px] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
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
          className="relative flex items-center justify-center px-5 md:px-7 h-[40px] md:h-[44px] flex-1 max-w-[198px]"
          style={betDisplayStyle}
        >
          <div className="flex items-center gap-2">
            <CoinIcon className="w-4 h-4 md:w-7 md:h-7 mt-1" />
            <span 
              className="text-xl md:text-xl font-black tracking-tight"
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
          className="group relative w-10 h-[40px] md:w-11 md:h-[44px] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
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
