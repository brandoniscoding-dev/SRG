import { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import './styles/Game.css';
import './styles/MainMenu.css';
import logo from '/assets/logo.png'; 


const App: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const handleExit = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start bg-gray-900 overflow-hidden">
      <div className="absolute top-0 left-0 p-4">
      <div className="fixed top-0 left-0 m-4">
        <img src={logo} alt="SRG Logo" className="w-16 h-16"/>
      </div>
      </div>
      {!isGameStarted ? (
        <MainMenu setPlayerName={setPlayerName} setIsGameStarted={setIsGameStarted} />
      ) : (
        <Game playerName={playerName} onExit={handleExit} />
      )}
    </div>
  );
};

export default App;
