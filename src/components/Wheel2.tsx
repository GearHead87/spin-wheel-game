import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SEGMENTS, SPIN_DURATION } from '../wheel-config';
import tickingSound from "../assets/audio/spin-wheel-sound.mp3";

interface WheelProps {
	isSpinning: boolean;
	onSpinComplete: (value: number) => void;
	rotation: number;
}

const ticTicSound: HTMLAudioElement | null = typeof window !== 'undefined' ? new Audio(tickingSound) : null;

export function Wheel({ isSpinning, onSpinComplete, rotation }: WheelProps) {
	const wheelSize = 200;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// const [currentSegment, setCurrentSegment] = useState<number | null>(null);
	const segmentAngle = 360 / SEGMENTS.length;

	useEffect(() => {
		if (isSpinning && ticTicSound) {
			ticTicSound.currentTime = 0;
			ticTicSound.play();
		} else if (ticTicSound) {
			ticTicSound.pause();
			ticTicSound.currentTime = 0;
		}
	}, [isSpinning]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, wheelSize * 2, wheelSize * 2);

		// Draw wheel segments
		SEGMENTS.forEach((segment, index) => {
			const startAngle = (index * segmentAngle * Math.PI) / 180;
			const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;

			ctx.beginPath();
			ctx.moveTo(wheelSize, wheelSize);
			ctx.arc(wheelSize, wheelSize, wheelSize - 10, startAngle, endAngle);
			ctx.closePath();

			// Fill segment
			ctx.fillStyle = segment.color;
			ctx.fill();

			// Add segment value
			ctx.save();
			ctx.translate(wheelSize, wheelSize);
			ctx.rotate(startAngle + segmentAngle * Math.PI / 360);
			ctx.textAlign = 'right';
			ctx.fillStyle = 'white';
			ctx.font = 'bold 16px Arial';
			ctx.fillText(segment.value.toString(), wheelSize - 25, 5);
			ctx.restore();
		});

		// Draw center circle
		ctx.beginPath();
		ctx.arc(wheelSize, wheelSize, 20, 0, Math.PI * 2);
		ctx.fillStyle = '#1a202c';
		ctx.fill();
		ctx.strokeStyle = '#2d3748';
		ctx.lineWidth = 8;
		ctx.stroke();

	}, [wheelSize, segmentAngle]);

	return (
		<div className="relative" style={{ width: wheelSize * 2, height: wheelSize * 2 }}>
			{/* Pointer */}
			<div className="absolute left-1/2 top-0 z-10 h-6 w-3 -translate-x-1/2 transform">
				<div className="h-full w-full overflow-hidden">
					<div
						className="h-6 w-6 origin-bottom-left rotate-45 transform bg-red-500"
						style={{
							boxShadow: '0 0 0 2px #1a202c',
						}}
					/>
				</div>
			</div>

			{/* Wheel */}
			<motion.div
				className="relative h-full w-full"
				animate={{ 
					rotate: rotation 
				}}
				transition={{
					duration: SPIN_DURATION,
					ease: "easeOut",
					type: "tween"
				}}
				onAnimationComplete={() => {
					if (isSpinning) {
						const finalRotation = rotation % 360;
						const normalizedRotation = finalRotation < 0 ? finalRotation + 360 : finalRotation;
						const segmentIndex = Math.floor((360 - normalizedRotation) / segmentAngle);
						onSpinComplete(SEGMENTS[segmentIndex % SEGMENTS.length].value);
					}
				}}
			>
				<canvas
					ref={canvasRef}
					width={wheelSize * 2}
					height={wheelSize * 2}
					className="rounded-full"
				/>

				{/* LED lights effect */}
				{/* <div className="absolute inset-0 rounded-full">
					{Array.from({ length: 40 }).map((_, i) => (
						<div
							key={i}
							className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 transform"
							style={{
								rotate: `${i * 9}deg`,
								transformOrigin: '50% 98px',
							}}
						>
							<div
								className={`h-full w-full rounded-full ${
									isSpinning ? 'animate-pulse' : ''
								}`}
								style={{
									backgroundColor: 'rgba(255, 255, 255, 0.8)',
									boxShadow: '0 0 3px rgba(255, 255, 255, 0.8)',
								}}
							/>
						</div>
					))}
				</div> */}
			</motion.div>
		</div>
	);
}
