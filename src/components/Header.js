import { useContext } from 'react';
import { BiHelpCircle, BiBarChartAlt2, BiSun } from 'react-icons/bi';
import { BsMoonStars } from 'react-icons/bs';

import { ThemeContext } from '../context/Theme';
import { GAME_TITLE } from '../constants/strings';

import style from '../styles/Header.module.scss';

const Header = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <header
      className={style.header}
      data-theme={currentTheme}>
      <button type="button">
        <BiHelpCircle/>
      </button>
      <h1>
        {GAME_TITLE}
      </h1>
      <div className={style['buttons-wrapper']}>
        <button type="button">
          <BiBarChartAlt2/>
        </button>
        <button
          className={currentTheme === 'light' ? style['is-light-mode'] : '' }
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

export default Header;