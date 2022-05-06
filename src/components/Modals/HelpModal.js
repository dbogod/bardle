import PropTypes from 'prop-types';

import Modal from './Modal';

import style from '../../styles/Modal.module.scss';

const HelpModal = ({ modalRef }) => {
  return (
    <Modal
      id="instructions-modal"
      title="How to play"
      modalRef={modalRef}>
      <p>This is the HOW TO PLAY modal</p>
      <span>So yes, this is how to play</span>
    </Modal>
  );
};

HelpModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default HelpModal;

