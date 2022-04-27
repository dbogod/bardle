import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBardle from '../hooks/useBardle';

import Keyboard from './Keyboard';

const Game = ({ gameNumber, solution }) => {
  const { 
    keyHandler, 
    keyboardKeys, 
    currentGuess,
    isGameWon,
    isGameLost
  } = useBardle(gameNumber, solution);

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
    </>
  );
};

Game.propTypes = {
  gameNumber: PropTypes.number.isRequired,
  solution: PropTypes.string.isRequired
};

export default Game;