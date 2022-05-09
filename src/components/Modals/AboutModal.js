import PropTypes from 'prop-types';

import Modal from './Modal';

import { GAME_TITLE } from '../../constants/strings';

import style from '../../styles/Modal.module.scss';

const AboutModal = ({ modalRef }) => {
  return (
    <Modal
      id="info-modal"
      title={`About ${GAME_TITLE}`}
      modalRef={modalRef}>
      <div className={style['inner-wrapper']}>
        <p>This is the ABOUT modal</p>
        <span>So yes, this is all about the game</span>
      </div>
    </Modal>
  );
};

AboutModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default AboutModal;

