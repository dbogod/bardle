import PropTypes from 'prop-types';

const Modal = ({ children }) => {
  return (
    <h2>
      {children}
    </h2>
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Modal;