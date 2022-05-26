import { useEffect, useState, useCallback } from 'react';
import {
  DEFAULT_STATUS,
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS,
  ERROR_MSG_INSUFFICIENT_LETTERS,
  ERROR_MSG_INVALID_WORD,
  GAME_OVER_MESSAGE_WIN,
  GAME_OVER_MESSAGE_LOSE
} from '../constants/strings';
import {
  saveGame,
  getSavedGame,
  updateStats
} from '../lib/localStorage';
import {  sendGaEventGameStarted } from '../lib/analytics';
import { getDictionary } from '../lib/dictionary';
import { KEY_ROWS } from '../constants/keys';

const useBardle = (gameNumber, solution, useSavedGame = false, statsModalRef) => {
  let savedKeyboardKeys;
  let savedGameHistory;
  let savedGoNumber;
  let savedIsGameWon;
  let savedIsGameLost;

  if (useSavedGame) {
    const savedGame = getSavedGame(gameNumber);
    if (savedGame) {
      savedKeyboardKeys = savedGame.keys;
      savedGameHistory = savedGame.history;
      savedGoNumber = savedGame.goNum;
      savedIsGameWon = savedGame.isWon;
      savedIsGameLost = savedGame.isLost;
    }
  }

  const [dictionary, setDictionary] = useState([]);
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
  const [toast, setToast] = useState({});
  const [rowAnimation, setRowAnimation] = useState('');
  const [isGameReady, setIsGameReady] = useState(false);

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
    // If it's the first go, send GA event
    if (goNumber === 0) {
      sendGaEventGameStarted(gameNumber, solution);
    }
    
    // Check if guess is correct
    if (currentGuess === solution) {
      setIsGameWon(true);
      setToast({ msg: GAME_OVER_MESSAGE_WIN, type: 'win' });
      setTimeout(() => {
        statsModalRef.current.show();
      }, 3000);
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
    if (goNumber >= 5 && currentGuess !== solution) {
      setIsGameLost(true);
      setToast({ msg: GAME_OVER_MESSAGE_LOSE, type: 'lose' });
      setTimeout(() => {
        statsModalRef.current.show();
      }, 3000);
    } else if (goNumber < 5 && currentGuess !== solution) {
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
        setToast({ msg: ERROR_MSG_INSUFFICIENT_LETTERS, type: 'error' });
        return;
      }

      if (!dictionary.includes(currentGuess)) {
        setToast({ msg: ERROR_MSG_INVALID_WORD, type: 'error' });
        setRowAnimation('shake');
        setTimeout(() => setRowAnimation(''), 2000);
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

  useEffect(() => {
    saveGame(gameNumber, keyboardKeys, guessHistory, goNumber, isGameWon, isGameLost);
  }, [gameNumber, keyboardKeys, guessHistory, goNumber, isGameWon, isGameLost]);

  const fetchDictionary = useCallback(async () => {
    const result = await getDictionary(solution);
    setDictionary(result);
  }, [solution]);

  useEffect(() => {
    fetchDictionary();
  }, [fetchDictionary]);

  useEffect(() => {
    const updateStatsInLocalStorage = async () => {
      if (!isGameLost && !isGameWon) {
        return;
      }

      await updateStats(isGameWon, goNumber, gameNumber, solution);

      if (isGameWon) {
        setTimeout(() => {
          setGuessHistory(prev => {
            const updatedHistory = [...prev];
            const winningGuess = updatedHistory[updatedHistory.length - 1];

            for (let i = 0; i < winningGuess.length; i++) {
              winningGuess[i].status = 'bardle';
            }

            return updatedHistory;
          });

        }, 2000);
      }
    };

    updateStatsInLocalStorage();
  }, [gameNumber, solution, isGameWon, isGameLost, goNumber]);

  return {
    isValidKey,
    addGuess,
    markUpGuess,
    keyHandler,
    setToast,
    fetchDictionary,
    dictionary,
    keyboardKeys,
    currentGuess,
    guessHistory,
    goNumber,
    isGameWon,
    isGameLost,
    isGameReady,
    setIsGameReady,
    toast,
    rowAnimation,
    solution
  };
};

export default useBardle;