import PropTypes from 'prop-types';
import { WINNING_STATUS, FILLED_STATUS } from '../constants/strings';

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

const Tile = ({ children, status, length, position }) => {
  const styleObj = {};
  
  if (status !== FILLED_STATUS) {
    styleObj.animationDelay =`calc(${status === WINNING_STATUS ? 100 : 300}ms * ${position})`;
  }
  
  if (length === 7) {
    styleObj['--font-size-xs'] = '1.75rem';
  }

  if (length === 8) {
    styleObj['--font-size-xs'] = '1.5rem';
  }

  return (
    <div
      className={style.tile}
      style={styleObj}
      data-status={status}>
      {children}
    </div>
  );
};

Tile.propTypes = {
  children: PropTypes.object,
  status: PropTypes.string,
  length: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired
};

const Board = ({ guessHistory, currentGuess, wordLength }) => {
  const tileCount = wordLength;

  return (
    <div 
      className={style.wrapper}
      data-testid="board-wrapper">
      <div
        className={style.board}
        style={{ maxWidth: `calc(${tileCount} * 3.75rem)` }}
        data-testid="board">
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
                      status={status}
                      length={tileCount}
                      position={i}>
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
                  <Tile
                    key={i}
                    status={FILLED_STATUS}
                    length={tileCount}
                    position={i}>
                    <>
                      {letter}
                    </>
                  </Tile>
                ))
              }
              {
                [...Array(tileCount - currentGuess.length)].map((_, i) => (
                  <Tile
                    key={i}
                    length={tileCount}
                    position={i}/>
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
                    <Tile
                      key={i}
                      length={tileCount}
                      position={i}/>
                  ))
                }
              </>
            </Row>
          ))
        }
      </div>
    </div>
  );
};

Board.propTypes = {
  guessHistory: PropTypes.array.isRequired,
  currentGuess: PropTypes.string.isRequired,
  wordLength: PropTypes.number.isRequired
};

export default Board;