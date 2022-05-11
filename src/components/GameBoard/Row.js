import PropTypes from 'prop-types';

import style from '../../styles/Board.module.scss';

const Row = ({ animation, children, tileCount }) => {
  return (
    <div
      className={style.row}
      style={{ gridTemplateColumns: `repeat(${tileCount}, 1fr)` }}
      data-animation={animation}>
      {children}
    </div>
  );
};

Row.propTypes = {
  animation: PropTypes.string,
  children: PropTypes.object.isRequired,
  tileCount: PropTypes.number.isRequired
};

export default Row;