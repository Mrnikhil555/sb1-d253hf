import React from 'react';
import { GameType } from '../types';
import { Gamepad2, Brain, Navigation, Lightbulb, Type, Hash } from 'lucide-react';

interface GameSelectorProps {
  onSelectGame: (game: GameType) => void;
}

const games = [
  {
    type: 'wordguess' as GameType,
    title: 'Word Guess',
    description: 'Guess the hidden word letter by letter',
    icon: Type,
    commands: ['guess [letter]', 'solve [word]', 'new game'],
  },
  {
    type: 'numberguess' as GameType,
    title: 'Number Guess',
    description: 'Guess the number with voice hints',
    icon: Hash,
    commands: ['guess [number]', 'new game'],
  },
  {
    type: 'memory' as GameType,
    title: 'Memory Match',
    description: 'Match cards by speaking their positions',
    icon: Brain,
    commands: ['flip 1-16', 'reset'],
  },
  {
    type: 'simon' as GameType,
    title: 'Simon Says',
    description: 'Repeat the color sequence using voice',
    icon: Lightbulb,
    commands: ['red', 'blue', 'green', 'yellow'],
  },
  {
    type: 'quiz' as GameType,
    title: 'Voice Quiz',
    description: 'Answer questions using voice commands',
    icon: Brain,
    commands: ['answer 1-4', 'next', 'previous'],
  },
  {
    type: 'adventure' as GameType,
    title: 'Voice Adventure',
    description: 'Classic movement-based adventure game',
    icon: Gamepad2,
    commands: ['up', 'down', 'left', 'right'],
  },
];

const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => {
        const Icon = game.icon;
        return (
          <button
            key={game.type}
            onClick={() => onSelectGame(game.type)}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left hover:bg-white/20 transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <Icon className="w-8 h-8" />
              <h2 className="text-xl font-bold">{game.title}</h2>
            </div>
            <p className="text-white/80 mb-4">{game.description}</p>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white/60">Voice Commands:</h3>
              <div className="flex flex-wrap gap-2">
                {game.commands.map((command) => (
                  <span
                    key={command}
                    className="text-xs bg-white/20 rounded-full px-3 py-1"
                  >
                    {command}
                  </span>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default GameSelector;