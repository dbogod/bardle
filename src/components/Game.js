import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import useBardle from '../hooks/useBardle';

import Board from './Board';
import Keyboard from './Keyboard';
import Toast from './Toast';

import { generateShareableString } from '../lib/share';

import { ThemeContext } from '../context/Theme';

import style from '../styles/Game.module.scss';

const Game = ({ gameNumber, setIsGameOver, setShareableResult, statsModalRef, solution }) => {
  const { currentTheme } = useContext(ThemeContext);
  const {
    keyHandler,
    setToastMessage,
    keyboardKeys,
    guessHistory,
    currentGuess,
    isGameWon,
    isGameLost,
    toastMessage
  } = useBardle(gameNumber, solution, true, statsModalRef);

  useEffect(() => {
    if (!isGameWon && !isGameLost) {
      window.addEventListener('keyup', keyHandler);
    } else {
      setIsGameOver(true);
    }
    return () => window.removeEventListener('keyup', keyHandler);
  }, [keyHandler, setIsGameOver, isGameWon, isGameLost]);
  
  useEffect(() => {
    setShareableResult(generateShareableString(gameNumber, isGameLost, guessHistory, currentTheme));
  }, [setShareableResult, gameNumber, isGameLost, guessHistory, currentTheme]);

  return (
    <main className={style.game}>
      {
        toastMessage &&
        <Toast
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}/>
      }

      <Board
        guessHistory={guessHistory}
        currentGuess={currentGuess}
        wordLength={solution.length}/>
      <Keyboard
        markedUpKeyboard={keyboardKeys}
        keyHandler={keyHandler}/>
    </main>
  );
};

Game.propTypes = {
  gameNumber: PropTypes.number.isRequired,
  setIsGameOver: PropTypes.func.isRequired,
  setShareableResult: PropTypes.func.isRequired,
  statsModalRef: PropTypes.object.isRequired,
  solution: PropTypes.string.isRequired,
};

export default Game;