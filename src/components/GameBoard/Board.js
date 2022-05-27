import PropTypes from 'prop-types';

import Row from './Row';
import Tile from './Tile';

import { FILLED_STATUS } from '../../constants/strings';

import style from '../../styles/Board.module.scss';

const Board = ({ isSmScreen, guessHistory, currentGuess, wordLength, rowAnimation, isGameReady }) => {
  const tileCount = wordLength;

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
        {
          guessHistory.length < 6 &&
          <>
            <Row
              tileCount={tileCount}
              animation={rowAnimation}>
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