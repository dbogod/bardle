import { useContext } from 'react';
import PropTypes from 'prop-types';

import ModalTrigger from './Modals/ModalTrigger';
import { BiHelpCircle, BiBarChartAlt2, BiSun } from 'react-icons/bi';
import { BsMoonStars } from 'react-icons/bs';

import { ThemeContext } from '../context/Theme';
import { GAME_TITLE } from '../constants/strings';

import style from '../styles/Header.module.scss';

const Header = ({ helpModalRef, statsModalRef }) => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <header
      className={style.header}
      data-theme={currentTheme}>
      <ModalTrigger
        modalRef={helpModalRef}>
        <BiHelpCircle/>
      </ModalTrigger>
      <h1>
        {GAME_TITLE}
      </h1>
      <div className={style['buttons-wrapper']}>
        <ModalTrigger
          modalRef={statsModalRef}>
          <BiBarChartAlt2/>
        </ModalTrigger>
        <button
          className={currentTheme === 'light' ? style['is-light-mode'] : ''}
          onClick={toggleTheme}
          type="button">
          {
            currentTheme === 'light' ? <BsMoonStars/> : <BiSun/>
          }
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  helpModalRef: PropTypes.object.isRequired,
  statsModalRef: PropTypes.object.isRequired
};

export default Header;