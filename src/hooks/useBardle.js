import { useEffect, useState, useCallback, useContext } from 'react';
import structuredClone from '@ungap/structured-clone';
import {
  DEFAULT_STATUS,
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS,
  WINNING_STATUS,
  ERROR_MSG_INSUFFICIENT_LETTERS,
  ERROR_MSG_INVALID_WORD,
  GAME_OVER_MESSAGE_WIN,
  GAME_OVER_MESSAGE_LOSE, 
  FILLED_STATUS
} from '../constants/strings';
import {
  saveGame,
  getSavedGame,
  updateStats,
  updateCurrentStreak
} from '../lib/localStorage';
import { sendGaEventGameStarted } from '../lib/analytics';
import { getDictionary } from '../lib/dictionary';
import { KEY_ROWS } from '../constants/keys';

import { RevealContext } from '../context/Reveal';

const useBardle = (gameNumber, solution, useSavedGame = false) => {
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

  const { isRowBeingRevealed, setIsRowBeingRevealed } = useContext(RevealContext);
  const [dictionary, setDictionary] = useState([]);
  const [keyboardKeys, setKeyboardKeys] = useState(savedKeyboardKeys ?? [
    ...KEY_ROWS[0].map(key => ({ char: key.toLowerCase(), status: DEFAULT_STATUS })),
    ...KEY_ROWS[1].map(key => ({ char: key.toLowerCase(), status: DEFAULT_STATUS })),
    ...KEY_ROWS[2].map(key => ({ char: key.toLowerCase(), status: DEFAULT_STATUS }))
  ]);
  const [currentGuessWord, setCurrentGuessWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState({ guessWord: [], keys: [] });
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
    const keys = structuredClone(keyboardKeys);

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

    // Start reveal animation
    setCurrentGuess(guess);

    // Freeze game until animation is complete
    setIsRowBeingRevealed(true);
  };

  const keyHandler = e => {
    if (isGameWon || isGameLost || isRowBeingRevealed) {
      return;
    }

    const { key } = e;
    const isIntendedAsButtonOrLinkClick = e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A');
    const isEnterKbButton = isIntendedAsButtonOrLinkClick && e.target.textContent === 'Enter';
    const guessWordAsString = currentGuess.guessWord.map(({ char }) => char).join('');

    if (key === 'Enter' && (!isIntendedAsButtonOrLinkClick || isEnterKbButton)) {
      if (guessWordAsString.length !== solution.length) {
        setToast({ msg: ERROR_MSG_INSUFFICIENT_LETTERS, type: 'error' });
        return;
      }

      if (!dictionary.includes(guessWordAsString)) {
        setToast({ msg: ERROR_MSG_INVALID_WORD, type: 'error' });
        setRowAnimation('shake');
        setTimeout(() => setRowAnimation(''), 2000);
        return;
      }

      const markedUpGuess = markUpGuess(guessWordAsString);
      addGuess(markedUpGuess);
    }

    if (key === 'Backspace' || key === 'Del') {
      setCurrentGuess(prev => {
        const { guessWord } = structuredClone(prev);
        guessWord.pop();
        return {
          ...prev,
          guessWord
        };
      });
      return;
    }

    if (!isValidKey(key)) {
      return;
    }

    if (guessWordAsString.length >= solution.length) {
      return;
    }

    setCurrentGuess(prev => {
      const { guessWord } = structuredClone(prev);
      guessWord.push({ char: key, status: FILLED_STATUS });
      return {
        ...prev,
        guessWord
      };
    });
  };

  useEffect(() => {
    const guessWordAsString = currentGuess.guessWord.map(({ char }) => char).join('');
    setCurrentGuessWord(guessWordAsString);
  }, [currentGuess]);

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
        setGuessHistory(prev => {
          const updatedHistory = [...prev];
          const winningGuess = updatedHistory[updatedHistory.length - 1];

          for (let i = 0; i < winningGuess.length; i++) {
            winningGuess[i].status = WINNING_STATUS;
          }

          return updatedHistory;
        });
      }
    };

    updateStatsInLocalStorage();
  }, [gameNumber, solution, isGameWon, isGameLost, goNumber]);

  useEffect(() => {
    updateCurrentStreak(gameNumber);
  }, [gameNumber]);

  useEffect(() => {
    if (isRowBeingRevealed !== null && !isRowBeingRevealed) {
      const guessWordAsString = currentGuess.guessWord.map(({ char }) => char).join('');

      // Update keyboard
      setKeyboardKeys(currentGuess.keys);

      // Add guess to guess history
      setGuessHistory(prev => {
        const updatedHistory = [...prev];
        updatedHistory[goNumber] = currentGuess.guessWord;
        return updatedHistory;
      });

      // Check if guess is correct
      if (guessWordAsString === solution) {
        setIsGameWon(true);
        setToast({ msg: GAME_OVER_MESSAGE_WIN, type: 'win' });
      }

      // Add one to go number, unless this was the last guess
      if (goNumber >= 5 && guessWordAsString !== solution) {
        setIsGameLost(true);
        setToast({ msg: GAME_OVER_MESSAGE_LOSE, type: 'lose' });
      } else if (goNumber < 5 && guessWordAsString !== solution) {
        setGoNumber(prev => prev + 1);
      }

      setIsRowBeingRevealed(null);
      setCurrentGuess({ guessWord: [], keys: [] });
      setCurrentGuessWord('');
    }
  }, [isRowBeingRevealed, setIsRowBeingRevealed, goNumber, currentGuess, solution]);

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
    currentGuessWord,
    guessHistory,
    goNumber,
    isGameWon,
    isGameLost,
    isGameReady,
    setIsGameReady,
    toast,
    rowAnimation,
    setIsRowBeingRevealed,
    solution
  };
};

export default useBardle;