import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScoreBoard } from '@/components/score-board';
import GameOverModal from '@/components/GameOverModal';
import { TOTAL_SPINS } from '@/wheel-config';
import type { GameState } from '@/types';
import {Wheel} from './components/Wheel2';

const INITIAL_STATE: GameState = {
	currentSpin: 1,
	scores: [],
	isSpinning: false,
	totalScore: 0,
	gameComplete: false,
};

export default function SpinWheel() {
	const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
	const [rotation, setRotation] = useState(0);

	const handleSpin = () => {
		if (gameState.isSpinning || gameState.gameComplete) return;

		setGameState((prev) => ({ ...prev, isSpinning: true }));
		// Generate random number of full rotations (5-7) plus the final position
		const newRotation = rotation + 1800 + Math.random() * 720;
		setRotation(newRotation);
	};

	const handleSpinComplete = (value: number) => {
		setGameState((prev) => {
			const newScores = [...prev.scores, value];
			const newTotalScore = newScores.reduce((sum, score) => sum + score, 0);
			const isComplete = newScores.length >= TOTAL_SPINS;

			return {
				...prev,
				scores: newScores,
				totalScore: newTotalScore,
				currentSpin: prev.currentSpin + 1,
				isSpinning: false,
				gameComplete: isComplete,
			};
		});
	};

	const handleNewGame = () => {
		setGameState(INITIAL_STATE);
		setRotation(0);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
			<div className="container mx-auto max-w-4xl">
				<h1 className="mb-8 text-center text-4xl font-bold text-white">Spin the Wheel</h1>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="flex flex-col items-center">
						<Wheel
							isSpinning={gameState.isSpinning}
							onSpinComplete={handleSpinComplete}
							rotation={rotation}
						/>
						<Button
							className="mt-8 w-48"
							size="lg"
							disabled={gameState.isSpinning || gameState.gameComplete}
							onClick={handleSpin}
						>
							{gameState.isSpinning ? 'Spinning...' : 'Spin!'}
						</Button>
					</div>

					<div>
						<ScoreBoard
							currentSpin={gameState.currentSpin}
							scores={gameState.scores}
							totalScore={gameState.totalScore}
						/>
					</div>
				</div>

				<GameOverModal
					isOpen={gameState.gameComplete}
					totalScore={gameState.totalScore}
					onNewGame={handleNewGame}
				/>
			</div>
		</div>
	);
}
