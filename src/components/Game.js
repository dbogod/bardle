import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import useBardle from '../hooks/useBardle';

import Board from './GameBoard/Board';
import Keyboard from './Keyboard';
import Toast from './Toast';

import { generateShareableString } from '../lib/share';

import { ThemeContext } from '../context/Theme';

import style from '../styles/Game.module.scss';

const Game = ({ isSmScreen, gameNumber, setIsGameOver, setShareableResult, statsModalRef, solution }) => {
  const { currentTheme } = useContext(ThemeContext);
  const {
    keyHandler,
    setToast,
    keyboardKeys,
    guessHistory,
    currentGuess,
    isGameWon,
    isGameLost,
    isGameReady,
    setIsGameReady,
    toast,
    rowAnimation
  } = useBardle(gameNumber, solution, true);
  
  useEffect(() => {
    if (!isGameWon && !isGameLost) {
      window.addEventListener('keyup', keyHandler);
      setIsGameReady(true);
    } else {
      setIsGameOver(true);
    }
    return () => window.removeEventListener('keyup', keyHandler);
  }, [keyHandler, setIsGameOver, setIsGameReady, isGameWon, isGameLost]);

  useEffect(() => {
    setShareableResult(generateShareableString(gameNumber, isGameLost, guessHistory, currentTheme));
  }, [setShareableResult, gameNumber, isGameLost, guessHistory, currentTheme]);

  return (
    <main 
      className={style.game}>
      {
        toast.msg && toast.type &&
        <Toast
          toast={toast}
          setToast={setToast}
          statsModalRef={statsModalRef}/>
      }
      <Board
        guessHistory={guessHistory}
        currentGuess={currentGuess}
        wordLength={solution.length}
        isSmScreen={isSmScreen}
        isGameReady={isGameReady}
        rowAnimation={rowAnimation}/>
      <Keyboard
        markedUpKeyboard={keyboardKeys}
        keyHandler={keyHandler}/>
    </main>
  );
};

Game.propTypes = {
  isSmScreen: PropTypes.bool.isRequired,
  gameNumber: PropTypes.number.isRequired,
  setIsGameOver: PropTypes.func.isRequired,
  setShareableResult: PropTypes.func.isRequired,
  statsModalRef: PropTypes.object.isRequired,
  solution: PropTypes.string.isRequired,
};

export default Game;