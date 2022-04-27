import PropTypes from 'prop-types';
import { KEY_ROWS } from '../constants/keys';
import styles from '../styles/Keyboard.module.scss';

const Keyboard = ({ markedUpKeyboard }) => {
  return (
    <>
      {
        KEY_ROWS.map((kbRow, i) => (
          <div key={i}>
            {
              kbRow.map((kbKey, i) => {
                const markedUpKey = markedUpKeyboard.find(key => key.char === kbKey.toLowerCase());
                return (
                  <button
                    key={i}
                    className={styles.key}
                    type="button"
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
  markedUpKeyboard: PropTypes.array.isRequired
};

export default Keyboard;