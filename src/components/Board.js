import PropTypes from 'prop-types';

import style from '../styles/Board.module.scss';

const Row = ({ children, tileCount }) => {
  return (
    <div
      className={style.row}
      style={{ gridTemplateColumns: `repeat(${tileCount}, 1fr)` }}>
      {children}
    </div>
  );
};

Row.propTypes = {
  tileCount: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired
};

const Tile = ({ children, status }) => {
  return (
    <div
      className={style.tile}
      data-status={status}>
      {children}
    </div>
  );
};

Tile.propTypes = {
  children: PropTypes.object,
  status: PropTypes.string
};

const Board = ({ guessHistory, currentGuess, wordLength }) => {
  const tileCount = wordLength;

  return (
    <div
      className={style.board}
      style={{ maxWidth: `calc(${tileCount} * 4.25rem)` }}>
      BOARD:
      {
        guessHistory.map((guess, i) => (
          <Row
            key={i}
            tileCount={tileCount}>
            <>
              {
                guess.map(({ char, status }, i) => (
                  <Tile
                    key={i}
                    status={status}>
                    <>
                      {char}
                    </>
                  </Tile>
                ))
              }
            </>
          </Row>
        ))
      }
      <Row tileCount={tileCount}>
        {
          <>
            {
              [...currentGuess].map((letter, i) => (
                <Tile key={i}>
                  <>
                    {letter}
                  </>
                </Tile>
              ))
            }
            {
              [...Array(tileCount - currentGuess.length)].map((_, i) => (
                <Tile key={i}/>
              ))
            }
          </>
        }
      </Row>

      {
        [...Array(5 - guessHistory.length)].map((_, i) => (
          <Row
            key={i}
            tileCount={tileCount}>
            <>
              {
                [...Array(tileCount)].map((_, i) => (
                  <Tile key={i}/>
                ))
              }
            </>
          </Row>
        ))
      }
    </div>
  );
};

Board.propTypes = {
  guessHistory: PropTypes.array.isRequired,
  currentGuess: PropTypes.string.isRequired,
  wordLength: PropTypes.number.isRequired
};

export default Board;