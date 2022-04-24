import { useEffect } from 'react';
import useBardle from '../hooks/useBardle';
import PropTypes from 'prop-types';

const Game = ({ gameNumber, solution }) => {
  const { keyHandler, currentGuess } = useBardle(solution);
  
  useEffect(() => {
    window.addEventListener('keyup', keyHandler);
    return () => window.removeEventListener('keyup', keyHandler);
  }, [keyHandler]);
  
  return (
    <>
      <h1>Bardle</h1>
      <p>
        This is game number {gameNumber}
      </p>
      <p>
        The solution is {solution}
      </p>
      <p>
        The current guess is: {currentGuess}
      </p>
    </>
  );
};

Game.propTypes = {
  gameNumber: PropTypes.number.isRequired,
  solution: PropTypes.string.isRequired
};

export default Game;