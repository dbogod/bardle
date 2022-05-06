import PropTypes from 'prop-types';

import Modal from './Modal';

const HelpModal = ({ modalRef }) => {
  return (
    <Modal
      id="help-modal"
      title="Help"
      modalRef={modalRef}>
      <p>This is the HELP modal</p>
    </Modal>
  );
};

HelpModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default HelpModal;

