import PropTypes from 'prop-types';

const ModalTrigger = ({ children, modalRef, modalTitle }) => {
  return (
    <button
      type="button"
      aria-label={`Show the ${modalTitle} modal`}
      onClick={() => modalRef.current.show()}>
      {children}
    </button>
  );
};

ModalTrigger.propTypes = {
  children: PropTypes.object.isRequired,
  modalRef: PropTypes.object.isRequired,
  modalTitle: PropTypes.string.isRequired
};

export default ModalTrigger;