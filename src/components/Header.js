import { useContext } from 'react';
import PropTypes from 'prop-types';

import ModalTrigger from './Modals/ModalTrigger';
import { BiHelpCircle, BiInfoCircle, BiBarChartAlt2, BiSun } from 'react-icons/bi';
import { BsMoonStars, BsTools } from 'react-icons/bs';

import { ThemeContext } from '../context/Theme';
import { GAME_TITLE } from '../constants/strings';

import style from '../styles/Header.module.scss';

const Header = ({ howToPlayModalRef, devModalRef, aboutModalRef, statsModalRef }) => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <header
      className={style.header}
      data-theme={currentTheme}>
      <div className={style.content}>
        <div className={style['buttons-wrapper']}>
          <ModalTrigger 
            modalRef={howToPlayModalRef}
            modalTitle="instructions">
            <BiHelpCircle/>
          </ModalTrigger>
          <ModalTrigger
            classes={style['dev-modal-trigger']}
            modalRef={devModalRef}
            modalTitle="dev">
            <BsTools/>
          </ModalTrigger>
          {/*<ModalTrigger*/}
          {/*  modalRef={aboutModalRef}*/}
          {/*  modalTitle="about">*/}
          {/*  <BiInfoCircle/>*/}
          {/*</ModalTrigger>*/}
        </div>
        <h1>
          {GAME_TITLE}
        </h1>
        <div className={style['buttons-wrapper']}>
          <ModalTrigger 
            modalRef={statsModalRef}
            modalTitle="stats">
            <BiBarChartAlt2/>
          </ModalTrigger>
          <button
            className={currentTheme === 'light' ? '' : style['is-dark-mode']}
            aria-label="toggle light/dark theme"
            onClick={toggleTheme}
            type="button">
            {
              currentTheme === 'light' ? <BiSun/> :  <BsMoonStars/>
            }
          </button>
        </div>
      </div>
      
    </header>
  );
};

Header.propTypes = {
  howToPlayModalRef: PropTypes.object.isRequired,
  devModalRef: PropTypes.object.isRequired,
  aboutModalRef: PropTypes.object.isRequired,
  statsModalRef: PropTypes.object.isRequired
};

export default Header;