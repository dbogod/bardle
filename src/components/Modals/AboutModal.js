import PropTypes from 'prop-types';

import Modal from './Modal';

import { GAME_TITLE } from '../../constants/strings';

import style from '../../styles/Modal.module.scss';

const AboutModal = ({ isOpen, modalRef }) => {
  return (
    <Modal
      id="info-modal"
      title={`About ${GAME_TITLE}`}
      modalRef={modalRef}>
      <p>This is the ABOUT modal</p>
      <span>So yes, this is all about the game</span>
    </Modal>
  );
};

AboutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalRef: PropTypes.object.isRequired
};

export default AboutModal;

