import PropTypes from 'prop-types';
import { KEY_ROWS } from '../constants/keys';
import style from '../styles/Keyboard.module.scss';

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
    <div 
      className={style.keyboard}
      data-testid="keyboard">
      {
        KEY_ROWS.map((kbRow, i) => (
          <div
            key={i}
            className={style.row}>
            {
              kbRow.map((kbKey, i) => {
                const markedUpKey = markedUpKeyboard.find(key => key.char === kbKey);
                return (
                  <button
                    key={i}
                    className={style.key}
                    type="button"
                    data-testid={kbKey}
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
    </div>
  );
};

Keyboard.propTypes = {
  markedUpKeyboard: PropTypes.array.isRequired,
  keyHandler: PropTypes.func.isRequired
};

export default Keyboard;