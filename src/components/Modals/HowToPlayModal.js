import PropTypes from 'prop-types';

import Modal from './Modal';
import Example from '../Example';

import {
  GAME_TITLE,
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS
} from '../../constants/strings';

import style from '../../styles/Modal.module.scss';

const HowToPlayModal = ({ modalRef }) => {
  const solutionTitle = GAME_TITLE ?? 'word';
  return (
    <Modal
      id="how-to-play-modal"
      title="How to play"
      modalRef={modalRef}>
      <div className={style['inner-wrapper']}>
        <p>
          {`Guess the ${solutionTitle} in six turns or fewer.`}
        </p>
        <p>
          Every {solutionTitle} can be found
          in <a href="https://www.shakespeareswords.com/Public/PlayList.aspx">Shakespeare&apos;s plays</a> (including
          characters and place names), although it may still be in use today as well.
        </p>
        <p>
          Each guess must be a valid word. Modern words are accepted.
        </p>
        <p>
          Hints are revealed after each guess:
        </p>
        <Example
          text={<p>The letter <span>S</span> is in the word and in the right spot.</p>}
          word={[
            { char: 's', status: CORRECT_STATUS },
            { char: 'c' },
            { char: 'o' },
            { char: 'n' },
            { char: 'e' },
          ]}/>
        <Example
          text={<p>The letter <span>A</span> is in the word but in the wrong spot.</p>}
          word={[
            { char: 'k' },
            { char: 'n' },
            { char: 'a', status: PRESENT_STATUS },
            { char: 'v' },
            { char: 'e' },
          ]}/>
        <Example
          text={<p>The letter <span>T</span> is not in the word.</p>}
          word={[
            { char: 'g' },
            { char: 'o' },
            { char: '\'' },
            { char: 's' },
            { char: 't', status: ABSENT_STATUS },
          ]}/>
        <br/>
        <p>
          Come back for a new {solutionTitle} each day!
        </p>
      </div>
    </Modal>
  );
};

HowToPlayModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default HowToPlayModal;

