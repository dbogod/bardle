import PropTypes from 'prop-types';
import { KEY_ROWS } from '../constants/keys';
import styles from '../styles/Keyboard.module.scss';

const Keyboard = ({ markedUpKeyboard, keyHandler }) => {
  // Prevent event doubling up when pressing 'Enter' on 'Enter'
  const keyUpHandler = (e, keyboardKey) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (keyboardKey.key !== 'Enter') {
        keyHandler(keyboardKey);
      }
    }
  };
  
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
                    onKeyUp={e => e.key === 'Enter' && keyUpHandler(e, { key: kbKey })}
                    onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
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