import PropTypes from 'prop-types';

import Modal from './Modal';

import { GAME_TITLE, STATS_KEY, SAVE_GAME_KEY } from '../../constants/strings';

import style from '../../styles/Modal.module.scss';

const clickHandler = key => localStorage?.removeItem(key);

const DevModal = ({ modalRef }) => {
  return (
    <Modal
      id="dev-modal"
      title="Dev tools"
      modalRef={modalRef}>
      <div className={style['inner-wrapper']}>
        <button 
          className={style['dev-button']}
          onClick={() => clickHandler(STATS_KEY)}
          type="button">
          Clear all stats
        </button>
        <button
          className={style['dev-button']}
          onClick={() => clickHandler(SAVE_GAME_KEY)}
          type="button">
          Clear saved game
        </button>
      </div>
    </Modal>
  );
};

DevModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default DevModal;

