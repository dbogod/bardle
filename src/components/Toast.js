import PropTypes from 'prop-types';

import style from '../styles/Toast.module.scss';

const Toast = ({ toast, setToast, statsModalRef }) => {
  const animationHandler = () => {
    const { type } = toast;
    if (!type) {
      return;
    }

    if (type === 'win' || type === 'lose') {
      statsModalRef.current.show();
    } else {
      setTimeout(() => {
        setToast({});
      }, 2000);
    }
  };

  return (
    <div
      className={style.container}
      onAnimationEnd={() => animationHandler()}>
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
  setToast: PropTypes.func.isRequired,
  statsModalRef: PropTypes.object.isRequired
};

export default Toast;