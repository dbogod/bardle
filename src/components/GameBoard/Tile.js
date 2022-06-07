import { useContext } from 'react';
import PropTypes from 'prop-types';

import { RevealContext } from '../../context/Reveal';

import { 
  ABSENT_STATUS, 
  CORRECT_STATUS, 
  FILLED_STATUS, 
  PRESENT_STATUS, 
  WINNING_STATUS 
} from '../../constants/strings';

import style from '../../styles/Board.module.scss';

const Tile = ({ children, id, status, length, position, resolved }) => {
  const { setIsRowBeingRevealed } = useContext(RevealContext);

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
    if ([WINNING_STATUS, ABSENT_STATUS, CORRECT_STATUS, PRESENT_STATUS].includes(status)) {
      setIsRowBeingRevealed(false);
    }
  };

  return (
    <div
      id={id}
      className={style.tile}
      style={styleObj}
      data-resolved={resolved}
      data-status={status}
      onAnimationEnd={
        () => {
          if (!resolved && position === length - 1) {
            animationHandler();
          }
        }
      }>
      {children}
    </div>
  );
};

Tile.propTypes = {
  children: PropTypes.object,
  id: PropTypes.string,
  status: PropTypes.string,
  length: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  resolved: PropTypes.bool
};

export default Tile;