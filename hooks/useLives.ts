import { useCallback, useState } from 'react';

interface UseLivesOptions {
  initialLives?: number;
  maxLives?: number;
  onLivesDepleted?: () => void;
}

export const useLives = ({ 
  initialLives = 3, 
  maxLives = 3, 
  onLivesDepleted 
}: UseLivesOptions = {}) => {
  const [lives, setLives] = useState(initialLives);

  const loseLife = useCallback(() => {
    setLives(prev => {
      const newLives = Math.max(0, prev - 1);
      
      if (newLives === 0 && onLivesDepleted) {
        // Délai pour permettre l'animation de perte de vie
        setTimeout(() => {
          onLivesDepleted();
        }, 500);
      }
      
      return newLives;
    });
  }, [onLivesDepleted]);

  const gainLife = useCallback(() => {
    setLives(prev => Math.min(maxLives, prev + 1));
  }, [maxLives]);

  const resetLives = useCallback(() => {
    setLives(initialLives);
  }, [initialLives]);

  const isGameOver = lives === 0;

  return {
    lives,
    maxLives,
    loseLife,
    gainLife,
    resetLives,
    isGameOver,
  };
}; 