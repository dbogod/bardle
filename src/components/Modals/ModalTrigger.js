import PropTypes from 'prop-types';

const ModalTrigger = ({ children, modalRef }) => {
  return (
    <button
      type="button"
      onClick={() => modalRef.current.show()}>
      {children}
    </button>
  );
};

ModalTrigger.propTypes = {
  children: PropTypes.object.isRequired,
  modalRef: PropTypes.object.isRequired
};

export default ModalTrigger;