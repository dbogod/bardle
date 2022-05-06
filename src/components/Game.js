import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBardle from '../hooks/useBardle';

import Board from './Board';
import Keyboard from './Keyboard';
import Toast from './Toast';

import style from '../styles/Game.module.scss';

const Game = ({ gameNumber, solution, statsModalRef }) => {
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
    }
    return () => window.removeEventListener('keyup', keyHandler);
  }, [keyHandler, isGameWon, isGameLost]);

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
  solution: PropTypes.string.isRequired,
  statsModalRef: PropTypes.object.isRequired
};

export default Game;