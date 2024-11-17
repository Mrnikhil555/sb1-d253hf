import React, { useState, useCallback } from 'react';
import { Position } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import GameBoard from './GameBoard';
import Header from './Header';
import Instructions from './Instructions';
import CommandList from './CommandList';

const COMMANDS = [
  { command: "up", description: "Move player upward" },
  { command: "down", description: "Move player downward" },
  { command: "left", description: "Move player left" },
  { command: "right", description: "Move player right" }
];

interface GameProps {
  onBack: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const Game: React.FC<GameProps> = ({ onBack, isMuted, onToggleMute }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [target, setTarget] = useState<Position>({ x: 5, y: 5 });

  const handleCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('up')) {
      setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - 1) }));
    } else if (lowerCommand.includes('down')) {
      setPosition(prev => ({ ...prev, y: Math.min(9, prev.y + 1) }));
    } else if (lowerCommand.includes('left')) {
      setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - 1) }));
    } else if (lowerCommand.includes('right')) {
      setPosition(prev => ({ ...prev, x: Math.min(9, prev.x + 1) }));
    }
  }, []);

  const handleError = useCallback((error: string) => {
    setFeedback(error);
  }, []);

  const handleStart = useCallback(() => {
    setFeedback('Voice control activated');
  }, []);

  const handleStop = useCallback(() => {
    setFeedback('Voice control deactivated');
  }, []);

  const { isListening, startListening, stopListening } = useSpeechRecognition({
    onCommand: handleCommand,
    onError: handleError,
    onStart: handleStart,
    onStop: handleStop
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Header
          isListening={isListening}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onToggleListening={isListening ? stopListening : startListening}
          onBack={onBack}
          title="Voice Adventure"
        />

        <CommandList commands={COMMANDS} />

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl">Score: {score}</div>
            <div className="text-sm opacity-75">{feedback}</div>
          </div>

          <GameBoard position={position} target={target} />
        </div>

        <Instructions />
      </div>
    </div>
  );
};

export default Game;