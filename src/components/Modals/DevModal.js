import PropTypes from 'prop-types';

import Modal from './Modal';

import { STATS_KEY, SAVE_GAME_KEY } from '../../constants/strings';

import style from '../../styles/Modal.module.scss';

const clickHandler = clearStats => {
  localStorage?.removeItem(SAVE_GAME_KEY);

  if (clearStats) {
    localStorage?.removeItem(STATS_KEY);
  }
};

const DevModal = ({ modalRef }) => {
  return (
    <Modal
      id="dev-modal"
      title="Dev tools"
      modalRef={modalRef}>
      <div className={style['inner-wrapper']}>
        <button 
          className={style['dev-button']}
          onClick={() => clickHandler(true)}
          type="button">
          Clear all stats
        </button>
        <button
          className={style['dev-button']}
          onClick={() => clickHandler()}
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

