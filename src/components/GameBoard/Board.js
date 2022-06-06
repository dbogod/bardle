import PropTypes from 'prop-types';

import Row from './Row';
import Tile from './Tile';

import { FILLED_STATUS } from '../../constants/strings';

import style from '../../styles/Board.module.scss';

const Board = ({ isSmScreen, guessHistory, currentGuess, wordLength, rowAnimation, isGameReady }) => {
  const tileCount = wordLength;

  const activeRowId = `row-${(guessHistory.length).toString()}`;

  return (
    <div
      className={style.wrapper}
      data-testid="board-wrapper">
      <div
        className={style.board}
        style={{ maxWidth: `calc(${tileCount} * ${isSmScreen ? '3rem' : '3.75rem'})` }}
        data-testid="board"
        data-game-ready={isGameReady}
        data-tile-count={tileCount}>
        {
          guessHistory.map((guess, i) => {
            const rowId = `row-${i}`;
            return (
              <Row
                key={rowId}
                id={rowId}
                tileCount={tileCount}>
                <>
                  {
                    guess.map(({ char, status }, i) => {
                      const tileId = `${rowId}-tile-${i}`;
                      return (
                        <Tile
                          key={tileId}
                          id={tileId}
                          status={status}
                          length={tileCount}
                          position={i}>
                          <>
                            {char}
                          </>
                        </Tile>
                      );
                    })
                  }
                </>
              </Row>
            );
          })
        }
        {
          guessHistory.length < 6 &&
          <>
            <Row
              id={activeRowId}
              tileCount={tileCount}
              animation={rowAnimation}>
              {
                <>
                  {
                    [...currentGuess].map((letter, i) => {
                      const tileId = `${activeRowId}-tile-${i}`;
                      return (
                        <Tile
                          key={tileId}
                          id={tileId}
                          status={FILLED_STATUS}
                          length={tileCount}
                          position={i}>
                          <>
                            {letter}
                          </>
                        </Tile>
                      );
                    })
                  }
                  {
                    [...Array(tileCount - currentGuess.length)].map((_, i) => {
                      const tileId = `${activeRowId}-tile-${i + currentGuess.length}`;
                      return (
                        <Tile
                          key={tileId}
                          id={tileId}
                          length={tileCount}
                          position={i}/>
                      );
                    })
                  }
                </>
              }
            </Row>
            {
              [...Array(5 - guessHistory.length)].map((_, i) => {
                const rowId = `row-${guessHistory.length + 1 + i}`;
                return (
                  <Row
                    key={rowId}
                    id={rowId}
                    tileCount={tileCount}>
                    <>
                      {
                        [...Array(tileCount)].map((_, i) => {
                          const tileId = `${rowId}-tile-${i}`;
                          return (
                            <Tile
                              key={tileId}
                              id={tileId}
                              length={tileCount}
                              position={i}/>
                          );
                        })
                      }
                    </>
                  </Row>
                );
              })
            }
          </>
        }

      </div>
    </div>
  );
};

Board.propTypes = {
  isSmScreen: PropTypes.bool.isRequired,
  guessHistory: PropTypes.array.isRequired,
  currentGuess: PropTypes.string.isRequired,
  wordLength: PropTypes.number.isRequired,
  rowAnimation: PropTypes.string.isRequired,
  isGameReady: PropTypes.bool.isRequired
};

export default Board;