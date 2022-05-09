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

export default Row;