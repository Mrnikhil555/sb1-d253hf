import React, { useState } from 'react';
import { GameType } from './types';
import Game from './components/Game';
import GameSelector from './components/GameSelector';
import MemoryGame from './components/games/MemoryGame';
import SimonGame from './components/games/SimonGame';
import QuizGame from './components/games/QuizGame';
import WordGuessGame from './components/games/WordGuessGame';
import NumberGuessGame from './components/games/NumberGuessGame';

function App() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleBack = () => setSelectedGame(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'adventure':
        return <Game onBack={handleBack} isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />;
      case 'memory':
        return <MemoryGame onBack={handleBack} isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />;
      case 'simon':
        return <SimonGame onBack={handleBack} isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />;
      case 'quiz':
        return <QuizGame onBack={handleBack} isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />;
      case 'wordguess':
        return <WordGuessGame onBack={handleBack} isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />;
      case 'numberguess':
        return <NumberGuessGame onBack={handleBack} isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />;
      default:
        return (
          <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Voice-Controlled Games</h1>
            <GameSelector onSelectGame={setSelectedGame} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {renderGame()}
    </div>
  );
}

export default App;