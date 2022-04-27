import { useEffect, useState } from 'react';
import {
  SAVE_GAME_KEY,
  DEFAULT_STATUS,
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS
} from '../constants/strings';
import { KEY_ROWS } from '../constants/keys';

const useBardle = (gameNumber, solution) => {
  let savedKeyboardKeys;
  let savedGameHistory;
  let savedGoNumber;
  let savedIsGameWon;
  let savedIsGameLost;

  const loadGame = () => {
    const savedGame = localStorage?.getItem(SAVE_GAME_KEY);

    if (!savedGame) {
      return null;
    }

    const { gameNum, keys, history, goNum, isWon, isLost } = JSON.parse(localStorage.getItem(SAVE_GAME_KEY));

    if (gameNum === gameNumber) {
      savedKeyboardKeys = keys;
      savedGameHistory = history;
      savedGoNumber = goNum;
      savedIsGameWon = isWon;
      savedIsGameLost = isLost;
    }
  };

  loadGame();

  const [keyboardKeys, setKeyboardKeys] = useState(savedKeyboardKeys ?? [
    ...KEY_ROWS[0].map(key => ({ char: key.toLowerCase(), status: DEFAULT_STATUS })),
    ...KEY_ROWS[1].map(key => ({ char: key.toLowerCase(), status: DEFAULT_STATUS })),
    ...KEY_ROWS[2].map(key => ({ char: key.toLowerCase(), status: DEFAULT_STATUS }))
  ]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState(savedGameHistory ?? []);
  const [goNumber, setGoNumber] = useState(savedGoNumber ?? 0);
  const [isGameWon, setIsGameWon] = useState(savedIsGameWon ?? false);
  const [isGameLost, setIsGameLost] = useState(savedIsGameLost ?? false);

  const isValidKey = value => /^[A-Za-z']$/.test(value);

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
      setIsGameWon(true);
    }

    // Add guess to guesses history
    setGuessHistory(prev => {
      const updatedHistory = [...prev];
      updatedHistory[goNumber] = guess.guessWord;
      return updatedHistory;
    });

    // Update keyboard
    setKeyboardKeys(guess.keys);

    // Add one to go number, unless this was the last guess
    if (goNumber === 5) {
      setIsGameLost(true);
    } else {
      setGoNumber(prev => prev + 1);
    }

    // Reset current guess
    setCurrentGuess('');
  };

  const keyHandler = e => {
    const { key } = e;
    const isIntendedAsButtonOrLinkClick = e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A');
    const isEnterKbButton = isIntendedAsButtonOrLinkClick && e.target.textContent === 'Enter';

    if (key === 'Enter' && (!isIntendedAsButtonOrLinkClick || isEnterKbButton)) {
      if (currentGuess.length !== solution.length) {
        console.log('not enough letters');
        return;
      }

      const markedUpGuess = markUpGuess(currentGuess);
      addGuess(markedUpGuess);
    }

    if (key === 'Backspace' || key === 'Del') {
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

  const saveGame = (gameNum, keys, history, goNum, isWon, isLost) => {
    localStorage.setItem(SAVE_GAME_KEY, JSON.stringify({
      gameNum,
      keys,
      history,
      goNum,
      isWon,
      isLost
    }));
  };

  useEffect(() => {
    saveGame(
      gameNumber,
      keyboardKeys,
      guessHistory,
      goNumber,
      isGameWon,
      isGameLost
    );
  }, [
    gameNumber,
    keyboardKeys,
    guessHistory,
    goNumber,
    isGameWon,
    isGameLost
  ]);

  return {
    isValidKey,
    addGuess,
    markUpGuess,
    keyHandler,
    keyboardKeys,
    currentGuess,
    guessHistory,
    goNumber,
    isGameWon,
    isGameLost,
    solution
  };
};

export default useBardle;