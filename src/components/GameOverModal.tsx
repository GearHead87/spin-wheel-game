import React from 'react';

interface GameOverModalProps {
	isOpen: boolean;
	totalScore: number;
	onNewGame: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, totalScore, onNewGame }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
				<h2 className="text-3xl font-bold text-center mb-6">Game Over!</h2>
				<div className="text-center mb-8">
					<p className="text-xl text-gray-600 mb-2">Your final score</p>
					<p className="text-4xl font-bold text-indigo-600">{totalScore} points</p>
				</div>
				<button
					onClick={onNewGame}
					className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold
            hover:bg-indigo-700 transition-colors duration-200"
				>
					Play Again
				</button>
			</div>
		</div>
	);
};

export default GameOverModal;
