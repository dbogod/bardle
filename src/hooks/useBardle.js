import { useState } from 'react';

const useBardle = solution => {
  const [currentGuess, setCurrentGuess] = useState('');
  
  if (!solution) {
    return;
  }

  const isValidKey = value => /^[A-Za-z']$/.test(value);

  const keyHandler = e => {
    const { key } = e;

    if (key === 'Enter') {
      // Submit guess
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (!isValidKey(key)) {
      return;
    }
    
    if (currentGuess.length >= solution.length) {
      return;
    }
    
    setCurrentGuess(prev => prev + key);
  };

  return { keyHandler, currentGuess };
};

export default useBardle;