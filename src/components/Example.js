import PropTypes from 'prop-types';

import Row from './GameBoard/Row';
import Tile from './GameBoard/Tile';

import style from '../styles/Board.module.scss';

const Example = ({ text, word }) => {
  return (
    <div className={style.example}>
      <Row tileCount={word.length}>
        <>
          {
            word.map((tile, i) => {
              const { char, status } = tile;
              return (
                <Tile
                  key={i}
                  position={i}
                  length={word.length}
                  status={status ?? ''}>
                  <>
                    {char}
                  </>
                </Tile>
              );
            })
          }
        </>
      </Row>
      {text}
    </div>

  );
};

Example.propTypes = {
  text: PropTypes.object.isRequired,
  word: PropTypes.array.isRequired
};

export default Example;
