import React from 'react';
import { Position } from '../types';

interface GameBoardProps {
  position: Position;
  target: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({ position, target }) => (
  <div className="grid grid-cols-10 gap-1 mb-6">
    {Array.from({ length: 100 }).map((_, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      const isPlayer = x === position.x && y === position.y;
      const isTarget = x === target.x && y === target.y;

      return (
        <div
          key={index}
          className={`aspect-square rounded ${
            isPlayer
              ? 'bg-blue-500 shadow-lg scale-105 transform transition-all'
              : isTarget
              ? 'bg-green-500 animate-pulse'
              : 'bg-white/5'
          } transition-colors`}
        />
      );
    })}
  </div>
);

export default GameBoard;