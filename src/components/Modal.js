import PropTypes from 'prop-types';
import style from '../styles/Modal.module.scss';

const Modal = ({ children }) => {
  return (
    <div className={style.modal}>
      <h2>
        {children}
      </h2>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Modal;