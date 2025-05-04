import { useState, ChangeEvent, useEffect } from 'react';
import '../styles/MainMenu.css';

interface MainMenuProps {
  setPlayerName: (name: string) => void;
  setIsGameStarted: (started: boolean) => void;
}

const MainMenu = ({ setPlayerName, setIsGameStarted }: MainMenuProps) => {
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Gestion du chargement
  const [dots, setDots] = useState<string>(''); // Gestion des points de suspension animés

  // Fonction de mise à jour des points de suspension
  useEffect(() => {
    if (isLoading) {
      let dotCount = 0;
      const dotInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // Répète après 3 points
        setDots('.'.repeat(dotCount)); // Crée les points de suspension animés
      }, 500); // Change les points de suspension toutes les 0.5s

      // Arrêter l'animation après 3 secondes
      setTimeout(() => {
        clearInterval(dotInterval);
        setDots(''); // Réinitialiser les points de suspension
      }, 3000);

      return () => clearInterval(dotInterval); // Nettoyage de l'intervalle lors du démontage
    }
  }, [isLoading]);

  const handleStartGame = () => {
    setIsLoading(true); // Démarre l'état de chargement
    if (name.trim()) {
      setPlayerName(name);
    } else {
      setPlayerName('Joueur X');
    }

    // Démarre le jeu après 3 secondes
    setTimeout(() => {
      setIsGameStarted(true);
      setIsLoading(false); // Fin du chargement
    }, 3000); // Simulation du délai pour démarrer le jeu
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
        <div className="flex items-center justify-center flex-col space-y-4">
          <input
            type="text"
            className="border-4 border-green-400 bg-gray-700 text-green-300 text-center placeholder-green-500 rounded-lg py-3 px-6 mb-4 w-full sm:max-w-xs outline-none transition-shadow duration-300 ease-in-out focus:ring-2 focus:ring-green-500 focus:shadow-lg focus:border-green-500"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
          />
          <button
            className={`py-3 px-6 bg-green-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-300 active:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100 w-full sm:max-w-xs ${isLoading ? 'bg-gray-500 cursor-wait' : ''}`}
            onClick={handleStartGame}
            disabled={isLoading} // Désactive le bouton pendant le chargement
          >
            {isLoading ? (
              <span className="animate-pulse">{`Loading${dots}`}</span> // Animation des points
            ) : (
              'Start'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
