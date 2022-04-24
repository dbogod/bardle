import PropTypes from 'prop-types';

const Game = ({ gameNumber, solution }) => {
  return (
    <>
      <h1>Bardle</h1>
      <p>
        This is game number {gameNumber}
      </p>
      <p>
        The solution is {solution}
      </p>
    </>
  );
};

Game.propTypes = {
  gameNumber: PropTypes.number.isRequired,
  solution: PropTypes.string.isRequired
};

export default Game;