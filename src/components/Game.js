import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBardle from '../hooks/useBardle';

import Keyboard from './Keyboard';
import Toast from './Toast';
import Modal from './Modal';

const Game = ({ gameNumber, solution }) => {
  const {
    keyHandler,
    setToastMessage,
    keyboardKeys,
    currentGuess,
    isGameWon,
    isGameLost,
    toastMessage,
    showStatsModal,
    showHelpModal
  } = useBardle(gameNumber, solution, true);

  useEffect(() => {
    if (!isGameWon && !isGameLost) {
      window.addEventListener('keyup', keyHandler);
    }
    return () => window.removeEventListener('keyup', keyHandler);
  }, [keyHandler, isGameWon, isGameLost]);

  return (
    <>
      <p>
        This is game number {gameNumber}
      </p>
      <p>
        The solution is {solution}
      </p>
      <p>
        The current guess is: {currentGuess}
      </p>
      <Keyboard
        markedUpKeyboard={keyboardKeys}
        keyHandler={keyHandler}/>

      {
        toastMessage &&
        <Toast
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}/>
      }

      {
        showStatsModal &&
        <Modal>
          <>
            STATS modal
          </>
        </Modal>
      }

      {
        showHelpModal &&
        <Modal>
          <>
            HELP modal
          </>
        </Modal>
      }
    </>
  );
};

Game.propTypes = {
  gameNumber: PropTypes.number.isRequired,
  solution: PropTypes.string.isRequired,
};

export default Game;