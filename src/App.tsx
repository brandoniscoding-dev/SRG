import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './App.css';
import MainMenu from './components/MainMenu';
import Game from './components/Game';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleExit = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isGameStarted ? (
          <motion.div
            key="main-menu"
            initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
            animate={{
              scale: [0.2, 1.4, 0.9, 1.05, 1],
              rotate: [0, -5, 5, -3, 3, 0],
              opacity: 1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.3, 0.5, 0.75, 1],
            }}
            className="w-full h-full flex justify-center items-center"
          >
            <MainMenu
              setPlayerName={setPlayerName}
              setIsGameStarted={setIsGameStarted}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1, // Durée de l'animation, assez rapide pour ne pas gêner l'utilisateur
              ease: "easeOut", // Transition douce mais rapide
            }}
          >
            <Game playerName={playerName} onExit={handleExit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
