import React, { useState, useEffect, useCallback } from 'react';
import Snake from './Snake';
import Food from './Food';
import useInterval from '../hooks/useInterval';
import { getRandomFoodPosition, checkCollision } from '../utils/gameHelpers';
import '../styles/Game.css';

interface GameProps {
  playerName: string;
  onExit: () => void;
}

const Game: React.FC<GameProps> = ({ playerName, onExit }) => {
  const GRID_SIZE = 20;
  const TILE_SIZE = 20;

  const [snake, setSnake] = useState<Array<[number, number]>>([[8, 8], [8, 7]]);
  const [food, setFood] = useState<[number, number] | null>(getRandomFoodPosition([[8, 8], [8, 7]], GRID_SIZE));
  const [direction, setDirection] = useState<[number, number]>([0, 1]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const boardSize = GRID_SIZE * TILE_SIZE;

  useInterval(() => {
    if (!gameOver && !isPaused) {
      moveSnake();
    }
  }, 200);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    let newDirection: [number, number] = direction;
    switch (e.key) {
      case 'ArrowUp':
        if (direction[1] === 0) newDirection = [0, -1];
        break;
      case 'ArrowDown':
        if (direction[1] === 0) newDirection = [0, 1];
        break;
      case 'ArrowLeft':
        if (direction[0] === 0) newDirection = [-1, 0];
        break;
      case 'ArrowRight':
        if (direction[0] === 0) newDirection = [1, 0];
        break;
      default:
        break;
    }
    setDirection(newDirection);
    e.preventDefault(); // Empêche le comportement par défaut
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const moveSnake = () => {
    setSnake((prev) => {
      const newSnake = [...prev];
      const head: [number, number] = [
        newSnake[0][0] + direction[0],
        newSnake[0][1] + direction[1],
      ];

      if (checkCollision(head, newSnake, GRID_SIZE)) {
        setGameOver(true);
        return prev;
      }

      newSnake.unshift(head);

      if (food && head[0] === food[0] && head[1] === food[1]) {
        setFood(getRandomFoodPosition(newSnake, GRID_SIZE));
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const handleRestart = () => {
    setSnake([[8, 8], [8, 7]]);
    setFood(getRandomFoodPosition([[8, 8], [8, 7]], GRID_SIZE));
    setDirection([0, 1]);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const handleExit = () => {
    onExit();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center">
        <h2 className="text-2xl text-green-400 mb-4">Joueur: {playerName}</h2>
        <div
          className="relative mx-auto grid-container"
          style={{ width: `${boardSize}px`, height: `${boardSize}px` }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            return (
              <div
                key={index}
                className="grid-cell"
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                }}
              />
            );
          })}
          <div className="border-top"></div>
          <div className="border-bottom"></div>
          <div className="border-left"></div>
          <div className="border-right"></div>
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="text-center">
                <h3 className="text-2xl text-red-500 mb-4">Game Over</h3>
                <div className="flex flex-col gap-5">
                  <button
                    className="px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-100"
                    onClick={handleRestart}
                  >
                    Recommencer
                  </button>
                  <button
                    className="px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-100"
                    onClick={handleExit}
                  >
                    Quitter
                  </button>
                </div>
              </div>
            </div>
          )}
          {!gameOver && <Snake snake={snake} />}
          {!gameOver && food && <Food position={food} />}
        </div>
        <div className="mt-4">
          <span className="text-xl text-green-400">Score: {score}</span>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-100"
          onClick={togglePause}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default Game;
