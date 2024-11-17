import React, { useState, useCallback, useEffect } from 'react';
import Header from '../Header';
import CommandList from '../CommandList';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { WordGuessState } from '../../types';

interface WordGuessGameProps {
  onBack: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const COMMANDS = [
  { command: "guess [letter]", description: "Guess a letter" },
  { command: "solve [word]", description: "Try to solve the word" },
  { command: "new game", description: "Start a new game" }
];

const WORDS = [
  'REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'PROGRAMMING', 'DEVELOPER',
  'COMPUTER', 'KEYBOARD', 'MONITOR', 'SOFTWARE', 'INTERNET'
];

const WordGuessGame: React.FC<WordGuessGameProps> = ({ isMuted, onToggleMute, onBack }) => {
  const [gameState, setGameState] = useState<WordGuessState>({
    word: '',
    guessedLetters: [],
    remainingAttempts: 6,
    score: 0
  });

  const initGame = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setGameState({
      word: randomWord,
      guessedLetters: [],
      remainingAttempts: 6,
      score: gameState.score
    });
  }, [gameState.score]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGuess = useCallback((letter: string) => {
    if (gameState.guessedLetters.includes(letter)) return;

    setGameState(prev => {
      const newGuessedLetters = [...prev.guessedLetters, letter];
      const isCorrect = prev.word.includes(letter);
      const newRemainingAttempts = isCorrect ? prev.remainingAttempts : prev.remainingAttempts - 1;
      const newScore = isCorrect ? prev.score + 10 : prev.score;

      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        remainingAttempts: newRemainingAttempts,
        score: newScore
      };
    });
  }, [gameState]);

  const handleSolve = useCallback((attempt: string) => {
    if (attempt.toUpperCase() === gameState.word) {
      setGameState(prev => ({
        ...prev,
        guessedLetters: [...new Set(prev.word.split(''))],
        score: prev.score + 50
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        remainingAttempts: prev.remainingAttempts - 1
      }));
    }
  }, [gameState.word]);

  const handleCommand = useCallback((command: string) => {
    const guessMatch = command.match(/guess (\w)/i);
    const solveMatch = command.match(/solve (\w+)/i);
    
    if (guessMatch) {
      handleGuess(guessMatch[1].toUpperCase());
    } else if (solveMatch) {
      handleSolve(solveMatch[1]);
    } else if (command.toLowerCase().includes('new game')) {
      initGame();
    }
  }, [handleGuess, handleSolve, initGame]);

  const { isListening, startListening, stopListening } = useSpeechRecognition({
    onCommand: handleCommand,
    onError: console.error,
    onStart: () => {},
    onStop: () => {}
  });

  const maskedWord = gameState.word
    .split('')
    .map(letter => gameState.guessedLetters.includes(letter) ? letter : '_')
    .join(' ');

  const isGameOver = gameState.remainingAttempts === 0;
  const isWon = gameState.word.split('').every(letter => gameState.guessedLetters.includes(letter));

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Header
          isListening={isListening}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onToggleListening={isListening ? stopListening : startListening}
          onBack={onBack}
          title="Word Guess"
        />

        <CommandList commands={COMMANDS} />

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="text-2xl mb-4">Score: {gameState.score}</div>
          <div className="text-center mb-8">
            <div className="text-4xl font-mono mb-4">{maskedWord}</div>
            <div className="text-xl">Attempts remaining: {gameState.remainingAttempts}</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={gameState.guessedLetters.includes(letter) || isGameOver || isWon}
                className={`p-3 rounded-lg text-center transition-colors ${
                  gameState.guessedLetters.includes(letter)
                    ? gameState.word.includes(letter)
                      ? 'bg-green-500'
                      : 'bg-red-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {(isGameOver || isWon) && (
            <div className="mt-8 text-center">
              <div className="text-2xl mb-4">
                {isWon ? 'Congratulations!' : 'Game Over!'}
              </div>
              <div className="mb-4">The word was: {gameState.word}</div>
              <button
                onClick={initGame}
                className="px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
              >
                New Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordGuessGame;