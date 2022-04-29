import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ modalMessage, setModalMessage }) => {
  
  useEffect(() => {
    setTimeout(() => {
      setModalMessage('');
    }, 2000);
  }, [setModalMessage]);
  
  return (
    <div>
      {modalMessage}
    </div>
  );
};

Modal.propTypes = {
  modalMessage: PropTypes.string.isRequired,
  setModalMessage: PropTypes.func.isRequired
};

export default Modal;