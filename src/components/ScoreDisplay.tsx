import React from 'react';

interface ScoreDisplayProps {
	spins: number[];
	totalScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ spins, totalScore }) => {
	return (
		<div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Score History</h2>
			<div className="space-y-2">
				{spins.map((score, index) => (
					<div
						key={index}
						className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
					>
						<span className="text-gray-600">Spin {index + 1}</span>
						<span className="font-semibold text-gray-800">{score} points</span>
					</div>
				))}
				{spins.length < 5 &&
					Array(5 - spins.length)
						.fill(null)
						.map((_, index) => (
							<div
								key={`empty-${index}`}
								className="flex justify-between items-center p-3 bg-gray-50 rounded-md opacity-50"
							>
								<span className="text-gray-600">
									Spin {spins.length + index + 1}
								</span>
								<span className="font-semibold text-gray-400">- points</span>
							</div>
						))}
			</div>
			<div className="mt-6 pt-4 border-t border-gray-200">
				<div className="flex justify-between items-center">
					<span className="text-lg font-semibold text-gray-700">Total Score</span>
					<span className="text-2xl font-bold text-indigo-600">{totalScore}</span>
				</div>
			</div>
		</div>
	);
};

export default ScoreDisplay;
