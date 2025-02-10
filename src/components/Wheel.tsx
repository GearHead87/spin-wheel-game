import React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface WheelProps {
	onSpinComplete: (score: number) => void;
	isSpinning: boolean;
	setIsSpinning: (spinning: boolean) => void;
}

const SEGMENTS = [
	{ score: 100, color: '#FF6B6B' },
	{ score: 20, color: '#4ECDC4' },
	{ score: 80, color: '#95A5A6' },
	{ score: 40, color: '#F1C40F' },
	{ score: 60, color: '#2ECC71' },
	{ score: 10, color: '#E74C3C' },
	{ score: 90, color: '#9B59B6' },
	{ score: 30, color: '#3498DB' },
	{ score: 70, color: '#E67E22' },
	{ score: 50, color: '#1ABC9C' },
];

const Wheel: React.FC<WheelProps> = ({ onSpinComplete, isSpinning, setIsSpinning }) => {
	const [rotation, setRotation] = useState(0);

	const getSegmentPath = (index: number) => {
		const angle = (360 / SEGMENTS.length) * index;
		const nextAngle = (360 / SEGMENTS.length) * (index + 1);
		const startAngle = (angle - 90) * (Math.PI / 180);
		const endAngle = (nextAngle - 90) * (Math.PI / 180);
		const radius = 150;
		const x1 = Math.cos(startAngle) * radius;
		const y1 = Math.sin(startAngle) * radius;
		const x2 = Math.cos(endAngle) * radius;
		const y2 = Math.sin(endAngle) * radius;

		return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
	};

	const calculateScore = useCallback((finalRotation: number) => {
		const normalizedRotation = ((finalRotation % 360) + 360) % 360;
		const segmentAngle = 360 / SEGMENTS.length;
		const index = Math.floor(normalizedRotation / segmentAngle);
		const adjustedIndex = (SEGMENTS.length - index) % SEGMENTS.length;
		return SEGMENTS[adjustedIndex].score;
	}, []);

	const spinWheel = useCallback(() => {
		if (!isSpinning) {
			setIsSpinning(true);
			const spinDuration = 8000 + Math.random() * 2000;
			const totalRotation = 2000 + Math.random() * 3000;
			const startTime = performance.now();

			const animate = (currentTime: number) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / spinDuration, 1);

				// Easing function for smooth deceleration
				const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
				const currentRotation = totalRotation * easeOut(progress);

				setRotation(currentRotation);

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					setIsSpinning(false);
					const finalScore = calculateScore(currentRotation);
					onSpinComplete(finalScore);
				}
			};

			requestAnimationFrame(animate);
		}
	}, [isSpinning, setIsSpinning, onSpinComplete, calculateScore]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.code === 'Space' && !isSpinning) {
				spinWheel();
			}
		};

		window.addEventListener('keypress', handleKeyPress);
		return () => window.removeEventListener('keypress', handleKeyPress);
	}, [spinWheel, isSpinning]);

	return (
		<div className="relative w-[320px] h-[320px]">
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
				<div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-yellow-500" />
			</div>
			<svg
				className="w-full h-full transform transition-transform"
				viewBox="-150 -150 300 300"
				style={{ transform: `rotate(${rotation}deg)` }}
			>
				{SEGMENTS.map((segment, index) => (
					<g key={index}>
						<path
							d={getSegmentPath(index)}
							fill={segment.color}
							stroke="white"
							strokeWidth="1"
							className="transition-all duration-200 hover:brightness-110"
						/>
						<text
							x={
								Math.cos(((360 / SEGMENTS.length) * index - 90) * (Math.PI / 180)) *
								100
							}
							y={
								Math.sin(((360 / SEGMENTS.length) * index - 90) * (Math.PI / 180)) *
								100
							}
							fill="white"
							fontSize="20"
							textAnchor="middle"
							dominantBaseline="middle"
							transform={`rotate(${(360 / SEGMENTS.length) * index})`}
						>
							{segment.score}
						</text>
					</g>
				))}
			</svg>
			<button
				onClick={spinWheel}
				disabled={isSpinning}
				className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-full w-16 h-16 shadow-lg border-4 border-gray-200
          ${isSpinning ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 transition-transform'}`}
			>
				<span className="sr-only">Spin</span>
			</button>
		</div>
	);
};

export default Wheel;
