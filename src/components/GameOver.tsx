import React from 'react';

interface GameOverScreenProps {
  onRestart: () => void;
  onExit: () => void;
}

const GameOver: React.FC<GameOverScreenProps> = ({ onRestart, onExit }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="text-center">
        <h3 className="text-2xl text-red-500 mb-4">Game Over</h3>
        <div className="flex flex-col gap-5">
          <button
            className="px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-100"
            onClick={onRestart}
          >
            Recommencer
          </button>
          <button
            className="px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-100"
            onClick={onExit}
          >
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
