interface ScoreBoardProps {
	currentSpin: number;
	scores: number[];
	totalScore: number;
}

export function ScoreBoard({ currentSpin, scores, totalScore }: ScoreBoardProps) {
	return (
		<div className="rounded-lg bg-gray-800 p-4 sm:p-6 text-white">
			<h2 className="mb-4 text-lg sm:text-xl font-bold">Score Board</h2>
			<div className="mb-4 grid grid-cols-5 gap-2 sm:gap-4">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className={`rounded p-2 sm:p-3 text-center ${
							index < scores.length
								? 'bg-green-600'
								: index === currentSpin - 1
								? 'bg-blue-600 animate-pulse'
								: 'bg-gray-700'
						}`}
					>
						<div className="text-xs sm:text-sm">Spin {index + 1}</div>
						<div className="text-base sm:text-xl font-bold">
							{scores[index] || scores[index] === 0 ? scores[index] : '-'}
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-between border-t border-gray-600 pt-4">
				<span className="text-base sm:text-lg">Total Score:</span>
				<span className="text-xl sm:text-2xl font-bold">{totalScore}</span>
			</div>
		</div>
	);
}
