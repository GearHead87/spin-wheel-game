import { create } from 'zustand';
import { TOTAL_SPINS } from './wheel-config';

interface GameState {
    currentSpin: number;
    scores: number[];
    isSpinning: boolean;
    totalScore: number;
    gameComplete: boolean;
    rotation: number;
}

interface GameActions {
    spinWheel: () => void;
    handleSpinComplete: (value: number) => void;
    resetGame: () => void;
}

const initialState: GameState = {
    currentSpin: 1,
    scores: [],
    isSpinning: false,
    totalScore: 0,
    gameComplete: false,
    rotation: 0,
};

export const useGameStore = create<GameState & GameActions>((set) => ({
    ...initialState,
    
    spinWheel: () => {
        set((state) => {
            if (state.isSpinning || state.gameComplete) return state;
            
            // Increase minimum rotation to ensure at least 4 full spins
            const newRotation = 1440 + Math.random() * 1440;
            
            return {
                ...state,
                isSpinning: true,
                rotation: newRotation
            };
        });
    },

    handleSpinComplete: (value: number) => {
        set((state) => {
            const newScores = [...state.scores, value];
            const isComplete = newScores.length >= TOTAL_SPINS;

            return {
                ...state,
                scores: newScores,
                totalScore: state.totalScore + value,
                currentSpin: state.currentSpin + 1,
                isSpinning: false,
                gameComplete: isComplete,
                // Reset rotation to 0 after spin completes
                rotation: 0
            };
        });
    },

    resetGame: () => {
        set(initialState);
    }
})); 