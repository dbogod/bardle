import { useState } from 'react';
import {
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS
} from '../constants/strings';
import { KEY_ROWS } from '../constants/keys';

const useBardle = solution => {
  const [keyboardKeys, setKeyboardKeys] = useState([
    ...KEY_ROWS[0].map(key => ({ char: key.toLowerCase(), status: 'default' })),
    ...KEY_ROWS[1].map(key => ({ char: key.toLowerCase(), status: 'default' })),
    ...KEY_ROWS[2].map(key => ({ char: key.toLowerCase(), status: 'default' }))
  ]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [goNumber, setGoNumber] = useState(0);
  const [isWinningGuess, setIsWinningGuess] = useState(false);

  const isValidKey = value => /^[A-Za-z']$/.test(value);

  // Add letter hints 
  const markUpGuess = rawGuess => {
    const solutionArray = solution.split('');
    const guessWord = rawGuess.split('').map(char => {
      return { char, status: ABSENT_STATUS };
    });
    const keys = [...keyboardKeys];

    // Find the letters that are present AND in the right position
    for (let i = 0; i < rawGuess.length; i++) {
      const guessChar = guessWord[i].char;
      
      if (guessChar === solutionArray[i]) {
        guessWord[i].status = CORRECT_STATUS;
        solutionArray[i] = null;
        const key = keys.find(({ char }) => char === guessChar);
        key && (key.status = CORRECT_STATUS);
      }
    }

    // Find the letters that are present BUT NOT in the right position
    for (let i = 0; i < rawGuess.length; i++) {
      const guessChar = guessWord[i].char;
      if (solutionArray.includes(guessChar)) {
        if (guessWord[i].status !== CORRECT_STATUS) {
          guessWord[i].status = PRESENT_STATUS;
          solutionArray[solutionArray.indexOf(guessChar)] = null;
        }

        const key = keys.find(({ char }) => char === guessChar);
        if (key && key.status !== CORRECT_STATUS) {
          key.status = PRESENT_STATUS;
        }
      } 
    }

    // Mark up absent keyboard keys
    for (let i = 0; i < rawGuess.length; i++) {
      const key = keys.find(({ char }) => char === guessWord[i].char);
      if (key && key.status !== CORRECT_STATUS && key.status !== PRESENT_STATUS) {
        key.status = ABSENT_STATUS;
      }
    }

    return {
      guessWord, 
      keys 
    };
  };

  const addGuess = guess => {
    // Check if guess is correct
    if (currentGuess === solution) {
      setIsWinningGuess(true);
    }

    // Add guess to guesses history
    setGuessHistory(prev => {
      const updatedHistory = [...prev];
      updatedHistory[goNumber] = guess.guessWord;
      return updatedHistory;
    });
    
    // Update keyboard
    setKeyboardKeys(guess.keys);

    // Add one to go number
    setGoNumber(prev => prev + 1);

    // Reset current guess
    setCurrentGuess('');
  };

  const keyHandler = e => {
    const { key } = e;

    if (key === 'Enter') {
      if (currentGuess.length !== solution.length) {
        // console.log({ currentGuess });
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
    addGuess,
    markUpGuess,
    keyHandler,
    keyboardKeys,
    currentGuess,
    guessHistory,
    goNumber,
    isWinningGuess,
    solution
  };
};

export default useBardle;