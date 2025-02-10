import { Button } from '@/components/ui/button';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameOverModal } from '@/components/GameOverModal';
import { Wheel } from './components/Wheel2';
import { useGameStore } from './store';

export default function SpinWheel() {
	const {
		isSpinning,
		gameComplete,
		totalScore,
		currentSpin,
		scores,
		rotation,
		spinWheel,
		handleSpinComplete,
		resetGame
	} = useGameStore();
	console.log("App Component Render - gameComplete:", gameComplete, "isSpinning:", isSpinning);
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
			<div className="container mx-auto max-w-4xl">
				<h1 className="mb-8 text-center text-4xl font-bold text-white">Spin the Wheel</h1>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="flex flex-col items-center">
						<Wheel
							isSpinning={isSpinning}
							onSpinComplete={handleSpinComplete}
							rotation={rotation}
						/>
						<Button
							className="mt-8 w-48"
							size="lg"
							type="button"
							disabled={isSpinning || gameComplete}
							onClick={spinWheel}
						>
							{isSpinning ? 'Spinning...' : 'Spin!'}
						</Button>
					</div>

					<div>
						<ScoreBoard
							currentSpin={currentSpin}
							scores={scores}
							totalScore={totalScore}
						/>
					</div>
				</div>

				<GameOverModal
					isOpen={gameComplete}
					totalScore={totalScore}
					onNewGame={resetGame}
				/>
			</div>
		</div>
	);
}
