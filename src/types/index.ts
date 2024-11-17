export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  position: Position;
  target: Position;
  score: number;
}

export type GameType = 'memory' | 'simon' | 'quiz' | 'adventure' | 'wordguess' | 'numberguess';

export interface MemoryCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface SimonSequence {
  colors: string[];
  currentIndex: number;
}

export interface WordGuessState {
  word: string;
  guessedLetters: string[];
  remainingAttempts: number;
  score: number;
}

export interface NumberGuessState {
  target: number;
  guesses: number[];
  min: number;
  max: number;
  score: number;
}