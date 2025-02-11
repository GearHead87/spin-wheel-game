# Spin the Wheel Game

A fun and interactive wheel spinning game built with React, TypeScript, and Framer Motion.

## Features

- Interactive spinning wheel with smooth animations
- Score tracking system
- 5 spins per game
- Mobile responsive design
- Sound effects
- Clean and modern UI

## Tech Stack

- React
- TypeScript
- Framer Motion (for animations)
- Tailwind CSS (for styling)
- Zustand (for state management)
- Shadcn/ui (for UI components)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spin-wheel-game.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Game Rules

1. Each player gets 5 spins
2. The wheel has segments with different point values
3. Points are accumulated over the 5 spins
4. The game ends after 5 spins
5. Final score is the sum of all spins

## Project Structure

```
src/
├── components/          # React components
│   ├── Wheel2.tsx      # Main wheel component
│   ├── ScoreBoard.tsx  # Score tracking
│   └── GameOverModal.tsx# End game modal
├── store.ts            # Game state management
└── wheel-config.ts     # Wheel configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.