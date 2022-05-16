import PropTypes from 'prop-types';

const ModalTrigger = ({ children, classes, modalRef, modalTitle }) => {
  return (
    <button
      type="button"
      className={classes}
      aria-label={`Show the ${modalTitle} modal`}
      onClick={() => modalRef.current.show()}>
      {children}
    </button>
  );
};

ModalTrigger.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.object.isRequired,
  modalRef: PropTypes.object.isRequired,
  modalTitle: PropTypes.string.isRequired
};

export default ModalTrigger;