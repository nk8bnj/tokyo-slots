'use client';

import { useSlotStore } from '@/store/useSlotStore';
import Reel from '@/components/Reel/Reel';
import BetControls from '@/components/BetControls/BetControls';
import SpinButton from '@/components/SpinButton/SpinButton';
import Balance from '@/components/Balance/Balance';
import WinModal from '@/components/WinModal/WinModal';
import LoseModal from '@/components/LoseModal/LoseModal';
import { REEL_DELAY_INCREMENT } from '@/constants/animations';
import { REEL_CONTAINER_STYLE } from '@/constants/layout';
import h1Bg from '@/assets/bg/h1-bg.png';
import slotImg from '@/assets/bg/slot.png';
import Image from 'next/image';

export default function SlotMachine() {
  const { reels, isSpinning } = useSlotStore();
  
  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* Title */}
      <div className="w-[340px] h-[69px] relative px-12 py-4 overflow-hidden">
        <Image 
          src={h1Bg}
          alt="title background"
          fill
          className="object-cover absolute inset-0 -z-10"
        />
      </div>
      
      {/* Slot Machine Container */}
      <div className="relative w-full max-w-[28.125rem] aspect-6/5">
        {/* Slot Machine Base Image */}
        <Image 
          src={slotImg}
          alt="slot machine"
          fill
          className="object-contain"
          priority
        />
        
        {/* Reels positioned on top of the slot machine */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="flex gap-1.5 md:gap-4"
            style={REEL_CONTAINER_STYLE}
          >
            {reels.map((symbol, index) => (
              <div key={index} className="flex-1 h-full">
                <Reel
                  symbol={symbol}
                  isSpinning={isSpinning}
                  delay={index * REEL_DELAY_INCREMENT}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Modals */}
        <WinModal />
        <LoseModal />
      </div>
      
      {/* Bet Controls */}
      <BetControls />
      
      {/* Spin Button */}
      <SpinButton />
      
      {/* Balance */}
      <Balance />
    </div>
  );
}
