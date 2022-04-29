import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ toastMessage, setToastMessage }) => {
  
  useEffect(() => {
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  }, [setToastMessage]);
  
  return (
    <div>
      {toastMessage}
    </div>
  );
};

Toast.propTypes = {
  toastMessage: PropTypes.string.isRequired,
  setToastMessage: PropTypes.func.isRequired
};

export default Toast;