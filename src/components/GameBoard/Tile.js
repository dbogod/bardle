import PropTypes from 'prop-types';

import { FILLED_STATUS, WINNING_STATUS } from '../../constants/strings';

import style from '../../styles/Board.module.scss';

const Tile = ({ children, id, status, length, position }) => {
  const styleObj = {};

  if (status !== FILLED_STATUS) {
    styleObj.animationDelay = `calc(${status === WINNING_STATUS ? 100 : 300}ms * ${position})`;
  }

  if (length === 7) {
    styleObj['--font-size-xs'] = '1.75rem';
  }

  if (length === 8) {
    styleObj['--font-size-xs'] = '1.5rem';
  }

  const animationHandler = () => {
    console.log(`tile ${position} animated`);
    console.log({ status });
  };

  return (
    <div
      id={id}
      className={style.tile}
      style={styleObj}
      data-status={status}
      onAnimationEnd={() => position === length - 1 && animationHandler()}>
      {children}
    </div>
  );
};

Tile.propTypes = {
  children: PropTypes.object,
  id: PropTypes.string,
  status: PropTypes.string,
  length: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired
};

export default Tile;