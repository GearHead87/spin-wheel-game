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
        console.log("spinWheel function called!");
        set((state) => {
            console.log("spinWheel action - isSpinning:", state.isSpinning, "gameComplete:", state.gameComplete);
            if (state.isSpinning || state.gameComplete) return state;
            
            const baseRotation = state.rotation % 360;
            const newRotation = baseRotation + 1440 + Math.random() * 720;
            
            return {
                ...state,
                isSpinning: true,
                rotation: newRotation
            };
        });
    },

    handleSpinComplete: (value: number) => {
        set((state) => {
            console.log("handleSpinComplete action - value:", value, "isSpinning:", state.isSpinning, "gameComplete:", state.gameComplete, "scoresLength:", state.scores.length);
            const newScores = [...state.scores, value];
            const isComplete = newScores.length >= TOTAL_SPINS;

            return {
                ...state,
                scores: newScores,
                totalScore: state.totalScore + value,
                currentSpin: state.currentSpin + 1,
                isSpinning: false,
                gameComplete: isComplete,
            };
        });
    },

    resetGame: () => {
        set(initialState);
    }
})); 