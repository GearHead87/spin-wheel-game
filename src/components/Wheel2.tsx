import { motion } from 'framer-motion';
import { SEGMENTS, SPIN_DURATION } from '../wheel-config';

interface WheelProps {
	isSpinning: boolean;
	onSpinComplete: (value: number) => void;
	rotation: number;
}

export function Wheel({ isSpinning, onSpinComplete, rotation }: WheelProps) {
	const wheelSize = 400;
	// const center = wheelSize / 2;
	const segmentAngle = 360 / SEGMENTS.length;

	return (
		<div className="relative" style={{ width: wheelSize, height: wheelSize }}>
			{/* Pointer */}
			<div className="absolute left-1/2 top-0 z-10 h-8 w-4 -translate-x-1/2 transform">
				<div className="h-full w-full overflow-hidden">
					<div
						className="h-8 w-8 origin-bottom-left rotate-45 transform bg-red-500"
						style={{
							boxShadow: '0 0 0 4px #1a202c',
						}}
					/>
				</div>
			</div>

			{/* Wheel */}
			<motion.div
				className="relative h-full w-full rounded-full bg-gray-800 shadow-xl"
				animate={{ rotate: rotation }}
				transition={{
					duration: SPIN_DURATION,
					ease: [0.25, 0.1, 0.25, 1],
				}}
				onAnimationComplete={() => {
					console.log("onAnimationComplete - isSpinning prop:", isSpinning);
					if (isSpinning) {
						const finalRotation = rotation % 360;
						const segmentIndex = Math.floor((360 - finalRotation) / segmentAngle);
						onSpinComplete(SEGMENTS[segmentIndex % SEGMENTS.length].value);
					}
				}}
			>
				{SEGMENTS.map((segment, index) => {
					const angle = index * segmentAngle;
					return (
						<div
							key={index}
							className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
							style={{
								width: `${wheelSize}px`,
								height: `${wheelSize}px`,
								transform: `rotate(${angle}deg)`,
							}}
						>
							<div
								className="absolute top-0 left-1/2 h-1/2 w-1 -translate-x-1/2 origin-bottom"
								style={{
									backgroundColor: segment.color,
									clipPath: `polygon(
                    -50px 0,
                    50px 0,
                    0 ${wheelSize / 2}px
                  )`,
								}}
							>
								<span
									className="absolute left-[10px] top-[30%] transform text-lg z-10 font-bold text-white"
									style={{
										textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
										transform: `rotate(${0 + segmentAngle / 2}deg)`,
									}}
								>
									{segment.value}
								</span>
							</div>
						</div>
					);
				})}

				{/* Center circle */}
				<div
					className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-900"
					style={{ boxShadow: '0 0 0 8px #1a202c' }}
				/>

				{/* LED lights effect */}
				<div className="absolute inset-0 rounded-full">
					{Array.from({ length: 40 }).map((_, i) => (
						<div
							key={i}
							className="absolute left-1/2 h-2 w-2 -translate-x-1/2 transform"
							style={{
								rotate: `${i * 9}deg`,
								transformOrigin: '50% 195px',
							}}
						>
							<div
								className={`h-full w-full rounded-full ${
									isSpinning ? 'animate-pulse' : ''
								}`}
								style={{
									backgroundColor: 'rgba(255, 255, 255, 0.8)',
									boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
								}}
							/>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
}
