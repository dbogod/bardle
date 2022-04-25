import { useState, useEffect } from 'react';
import {
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS
} from '../constants/strings';

const useBardle = solution => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [guessNumber, setGuessNumber] = useState(0);
  const [goNumber, setGoNumber] = useState(0);
  const [isWinningGuess, setIsWinningGuess] = useState(false);

  const isValidKey = value => /^[A-Za-z']$/.test(value);

  // Add letter hints 
  const markUpGuess = rawGuess => {
    const solutionArray = solution.split('');
    const guess = rawGuess.split('').map(char => {
      return { char, status: ABSENT_STATUS };
    });
    
    // Find the letters that are present AND in the right position
    for (let i = 0; i < rawGuess.length; i++) {
      if (guess[i].char === solutionArray[i]) {
        guess[i].status = CORRECT_STATUS;
        solutionArray[i] = null;
      }
    }
    
    // Find the letters that are present BUT NOT in the right position
    for (let i = 0; i < rawGuess.length; i++) {
      const { char, status } = guess[i];
      if (solutionArray.includes(char) && status !== CORRECT_STATUS) {
        guess[i].status = PRESENT_STATUS;
        solutionArray[solutionArray.indexOf(char)] = null;
      }
    }

    return guess;
  };

  const addGuess = guess => {
    // Check if guess is correct
    if (currentGuess === solution) {
      setIsWinningGuess(true);
    }

    // Add guess to guesses history
    setGuessHistory(prev => {
      const updatedHistory = [...prev];
      updatedHistory[goNumber] = guess;
      return updatedHistory;
    });

    // Add one to go number
    setGoNumber(prev => prev + 1);

    // Reset current guess
    setCurrentGuess('');
  };

  const keyHandler = e => {
    const { key } = e;

    if (key === 'Enter') {
      if (currentGuess.length !== solution.length) {
        console.log('not enough letters');
        return;
      }

      const markedUpGuess = markUpGuess(currentGuess);
      addGuess(markedUpGuess);
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

  return { 
    isValidKey,
    markUpGuess,
    keyHandler,
    currentGuess,
    isWinningGuess,
    solution
  };
};

export default useBardle;