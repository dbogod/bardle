import { useEffect } from 'react';
import PropTypes from 'prop-types';

import style from '../styles/Toast.module.scss';

const Toast = ({ toast, setToast }) => {
  useEffect(() => {
    setTimeout(() => {
      setToast({});
    }, 2000);
  }, [setToast]);

  return (
    <div className={style.container}>
      <div className={`${style.toast} ${style[`toast--${toast.type}`]}`}>
        <p>
          {toast.msg}
        </p>
      </div>
    </div>
  );
};

Toast.propTypes = {
  toast: PropTypes.object.isRequired,
  setToast: PropTypes.func.isRequired
};

export default Toast;