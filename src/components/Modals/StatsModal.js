import PropTypes from 'prop-types';

import Modal from './Modal';

const StatsModal = ({ modalRef }) => {
  return (
    <Modal
      id="stats-modal"
      title="Stats"
      modalRef={modalRef}>
      <p>This is the STATS modal</p>
    </Modal>
  );
};

StatsModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default StatsModal;

