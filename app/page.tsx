import Image from 'next/image';
import SlotMachine from '@/components/SlotMachine/SlotMachine';
import { FLOATING_ICON_POSITIONS } from '@/constants/layout';
import { FLOATING_ICON_BASE_DELAY, FLOATING_ICON_DURATION_BASE, FLOATING_ICON_DURATION_VARIATION } from '@/constants/animations';

// Import floating icons
import bombIcon from '@/assets/floating/bomb2.svg';
import boxIcon from '@/assets/floating/box.svg';
import coinSkullIcon from '@/assets/floating/coin-skull.svg';
import coinStarIcon from '@/assets/floating/coin-star.svg';
import coinsIcon from '@/assets/floating/coins.svg';
import cupIcon from '@/assets/floating/cup.svg';
import giftIcon from '@/assets/floating/gift.svg';
import moneyIcon from '@/assets/floating/money2.svg';

// Import background
import tokyoCity from '@/assets/bg/tokiocity.png';
import cloud from '@/assets/bg/cloud.png';
import sky from '@/assets/bg/sky.png';

const floatingIcons = [
	coinStarIcon,
	boxIcon,
	bombIcon,
	coinSkullIcon,
	cupIcon,
	coinsIcon,
	giftIcon,
	moneyIcon,
];

const RAY_COUNT = 12;
const RAY_ROTATION_INCREMENT = 30;

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 relative overflow-hidden">
			{/* Top background */}
			<div className="absolute top-[-5%] left-0 right-0 pointer-events-none">
				<Image
					src={sky}
					alt="Top background"
					className="w-full h-auto"
				/>
			</div>

			{/* Animated background rays */}
			<div className="absolute inset-0 opacity-30">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
					{[...Array(RAY_COUNT)].map((_, i) => (
						<div
							key={i}
							className="absolute top-1/2 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent origin-left"
							style={{
								transform: `rotate(${i * RAY_ROTATION_INCREMENT}deg)`,
							}}
						/>
					))}
				</div>
			</div>

			{/* Floating icons */}
			<div className="absolute inset-0 pointer-events-none">
				{floatingIcons.map((icon, i) => {
					const config = FLOATING_ICON_POSITIONS[i % FLOATING_ICON_POSITIONS.length];

					return (
						<div
							key={i}
							className="absolute animate-float z-10"
							style={{
								top: config.top,
								left: config.left,
								animationDelay: `${i * FLOATING_ICON_BASE_DELAY}s`,
								animationDuration: `${FLOATING_ICON_DURATION_BASE + (i % FLOATING_ICON_DURATION_VARIATION)}s`,
							}}
						>
							<Image
								src={icon}
								alt="floating icon"
								width={config.size}
								height={config.size}
								style={{
									width: `${config.size}px`,
									height: `${config.size}px`,
								}}
							/>
						</div>
					);
				})}
			</div>

			{/* Tokyo skyline silhouette */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800/30 to-transparent"/>

			{/* Tokyo city background */}
			<div className="absolute bottom-[15%] left-0 right-0 z-0">
				<Image
					src={tokyoCity}
					alt="Tokyo city"
					className="w-full h-auto object-cover"
				/>
			</div>

			{/* Cloud foreground */}
			<div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
				<Image
					src={cloud}
					alt="Cloud"
					className="w-full h-auto object-cover"
				/>
			</div>

			{/* Main game */}
			<div className="relative z-10">
				<SlotMachine />
			</div>
		</div>
	);
}

