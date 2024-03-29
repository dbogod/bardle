import PropTypes from 'prop-types';
import { BsTwitter, BsGithub, BsMastodon } from 'react-icons/bs';
import { BiCoffeeTogo } from 'react-icons/bi';

import Modal from './Modal';

import { GAME_TITLE } from '../../constants/strings';

import style from '../../styles/Modal.module.scss';

const AboutModal = ({ modalRef }) => {
  return (
    <Modal id="info-modal" title={`About ${GAME_TITLE}`} modalRef={modalRef}>
      <div className={style['inner-wrapper']}>
        <div className={style['main-content']}>
          <p>
            Congratulations, you&apos;ve found Bardle! The whole Internet at
            your disposal, yet here you are. Bless you.
          </p>
          <p>
            Bardle is a daily word game that was heavily inspired (like so many)
            by those twin bastions of modern excellence: Josh Wardle&apos;s{' '}
            <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
            , and{' '}
            <a href="https://en.wikipedia.org/wiki/William_Shakespeare">
              William Shakespeare
            </a>
            .
          </p>
          <p>
            It was mixed, cooked, baked and served up hot and ready by me,
            Daniel. If you just ❤️ it and want to shower me with praise, please
            consider <a href="https://ko-fi.com/bogod">buying me a coffee</a>.
          </p>
          <p>
            Also, shout out to Dad for coming up with the name. Yes,
            there&apos;s{' '}
            <a href="https://shakespearegeek.github.io/bardle/">
              another Bardle
            </a>{' '}
            out there BUT we didn&apos;t know about it at the time and,
            let&apos;s face it, there&apos;s no better name for this game.
          </p>
          <p>
            So that&apos;s it really. If you want, you can{' '}
            <a href="https://twitter.com/bogod">follow me on Twitter</a>. Or
            better yet, <a href="https://twitter.com/BogodDavid">follow Dad</a>.
            He&apos;d absolutely love it.
          </p>
          <p>Fare thee well!</p>
          <p>
            PS - if you like Wordle, you might have a use for{' '}
            <a href="https://wordlemonkey.bogod.dev">Wordle Monkey</a>. Just
            saying.
          </p>
        </div>
        <div className={style.footer}>
          <a
            rel="me"
            href="https://mastodon.social/@bogod"
          >
            <span id="mastodon-link-desc" className="hidden">
              Follow me on Mastodon
            </span>
            <BsMastodon />
          </a>
          <span>&nbsp; | &nbsp;</span>
          <a
            href="https://twitter.com/bogod"
          >
            <span id="twitter-link-desc" className="hidden">
              Follow me on Twitter
            </span>
            <BsTwitter />
          </a>
          <span>&nbsp; | &nbsp;</span>
          <a
            href="https://github.com/dbogod/bardle"
          >
            <span id="github-link-desc" className="hidden">
              Browse the source code on Github
            </span>
            <BsGithub />
          </a>
          <span>&nbsp; | &nbsp;</span>
          <a
            href="https://ko-fi.com/bogod"
            title="Buy me a coffee!"
          >
            <span id="ko-fi-link-desc" className="hidden">
              Like Bardle? Buy the code scribe a coffee!
            </span>
            <BiCoffeeTogo />
          </a>
        </div>
      </div>
    </Modal>
  );
};

AboutModal.propTypes = {
  modalRef: PropTypes.object.isRequired,
};

export default AboutModal;
