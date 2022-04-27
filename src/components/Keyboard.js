import PropTypes from 'prop-types';
import { KEY_ROWS } from '../constants/keys';
import styles from '../styles/Keyboard.module.scss';

const Keyboard = ({ markedUpKeyboard, keyHandler }) => {
  return (
    <>
      {
        KEY_ROWS.map((kbRow, i) => (
          <div key={i}>
            {
              kbRow.map((kbKey, i) => {
                const markedUpKey = markedUpKeyboard.find(key => key.char === kbKey);
                return (
                  <button
                    key={i}
                    className={styles.key}
                    type="button"
                    onClick={() => keyHandler({ key: kbKey })}
                    data-status={markedUpKey && markedUpKey.status}>
                    {kbKey}
                  </button>
                );
              })
            }
          </div>
        ))
      }
    </>
  );
};

Keyboard.propTypes = {
  markedUpKeyboard: PropTypes.array.isRequired,
  keyHandler: PropTypes.func.isRequired
};

export default Keyboard;