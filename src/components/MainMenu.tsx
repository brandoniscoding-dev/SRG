import { useState

  , ChangeEvent } from 'react';
  import '../styles/MainMenu.css';
  
  interface MainMenuProps {
  setPlayerName: (name: string) => void;
  setIsGameStarted: (started: boolean) => void;
  }
  
  const MainMenu: React.FC<MainMenuProps> = ({ setPlayerName, setIsGameStarted }) => {
  const [name, setName] = useState<string>('');
  
  const handleStartGame = () => {
  if (name.trim()) {
  setPlayerName(name);
  } else {
  setPlayerName('Joueur X');
  }
  setIsGameStarted(true);
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
  };
  
  return (
  <div className="flex flex-col items-center justify-center min-h-screen p-6">
  <div className="bg-gray-700 p-8 rounded-3xl shadow-2xl max-w-full w-full sm:max-w-lg text-center">
  <h1 className="text-4xl font-extrabold text-green-400 mb-16 animate-bounce-slow">
  Snake Revolution Game 🐍
  </h1>
  <div className="flex items-center justify-center flex-col">
  <input
           type="text"
           className="border-4 border-green-400 bg-gray-700 text-green-300 text-center placeholder-green-500 rounded-lg py-3 px-6 mb-6 w-full max-w-xs outline-none transition-shadow duration-300 ease-in-out focus:ring-2 focus:ring-green-500"
           placeholder="Enter your name"
           value={name}
           onChange={handleChange}
         />
  <button
           className="py-3 px-6 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-100"
           onClick={handleStartGame}
         >
  Start
  </button>
  </div>
  </div>
  </div>
  );
  };
  
  export default MainMenu;