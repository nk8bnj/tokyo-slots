'use client';

import { useEffect } from 'react';
import { useSlotStore } from '@/store/useSlotStore';
import Image from 'next/image';
import CoinIcon from '@/components/ui/CoinIcon';
import { textStyleWhite } from '@/styles/components';
import balanceImg from '@/assets/bg/balance.png';
import jackpotImg from '@/assets/bg/Jackpot.png';

export default function Balance() {
  const { balance, syncFromLocalStorage } = useSlotStore();
  
  // Sync from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    syncFromLocalStorage();
  }, [syncFromLocalStorage]);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-10">
      <div className="relative px-8 py-4 w-[400px] h-[123px] flex justify-center items-center">
        <Image 
          src={balanceImg} 
          alt="Balance background"
          className="absolute inset-0 w-full h-full"
          priority
        />
        <div className="z-10">
          <div className="absolute bottom-20 left-24 flex justify-center mb-2">
            <Image 
              src={jackpotImg} 
              alt="Jackpot"
              className="h-full w-[214px]"
              priority
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CoinIcon />
            <span 
              className="text-2xl md:text-3xl font-black tracking-tight"
              style={textStyleWhite}
            >
              {balance.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
