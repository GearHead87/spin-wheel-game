import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface GameOverModalProps {
	isOpen: boolean;
	totalScore: number;
	onNewGame: () => void;
}

export function GameOverModal({ isOpen, totalScore, onNewGame }: GameOverModalProps) {
	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Game Over!</DialogTitle>
					<DialogDescription>
						Congratulations! You've completed all 5 spins.
					</DialogDescription>
				</DialogHeader>
				<div className="py-6">
					<div className="text-center">
						<div className="text-lg font-semibold">Your Total Score</div>
						<div className="mt-2 text-4xl font-bold text-primary">{totalScore}</div>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onNewGame} className="w-full">
						Play Again
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
