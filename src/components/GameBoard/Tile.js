import PropTypes from 'prop-types';

import { FILLED_STATUS, WINNING_STATUS } from '../../constants/strings';

import style from '../../styles/Board.module.scss';

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

export default Tile;