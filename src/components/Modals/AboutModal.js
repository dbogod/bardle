import PropTypes from 'prop-types';
import { BsTwitter, BsGithub } from 'react-icons/bs';
import { BiCoffeeTogo } from 'react-icons/bi';

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
        <p>
          Congratulations, you&apos;ve found Bardle! The whole Internet at your disposal, yet here you are. Bless you.
        </p>
        <p>
          Bardle is a daily word game that was heavily inspired (like so many) by those twin pillars of modern
          excellence: Josh Wardle&apos;s <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>,
          and <a href="https://en.wikipedia.org/wiki/William_Shakespeare">William Shakespeare</a>.
        </p>
        <p>
          It was mixed, cooked, baked and served up hot and ready by me, Daniel. If you just ❤️ it and want to shower me
          with glory, please consider <a href="https://ko-fi.com/bogod">buying me a coffee</a>.
        </p>
        <p>
          Also, shout out to Dad for coming up with the name. Yes,
          there&apos;s <a href="https://shakespearegeek.github.io/bardle/">another Bardle</a> out there BUT we
          didn&apos;t know about it at the time and, let&apos;s face it, there&apos;s no better name for this game.
        </p>
        <p>
          So that&apos;s it really. If you want, you can <a href="https://twitter.com/bogod">follow me on Twitter</a>.
          Or better yet, <a href="https://twitter.com/BogodDavid">follow Dad</a>. He&apos;d absolutely love it.
        </p>
        <p>
          Fare thee well!
        </p>
        <div className={style.footer}>
          <a
            href="https://twitter.com/bogod"
            aria-labelledby="twitter-link-desc">
            <span
              id="twitter-link-desc"
              className="hidden">
                Follow me on Twitter
            </span>
            <BsTwitter/>
          </a>
          <span>&nbsp; | &nbsp;</span>
          <a
            href="https://github.com/dbogod/wordle-monkey"
            aria-labelledby="github-link-desc">
            <span
              id="github-link-desc"
              className="hidden">
                  Take a look at the source code on Github
            </span>
            <BsGithub/>
          </a>
          <span>&nbsp; | &nbsp;</span>
          <a
            href="https://ko-fi.com/bogod"
            aria-labelledby="ko-fi-link-desc"
            title="Buy me a coffee!">
            <span
              id="ko-fi-link-desc"
              className="hidden">
                  Like the monkey? Buy the organ grinder a coffee!
            </span>
            <BiCoffeeTogo/>
          </a>
        </div>
      </div>
    </Modal>
  );
};

AboutModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default AboutModal;

